'use client';

import { useAuth } from '@/contexts/AuthContext';
import { authAPI } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Package, Calendar, Printer, CheckCircle2, Clock, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const getStatusConfig = (status: string) => {
    const configs: Record<string, { icon: any; className: string; label: string }> = {
        'paid': {
            icon: CheckCircle2,
            className: 'bg-green-50 text-green-700 border-green-200',
            label: 'Paid'
        },
        'pending': {
            icon: Clock,
            className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
            label: 'Pending'
        },
        'cancelled': {
            icon: XCircle,
            className: 'bg-red-50 text-red-700 border-red-200',
            label: 'Cancelled'
        },
        'draft': {
            icon: AlertCircle,
            className: 'bg-zinc-50 text-zinc-700 border-zinc-200',
            label: 'Draft'
        },
    };
    return configs[status] || configs['draft'];
};

export default function OrderDetailsClient({ id }: { id: string }) {
    const { customer, isAuthenticated, isLoading, token } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [mounted, isLoading, isAuthenticated, router]);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!token || !id) return;

            try {
                setLoading(true);
                const response = await authAPI.getOrder(token, id);
                if (response.success && response.order) {
                    setOrder(response.order);
                } else {
                    setError(response.message || 'Failed to fetch order details');
                }
            } catch (err: any) {
                console.error('Failed to fetch order:', err);
                setError('Failed to load order. It may not exist or you do not have permission.');
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated && token && id) {
            fetchOrder();
        }
    }, [isAuthenticated, token, id]);

    if (!mounted || isLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                        <p className="text-zinc-600 mb-6">{error}</p>
                        <Link href="/orders">
                            <Button variant="outline">Back to My Orders</Button>
                        </Link>
                    </Card>
                </div>
            </div>
        );
    }

    if (!order) return null;

    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;

    return (
        <>
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-area, .print-area * {
                        visibility: visible;
                    }
                    .print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .print-header {
                        display: block !important;
                    }
                }
                .print-header {
                    display: none;
                }
            `}</style>

            <div className="min-h-screen bg-zinc-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link - No Print */}
                    <div className="mb-6 no-print">
                        <Link
                            href="/orders"
                            className="inline-flex items-center text-zinc-600 hover:text-red-600 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to My Orders
                        </Link>
                    </div>

                    <div className="print-area">
                        {/* Print Header - Only visible when printing */}
                        <div className="print-header mb-8 pb-6 border-b-2 border-red-600">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-red-600 mb-2">Los Reyes Tires</h1>
                                    <p className="text-sm text-zinc-600">Premium Tire Sales & Service</p>
                                    <div className="mt-3 text-sm text-zinc-600 space-y-1">
                                        <p>📍 Ensenada, Baja California</p>
                                        <p>📞 +52 (646) 123-4567</p>
                                        <p>✉️ sales@losreyestires.com</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-zinc-500">Invoice Date</p>
                                    <p className="font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <h1 className="text-3xl font-bold text-zinc-900">
                                        Order #{order.invoice_number}
                                    </h1>
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${statusConfig.className}`}>
                                        <StatusIcon className="h-4 w-4" />
                                        <span className="font-semibold text-sm">{statusConfig.label}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-zinc-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Placed on {new Date(order.created_at).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Package className="h-4 w-4" />
                                        {order.items.length} Item(s)
                                    </div>
                                </div>
                            </div>

                            <Button variant="outline" className="gap-2 no-print" onClick={() => window.print()}>
                                <Printer className="h-4 w-4" />
                                Print Invoice
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Items List */}
                                <Card className="overflow-hidden">
                                    <div className="bg-gradient-to-r from-red-50 to-zinc-50 px-6 py-4 border-b">
                                        <h3 className="font-semibold text-zinc-900">Order Items</h3>
                                    </div>
                                    <div className="divide-y divide-zinc-100">
                                        {order.items.map((item: any) => {
                                            const isTire = item.item_type === 'TireItem' || item.item_type === 'tire';
                                            const productUrl = isTire ? `/products?search=${encodeURIComponent(item.description)}` : '/products';

                                            return (
                                                <div key={item.id} className="p-6 hover:bg-zinc-50 transition-colors">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-start gap-2 mb-2">
                                                                <h4 className="font-medium text-zinc-900 flex-1">{item.description}</h4>
                                                                <Link
                                                                    href={productUrl}
                                                                    className="no-print text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 text-sm font-medium"
                                                                >
                                                                    View Product
                                                                    <ExternalLink className="h-3 w-3" />
                                                                </Link>
                                                            </div>
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <Badge variant="outline" className="text-xs capitalize">
                                                                    {item.item_type === 'TireItem' ? '🛞 Tire' : '📦 ' + item.item_type}
                                                                </Badge>
                                                            </div>
                                                            <div className="text-sm text-zinc-600">
                                                                Quantity: <span className="font-semibold text-zinc-900">{item.quantity}</span> ×
                                                                <span className="font-semibold text-zinc-900"> ${item.unit_price.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-bold text-zinc-900">
                                                                ${item.total_price.toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Card>

                                {/* Order Notes */}
                                {order.notes && (
                                    <Card className="p-6">
                                        <h3 className="font-semibold text-zinc-900 mb-3 flex items-center gap-2">
                                            <AlertCircle className="h-5 w-5 text-zinc-500" />
                                            Order Notes
                                        </h3>
                                        <p className="text-zinc-600 text-sm whitespace-pre-wrap bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                                            {order.notes}
                                        </p>
                                    </Card>
                                )}
                            </div>

                            {/* Sidebar - Order Summary */}
                            <div className="md:col-span-1">
                                <Card className="p-6 sticky top-6">
                                    <h3 className="font-semibold text-zinc-900 mb-6">Order Summary</h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between text-zinc-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-zinc-600">
                                            <span>Tax</span>
                                            <span className="font-medium">${order.tax.toFixed(2)}</span>
                                        </div>

                                        <div className="border-t pt-3 mt-3 flex justify-between font-bold text-xl text-zinc-900">
                                            <span>Total</span>
                                            <span className="text-red-600">${order.total_amount.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t">
                                        <h4 className="font-medium text-zinc-900 mb-3">Customer Details</h4>
                                        <div className="text-sm text-zinc-600 space-y-2 bg-zinc-50 p-4 rounded-lg">
                                            <p className="font-medium text-zinc-900">{order.customer.name}</p>
                                            <p className="flex items-center gap-2">
                                                <span className="text-zinc-400">✉️</span>
                                                {order.customer.email}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span className="text-zinc-400">📞</span>
                                                {order.customer.phone}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Store Info for Print */}
                                    <div className="mt-6 pt-6 border-t print-only">
                                        <h4 className="font-medium text-zinc-900 mb-3">Store Information</h4>
                                        <div className="text-sm text-zinc-600 space-y-2">
                                            <p className="font-bold text-red-600">Los Reyes Tires</p>
                                            <p>Ensenada, Baja California</p>
                                            <p>Phone: +52 (646) 123-4567</p>
                                            <p>Email: sales@losreyestires.com</p>
                                            <p className="mt-4 text-xs text-zinc-500 italic">
                                                Thank you for your business!
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
