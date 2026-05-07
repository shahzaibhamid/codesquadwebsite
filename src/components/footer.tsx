'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shahzaibhamid/',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
  { label: 'Mail', href: 'mailto:info@codesquad.ai', svg: <Mail className="w-4 h-4" /> },
];

const toolLogos = [
  {
    name: 'OpenAI',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M22.28 9.82a6 6 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A6.07 6.07 0 004.98 4.18a6 6 0 00-4 2.9 6.05 6.05 0 00.74 7.1 5.98 5.98 0 00.51 4.91 6.05 6.05 0 006.52 2.9A5.98 5.98 0 0013.26 24a6.06 6.06 0 005.77-4.21 5.99 5.99 0 004-2.9 6.06 6.06 0 00-.75-7.07zM13.26 22.43a4.48 4.48 0 01-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 00.39-.68V11.2l2.02 1.17a.07.07 0 01.04.05v5.58a4.5 4.5 0 01-4.49 4.43zM3.6 18.3a4.47 4.47 0 01-.54-3.01l.14.09 4.78 2.76a.77.77 0 00.78 0l5.84-3.37v2.33a.08.08 0 01-.03.06L9.74 19.95A4.5 4.5 0 013.6 18.3zM2.34 7.9a4.49 4.49 0 012.37-1.97v5.68a.77.77 0 00.39.68l5.81 3.35-2.02 1.17a.08.08 0 01-.07 0L3.99 13.9A4.5 4.5 0 012.34 7.9zm16.6 3.86l-5.84-3.37 2.02-1.17a.08.08 0 01.07 0l4.83 2.79a4.49 4.49 0 01-.68 8.1V12.44a.79.79 0 00-.4-.68zm2.01-3.02l-.14-.09-4.77-2.78a.78.78 0 00-.79 0L9.41 9.23V6.9a.07.07 0 01.03-.06l4.83-2.79a4.5 4.5 0 016.68 4.69zM8.3 12.86l-2.02-1.16a.08.08 0 01-.04-.06V6.07a4.5 4.5 0 017.38-3.45l-.14.08-4.78 2.76a.79.79 0 00-.39.68v6.72zm1.1-2.37l2.6-1.5 2.61 1.5v3l-2.6 1.5-2.61-1.5V10.49z" />
      </svg>
    ),
  },
  {
    name: 'Make',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M2.994 13.195a1.703 1.703 0 110-3.406 1.703 1.703 0 010 3.406zM21.006 13.195a1.703 1.703 0 110-3.406 1.703 1.703 0 010 3.406zM12 4.693a1.703 1.703 0 110-3.406 1.703 1.703 0 010 3.406zM12 22.714a1.703 1.703 0 110-3.406 1.703 1.703 0 010 3.406zM6.424 7.007a1.703 1.703 0 110-3.406 1.703 1.703 0 010 3.406zM17.576 20.4a1.703 1.703 0 110-3.407 1.703 1.703 0 010 3.406zM6.424 20.4a1.703 1.703 0 110-3.407 1.703 1.703 0 010 3.406zM17.576 7.007a1.703 1.703 0 110-3.406 1.703 1.703 0 010 3.406zM12 13.703a1.703 1.703 0 110-3.406 1.703 1.703 0 010 3.406z" />
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 001.268-1.978V3.07a2.198 2.198 0 00-2.195-2.195h-.037a2.198 2.198 0 00-2.195 2.195v.037c0 .876.514 1.636 1.268 1.978V7.93a6.232 6.232 0 00-2.963 1.307L5.028 4.387a2.44 2.44 0 00.085-.625 2.463 2.463 0 10-2.463 2.463c.468 0 .9-.136 1.27-.363l10.132 4.748a6.23 6.23 0 00-.822 3.075c0 1.198.338 2.316.925 3.267l-3.077 3.077a1.96 1.96 0 00-.57-.085 1.99 1.99 0 101.99 1.99c0-.21-.033-.413-.085-.608l3.042-3.042a6.254 6.254 0 004.31 1.717c3.453 0 6.255-2.802 6.255-6.254 0-3.25-2.487-5.934-5.656-6.217zm-.964 9.754a3.539 3.539 0 113.539-3.538 3.542 3.542 0 01-3.539 3.538z" />
      </svg>
    ),
  },
  {
    name: 'Google',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  {
    name: 'Meta',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M6.915 12c0 .733.107 1.41.303 1.994.138.41.326.752.551.99.225.238.474.364.73.364.328 0 .664-.136.99-.553.34-.435.617-1.128.78-2.04.032-.183.046-.37.046-.555 0-.727-.109-1.402-.305-1.984a2.59 2.59 0 00-.55-.991c-.225-.238-.474-.364-.73-.364-.26 0-.51.13-.737.374-.228.243-.422.596-.563 1.026-.163.502-.265 1.096-.265 1.739H6.915zm10.17 0c0 .726-.108 1.401-.305 1.984a2.588 2.588 0 01-.55.99c-.225.238-.474.365-.73.365-.327 0-.663-.136-.989-.553-.34-.435-.617-1.128-.78-2.04a4.06 4.06 0 01-.047-.556c0-.727.109-1.402.306-1.984.137-.41.325-.752.55-.99.225-.238.474-.364.73-.364.26 0 .51.13.737.374.228.243.422.596.563 1.026.163.502.515 1.748.515 1.748zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5S3.5 16.687 3.5 12 7.313 3.5 12 3.5zm-3.5 4.75c-.8 0-1.538.287-2.1.76C5.667 9.62 5 10.77 5 12.25c0 1.255.497 2.384 1.295 3.195C7.087 16.25 8.157 16.75 9.25 16.75c.806 0 1.611-.256 2.299-.805.348-.277.686-.636.951-1.07.265.434.603.793.951 1.07.688.549 1.493.805 2.299.805 1.093 0 2.163-.5 2.955-1.305C19.503 14.634 20 13.505 20 12.25c0-1.48-.667-2.63-1.4-3.24a3.375 3.375 0 00-2.1-.76c-.9 0-1.745.366-2.43.977A5.678 5.678 0 0012 11.2a5.678 5.678 0 00-2.07-1.973A3.623 3.623 0 008.5 8.25z" />
      </svg>
    ),
  },
  {
    name: 'Salesforce',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M10.014 4.777c.722-.738 1.722-1.198 2.826-1.198 1.476 0 2.766.82 3.464 2.043a4.8 4.8 0 011.796-.349c2.668 0 4.83 2.178 4.83 4.863 0 2.686-2.162 4.864-4.83 4.864-.332 0-.656-.035-.968-.101a3.576 3.576 0 01-3.154 1.905 3.546 3.546 0 01-1.48-.321 4.27 4.27 0 01-3.934 2.64c-1.99 0-3.676-1.364-4.177-3.21a3.905 3.905 0 01-.741.071C1.955 16.984 0 15.019 0 12.606c0-1.638.88-3.07 2.188-3.844a4.51 4.51 0 01-.1-.93c0-2.49 2.002-4.51 4.473-4.51 1.27 0 2.42.53 3.253 1.38l.2.075z" />
      </svg>
    ),
  },
  {
    name: 'Apollo',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2L2 19.5h20L12 2zm0 3.5l7.5 13H4.5L12 5.5zm-1 5.5v4h2v-4h-2zm0 5v2h2v-2h-2z" />
      </svg>
    ),
  },
  {
    name: 'Zapier',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M14.924 8.341a.588.588 0 01-.571.742H9.647a.588.588 0 01-.571-.742l.891-3.236a.588.588 0 01.968-.25L12 6.236l1.065-1.38a.588.588 0 01.968.25l.891 3.235zM9.076 15.659a.588.588 0 01.571-.742h4.706a.588.588 0 01.571.742l-.891 3.236a.588.588 0 01-.968.25L12 17.764l-1.065 1.38a.588.588 0 01-.968-.25l-.891-3.235zM8.341 9.076a.588.588 0 01.742.571v4.706a.588.588 0 01-.742.571l-3.236-.891a.588.588 0 01-.25-.968L6.236 12l-1.38-1.065a.588.588 0 01.25-.968l3.235-.891zM15.659 14.924a.588.588 0 01-.742-.571V9.647a.588.588 0 01.742-.571l3.236.891a.588.588 0 01.25.968L17.764 12l1.38 1.065a.588.588 0 01-.25.968l-3.235.891z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#071020] via-[#0A1628] to-[#071020]" />
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative h-px animated-gradient-line" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="CodeSquad"
                width={160}
                height={48}
                className="h-11 w-auto object-contain"
              />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              We build revenue engines, automation systems, and owned workflows inside your stack.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-5">
              Contact
            </h4>
            <div className="space-y-3 mb-6">
              <a
                href="tel:+14177645309"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-all duration-300">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                +1 (417) 764-5309
              </a>
              <a
                href="mailto:info@codesquad.ai"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-all duration-300">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                info@codesquad.ai
              </a>
            </div>
            <div className="flex gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0066FF] hover:border-[#0066FF] hover:text-white transition-all duration-300"
                >
                  {link.svg}
                </a>
              ))}
            </div>

          </div>

          <div className="lg:justify-self-end">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-5">
              Offices
            </h4>
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 mt-0.5 border border-white/10">
                  <svg viewBox="0 0 28 28" className="w-full h-full">
                    <rect width="28" height="28" fill="#B22234" />
                    <rect y="2.154" width="28" height="2.154" fill="#fff" />
                    <rect y="6.462" width="28" height="2.154" fill="#fff" />
                    <rect y="10.769" width="28" height="2.154" fill="#fff" />
                    <rect y="15.077" width="28" height="2.154" fill="#fff" />
                    <rect y="19.385" width="28" height="2.154" fill="#fff" />
                    <rect y="23.692" width="28" height="2.154" fill="#fff" />
                    <rect width="11.2" height="15.077" fill="#3C3B6E" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#338AFF] uppercase tracking-wider mb-1">USA</p>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 leading-relaxed block">
                    8 The Green Ste 14681,<br />Dover, DE 19901
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 mt-0.5 border border-white/10">
                  <svg viewBox="0 0 28 28" className="w-full h-full">
                    <rect width="28" height="28" fill="#01411C" />
                    <rect width="7" height="28" fill="#fff" />
                    <circle cx="17" cy="14" r="5.5" fill="#01411C" stroke="none" />
                    <circle cx="18.5" cy="14" r="4.2" fill="#01411C" stroke="none" />
                    <circle cx="16.2" cy="14" r="4.8" fill="none" stroke="#fff" strokeWidth="1.5" />
                    <polygon points="21,11.5 21.6,13.4 23.5,13.4 22,14.6 22.6,16.5 21,15.3 19.4,16.5 20,14.6 18.5,13.4 20.4,13.4" fill="#fff" transform="scale(0.7) translate(12,6)" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#338AFF] uppercase tracking-wider mb-1">Pakistan</p>
                  <a
                    href="https://maps.app.goo.gl/uhAhYB7Ja5REpc3o9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 leading-relaxed block"
                  >
                    Lahore, Pakistan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-10 mb-10">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-5 text-center">
            Tools & Platforms We Work With
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {toolLogos.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white text-[10px] font-semibold">
                  {tool.svg}
                </div>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-500">
            &copy; {new Date().getFullYear()} CodeSquad. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
