'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Lock, Bell, Shield, User, Mail, Phone, Building } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const { customer, isAuthenticated, isLoading, refreshProfile } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [mounted, isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (customer) {
      setFormData({
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        company: customer.company || '',
      });
    }
  }, [customer]);

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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // TODO: Implement API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
      await refreshProfile();
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.new_password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    setIsSaving(true);
    
    try {
      // TODO: Implement API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Password changed successfully!');
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    } catch (error) {
      console.error('Password change failed:', error);
      alert('Failed to change password. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Settings</h1>
          <p className="text-zinc-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-50 text-red-700'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-zinc-900">Profile Information</h2>
                  <p className="text-sm text-zinc-600 mt-1">
                    Update your account profile information and email address
                  </p>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-zinc-900">Change Password</h2>
                  <p className="text-sm text-zinc-600 mt-1">
                    Ensure your account is using a long, random password to stay secure
                  </p>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input
                      id="current_password"
                      type="password"
                      value={passwordData.current_password}
                      onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="new_password">New Password</Label>
                    <Input
                      id="new_password"
                      type="password"
                      value={passwordData.new_password}
                      onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                    <Input
                      id="confirm_password"
                      type="password"
                      value={passwordData.confirm_password}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </form>

                {/* Email Verification Status */}
                <div className="mt-8 p-4 bg-zinc-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className={`h-5 w-5 mt-0.5 ${customer.email_verified ? 'text-green-600' : 'text-amber-600'}`} />
                    <div>
                      <h3 className="font-semibold text-zinc-900">Email Verification</h3>
                      <p className="text-sm text-zinc-600 mt-1">
                        {customer.email_verified
                          ? 'Your email address is verified.'
                          : 'Your email address is not verified yet.'}
                      </p>
                      {!customer.email_verified && (
                        <Button variant="outline" size="sm" className="mt-2">
                          Send Verification Email
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-zinc-900">Notification Preferences</h2>
                  <p className="text-sm text-zinc-600 mt-1">
                    Manage how you receive notifications from us
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-zinc-900">Order Updates</h3>
                      <p className="text-sm text-zinc-600 mt-1">
                        Get notified when your order status changes
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5 text-red-600" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-zinc-900">Promotions & Deals</h3>
                      <p className="text-sm text-zinc-600 mt-1">
                        Receive emails about special offers and promotions
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5 text-red-600" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-zinc-900">Product Updates</h3>
                      <p className="text-sm text-zinc-600 mt-1">
                        News about products and features
                      </p>
                    </div>
                    <input type="checkbox" className="h-5 w-5 text-red-600" />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
