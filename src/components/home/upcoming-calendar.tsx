'use client';

import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface CalendarEvent {
  day: string;
  month: string;
  title: string;
  description: string;
}

interface UpcomingCalendarProps {
  events: CalendarEvent[];
}

export function UpcomingCalendar({ events }: UpcomingCalendarProps) {
  return (
    <Card className="lg:col-span-1" aria-labelledby="upcoming-heading">
      <CardHeader className="p-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-7 w-7 text-primary" />
          <h2 id="upcoming-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Upcoming Calendar
          </h2>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {events.map((event, index) => (
            <article key={index} className="flex items-center gap-4">
              <div className="text-center bg-muted p-2 rounded-md" aria-hidden="true">
                <p className="font-bold text-lg">{event.day}</p>
                <p className="text-xs text-muted-foreground">{event.month}</p>
              </div>
              <div>
                <h4 className="font-semibold">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
