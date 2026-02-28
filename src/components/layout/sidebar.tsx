'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Rocket, 
  DollarSign, 
  BookOpen,
  Activity,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Incidents', href: '/incidents', icon: AlertTriangle },
  { name: 'Deployments', href: '/deployments', icon: Rocket },
  { name: 'Cost Optimization', href: '/costs', icon: DollarSign },
  { name: 'Runbooks', href: '/runbooks', icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">CommandHQ</h1>
            <p className="text-xs text-muted-foreground">AI DevOps Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Status Footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 dark:bg-green-950">
          <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
          <div className="flex-1">
            <p className="text-xs font-medium text-green-900 dark:text-green-100">
              All Systems Operational
            </p>
            <p className="text-xs text-green-700 dark:text-green-300">
              98.5% uptime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
