'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd, generateBreadcrumbSchema } from './json-ld';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const baseUrl = 'https://mobilephonespro.com';
  
  const schemaItems = [
    { name: 'Home', url: baseUrl },
    ...items.map(item => ({
      name: item.label,
      url: `${baseUrl}${item.href}`,
    })),
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className={`flex items-center text-sm text-muted-foreground ${className}`}>
        <ol className="flex items-center flex-wrap gap-1">
          <li className="flex items-center">
            <Link 
              href="/" 
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1" aria-hidden="true" />
              {index === items.length - 1 ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
