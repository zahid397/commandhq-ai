'use client';

import { Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store/app-store';

export function Header() {
  const stats = useAppStore((state) => state.stats);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">AI Command Center</h2>
        <div className="flex gap-2">
          {stats.activeIncidents > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
              {stats.activeIncidents} Active Incidents
            </span>
          )}
          {stats.runningDeployments > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              {stats.runningDeployments} Running Deployments
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
