'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Package, Calendar, DollarSign, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function OrdersPage() {
  const { customer, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [mounted, isLoading, isAuthenticated, router]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  // TODO: Replace with actual orders from API
  const orders: any[] = [];

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">My Orders</h1>
          <p className="text-zinc-600 mt-2">View and track your order history</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full mb-4">
                <Package className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">No orders yet</h3>
              <p className="text-zinc-600 mb-6">
                When you place orders, they will appear here.
              </p>
              <a
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Start Shopping
              </a>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Order cards will be mapped here */}
            {orders.map((order: any) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-zinc-900">
                        Order #{order.id}
                      </h3>
                      <Badge variant="secondary">{order.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {order.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${order.total}
                      </div>
                    </div>
                  </div>
                  <button className="text-red-600 font-semibold hover:underline">
                    View Details
                  </button>
                </div>

                {/* Order items preview */}
                <div className="border-t pt-4">
                  <p className="text-sm text-zinc-600">
                    {order.items_count} item(s) in this order
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
