import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, Tag } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    { icon: AlertTriangle, title: "Price Drop Alert", message: "Samsung Galaxy S24 Ultra is now 10% off!", time: "5m ago" },
    { icon: Tag, title: "New Deal Added", message: "Check out the new deals on OnePlus phones.", time: "1h ago" },
    { icon: Bell, title: "iPhone 17 Pre-orders", message: "Pre-orders for the new iPhone will start next week.", time: "1d ago" },
  ];

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-start gap-4 p-6">
                <notification.icon className="h-6 w-6 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-semibold">{notification.title}</p>
                  <p className="text-muted-foreground">{notification.message}</p>
                </div>
                <p className="text-sm text-muted-foreground whitespace-nowrap">{notification.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
