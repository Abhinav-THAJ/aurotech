'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react';

export default function MyAccountPage() {
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-12 px-4">
        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-slate-100 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isLoginView ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-500">
              {isLoginView ? 'Enter your details to access your account' : 'Sign up for a new account'}
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {!isLoginView && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <Input required placeholder="johndoe" className="h-12" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <Input required type="email" placeholder="you@example.com" className="h-12" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <Input required type="password" placeholder="••••••••" className="h-12" />
            </div>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg rounded-xl">
              {isLoginView ? 'Log In' : 'Register'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            {isLoginView ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLoginView(!isLoginView)} 
              className="text-orange-600 font-semibold hover:underline"
            >
              {isLoginView ? 'Register here' : 'Log in here'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">My Account</h1>
        
        <Tabs defaultValue="dashboard" className="flex flex-col lg:flex-row gap-12">
          <TabsList className="flex lg:flex-col justify-start bg-transparent h-auto p-0 gap-2 overflow-x-auto w-full lg:w-64 flex-shrink-0">
            <TabsTrigger value="dashboard" className="w-full justify-start py-3 px-4 text-left rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <User className="w-5 h-5 mr-3" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="orders" className="w-full justify-start py-3 px-4 text-left rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <Package className="w-5 h-5 mr-3" /> Orders
            </TabsTrigger>
            <TabsTrigger value="addresses" className="w-full justify-start py-3 px-4 text-left rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <MapPin className="w-5 h-5 mr-3" /> Addresses
            </TabsTrigger>
            <TabsTrigger value="settings" className="w-full justify-start py-3 px-4 text-left rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <Settings className="w-5 h-5 mr-3" /> Account Details
            </TabsTrigger>
            <Button variant="ghost" className="w-full justify-start py-3 px-4 text-left text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl mt-4" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-3" /> Logout
            </Button>
          </TabsList>
          
          <div className="flex-1">
            <TabsContent value="dashboard" className="m-0">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold mb-4">Hello, User</h2>
                <p className="text-slate-600 mb-6">
                  From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 mt-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                    <Package className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-900">0 Orders</h3>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                    <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-900">1 Address</h3>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="m-0">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold mb-6">Order History</h2>
                <div className="bg-slate-50 rounded-xl p-8 text-center text-slate-500 border border-slate-100">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="mb-6">No order has been made yet.</p>
                  <Link href="/shop" className={buttonVariants({ className: "bg-orange-600 hover:bg-orange-700 rounded-full" })}>Browse Products</Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="addresses" className="m-0">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold mb-6">Addresses</h2>
                <p className="text-slate-600 mb-8">
                  The following addresses will be used on the checkout page by default.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="border border-slate-200 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                      <h3 className="font-bold text-lg">Billing Address</h3>
                      <button className="text-orange-600 font-medium hover:underline text-sm">Edit</button>
                    </div>
                    <address className="not-italic text-slate-600 leading-relaxed">
                      John Doe<br/>
                      123 Main St<br/>
                      Apartment 4B<br/>
                      New York, NY 10001<br/>
                      United States
                    </address>
                  </div>
                  
                  <div className="border border-slate-200 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                      <h3 className="font-bold text-lg">Shipping Address</h3>
                      <button className="text-orange-600 font-medium hover:underline text-sm">Edit</button>
                    </div>
                    <p className="text-slate-600 italic">
                      You have not set up this type of address yet.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="m-0">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold mb-6">Account Details</h2>
                <form className="space-y-6 max-w-2xl">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <Input defaultValue="John" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <Input defaultValue="Doe" className="h-12" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Display Name</label>
                    <Input defaultValue="johndoe" className="h-12" />
                    <p className="text-xs text-slate-500 mt-2">This will be how your name will be displayed in the account section and in reviews.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <Input type="email" defaultValue="you@example.com" className="h-12" />
                  </div>
                  
                  <h3 className="text-lg font-bold mt-8 mb-4">Password Change</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                      <Input type="password" placeholder="Leave blank to leave unchanged" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                      <Input type="password" placeholder="Leave blank to leave unchanged" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                      <Input type="password" placeholder="Leave blank to leave unchanged" className="h-12" />
                    </div>
                  </div>
                  
                  <Button type="button" className="bg-slate-900 hover:bg-slate-800 text-white h-12 px-8 rounded-xl mt-8">
                    Save Changes
                  </Button>
                </form>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
