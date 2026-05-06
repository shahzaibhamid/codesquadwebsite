'use client';

import { useState, useEffect } from 'react';
import BookingModal from '@/components/booking-modal';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Industries', href: '#industries' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/">
            <motion.span
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
                priority
              />
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
              >
                {link.href.startsWith('#') ? (
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-1 ${
                      activeSection === link.href.replace('#', '')
                        ? scrolled ? 'text-[#0066FF]' : 'text-white'
                        : scrolled ? 'text-gray-600 hover:text-[#0066FF] hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-1 ${
                      (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                        ? 'text-[#0066FF] bg-blue-50'
                        : scrolled ? 'text-gray-600 hover:text-[#0066FF] hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => setShowBooking(true)}
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-md shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-300 h-9 text-sm font-medium px-5"
            >
              Book a Free Call
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <Image
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
                      {navLinks.map((link, i) => (
                        link.href.startsWith('#') ? (
                          <motion.button
                            key={link.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => scrollTo(link.href)}
                            className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                              activeSection === link.href.replace('#', '') ? 'bg-blue-50 text-[#0066FF]' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {link.label}
                          </motion.button>
                        ) : (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link
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
                          </motion.div>
                        )
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-gray-100">
                    <Button
                      className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg h-11 text-sm font-medium"
                      onClick={() => { setMobileOpen(false); setShowBooking(true); }}
                    >
                      Book a Free Call
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
    {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </>
  );
}
