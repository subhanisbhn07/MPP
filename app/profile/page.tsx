'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth-context';
import { PhoneCard } from '@/components/phone-card';
import { mockPhones } from '@/lib/mock-data';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#4169E1] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/80">Manage your account and preferences</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                {user.photoURL && (
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200" />
                )}
                <h2 className="font-bold text-lg">{user.displayName}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <Tabs defaultValue="wishlist">
              <TabsList>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
                <TabsTrigger value="reviews">My Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="wishlist" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                {user.wishlist && user.wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPhones
                      .filter(p => user.wishlist.includes(p.id))
                      .map(phone => (
                        <PhoneCard key={phone.id} phone={phone} />
                      ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                    <Button onClick={() => router.push('/search')}>
                      Browse Phones
                    </Button>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="alerts" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">Price Alerts</h2>
                <Card className="p-12 text-center">
                  <p className="text-gray-500">No active price alerts</p>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
                <Card className="p-12 text-center">
                  <p className="text-gray-500">You haven&apos;t written any reviews yet</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
