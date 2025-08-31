'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Star, Layers, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { allPhones } from "@/lib/data";
import type { Phone } from "@/lib/types";
import { PhoneCard } from "@/components/phone-card";
import { useCompare } from "@/contexts/compare-context";

export default function ProfilePage() {
  const { user, loading, signOut, wishlist } = useAuth();
  const { handleAddToCompare } = useCompare();

  const router = useRouter();
  const [wishlistPhones, setWishlistPhones] = useState<Phone[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
      const phones = allPhones.filter(p => wishlist.includes(p.id));
      setWishlistPhones(phones);
  }, [wishlist])

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start gap-8">
        
        <div className="w-full md:w-1/3">
          <Card className="sticky top-24">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} data-ai-hint="person face" />
                <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.displayName}</h2>
              <p className="text-muted-foreground">{user.email}</p>
                 <Button variant="destructive" className="w-full mt-6" onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                 </Button>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <div className="space-y-8">
            <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                     <Heart className="w-6 h-6 text-primary" />
                     <div>
                       <CardTitle>My Wishlist</CardTitle>
                       <CardDescription>{wishlist.length} phones saved</CardDescription>
                     </div>
                  </div>
                </CardHeader>
                <CardContent>
                    {wishlistPhones.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {wishlistPhones.map(phone => (
                                <PhoneCard key={phone.id} phone={phone} onAddToCompare={handleAddToCompare} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">Your wishlist is empty.</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <div className="flex items-center gap-4">
                      <Star className="w-6 h-6 text-primary" />
                       <div>
                         <CardTitle>My Reviews</CardTitle>
                         <CardDescription>0 reviews written</CardDescription>
                       </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">You haven't written any reviews yet.</p>
                </CardContent>
            </Card>
            
             <Card>
                 <CardHeader>
                   <div className="flex items-center gap-4">
                     <Layers className="w-6 h-6 text-primary" />
                     <div>
                        <CardTitle>Saved Comparisons</CardTitle>
                        <CardDescription>0 comparisons saved</CardDescription>
                     </div>
                   </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">You don't have any saved comparisons.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
