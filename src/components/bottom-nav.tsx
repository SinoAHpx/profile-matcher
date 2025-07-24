'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/home',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: User,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  // Don't show bottom nav on auth routes or guide
  if (pathname.startsWith('/auth') || pathname === '/' || pathname === '/guide') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-lg transition-colors',
                'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}