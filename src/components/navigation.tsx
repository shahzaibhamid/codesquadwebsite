'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks: { label: string; href: string }[] = [];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/96 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 lg:h-18 grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Logo */}
          <Link href="/">
            <span className="flex items-center cursor-pointer">
              <img
                src="/logo.png"
                alt="Company Logo"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-1 ${
                  (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                    ? 'text-[#0066FF] bg-blue-50'
                    : 'text-gray-600 hover:text-[#0066FF] hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center justify-end">
            <a
              href="https://calendly.com/code_squad/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0066FF] px-5 h-9 text-sm font-medium text-white shadow-md shadow-blue-500/20 hover:bg-[#0052CC] hover:shadow-lg transition-all duration-300"
            >
              Book a Free Call
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden justify-self-end">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg text-gray-700 transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <img
                        src="/logo.png"
                        alt="Company Logo"
                        width={140}
                        height={42}
                        className="h-9 w-auto object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 px-4 py-6">
                    <div className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                              ? 'bg-blue-50 text-[#0066FF]'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}
