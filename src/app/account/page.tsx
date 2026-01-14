'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Mail, Phone, Building, Calendar, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AccountPage() {
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">My Account</h1>
          <p className="text-zinc-600 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Account Information */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-900">Account Information</h2>
            <Link href="/account/settings">
              <Button variant="outline" size="sm">Edit Profile</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <User className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">Full Name</p>
                <p className="text-base font-semibold text-zinc-900 mt-1">
                  {customer.first_name} {customer.last_name}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">Email Address</p>
                <p className="text-base font-semibold text-zinc-900 mt-1">{customer.email}</p>
                {customer.email_verified && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            {customer.phone && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500">Phone Number</p>
                  <p className="text-base font-semibold text-zinc-900 mt-1">{customer.phone}</p>
                </div>
              </div>
            )}

            {/* Company */}
            {customer.company && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500">Company</p>
                  <p className="text-base font-semibold text-zinc-900 mt-1">{customer.company}</p>
                </div>
              </div>
            )}

            {/* Member Since */}
            {customer.created_at && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500">Member Since</p>
                  <p className="text-base font-semibold text-zinc-900 mt-1">
                    {formatDate(customer.created_at)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/orders">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-red-50 rounded-full mb-3">
                  <User className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-1">My Orders</h3>
                <p className="text-sm text-zinc-600">View your order history</p>
              </div>
            </Card>
          </Link>

          <Link href="/account/settings">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-50 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-1">Settings</h3>
                <p className="text-sm text-zinc-600">Update your preferences</p>
              </div>
            </Card>
          </Link>

          <Link href="/cart">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-50 rounded-full mb-3">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-1">Shopping Cart</h3>
                <p className="text-sm text-zinc-600">View your cart items</p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
