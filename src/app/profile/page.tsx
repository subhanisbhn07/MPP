'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Star, Layers, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} data-ai-hint="person face" />
                <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.displayName}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>My Account</CardTitle>
              <CardDescription>Manage your profile and activity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Heart className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">My Wishlist</h3>
                      <p className="text-sm text-muted-foreground">0 phones saved</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>View</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Star className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">My Reviews</h3>
                      <p className="text-sm text-muted-foreground">0 reviews written</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>View</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Layers className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Saved Comparisons</h3>
                      <p className="text-sm text-muted-foreground">0 comparisons saved</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>View</Button>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                 <Button variant="destructive" className="w-full md:w-auto" onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
