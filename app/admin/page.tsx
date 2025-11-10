'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { 
  Smartphone, 
  Newspaper, 
  Settings, 
  LayoutDashboard,
  Menu,
  Search as SearchIcon
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    router.push('/');
    return null;
  }

  const adminSections = [
    {
      title: 'Phone Management',
      description: 'Add, edit, and manage phone specifications',
      icon: Smartphone,
      href: '/admin/phones',
      color: 'bg-blue-500'
    },
    {
      title: 'AI Spec Generator',
      description: 'Generate phone specs using AI',
      icon: SearchIcon,
      href: '/admin/generate-spec',
      color: 'bg-purple-500'
    },
    {
      title: 'News Management',
      description: 'Create and manage news articles',
      icon: Newspaper,
      href: '/admin/news',
      color: 'bg-green-500'
    },
    {
      title: 'Homepage Builder',
      description: 'Customize homepage sections',
      icon: LayoutDashboard,
      href: '/admin/page-builder/homepage',
      color: 'bg-yellow-500'
    },
    {
      title: 'Menu Management',
      description: 'Manage site navigation',
      icon: Menu,
      href: '/admin/page-builder/menu',
      color: 'bg-red-500'
    },
    {
      title: 'SEO Management',
      description: 'Manage SEO metadata',
      icon: Settings,
      href: '/admin/seo',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A8A] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">
            Master Control Program (MCP)
          </h1>
          <p className="text-white/80">Admin Dashboard</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-gray-500">Total Phones</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">2</p>
                  <p className="text-sm text-gray-500">News Articles</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">0</p>
                  <p className="text-sm text-gray-500">Active Users</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600">0</p>
                  <p className="text-sm text-gray-500">Comparisons</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
