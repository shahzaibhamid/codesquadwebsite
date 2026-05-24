'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Building2, ChevronDown, MessageSquare, Loader2, ArrowRight, Phone } from 'lucide-react';

const serviceOptions = [
  'SEO Audit + Keyword Research',
  'Automation Platform Setup + Connections',
  'Automated Blog Pipeline Build',
  'Human Review Checkpoint Setup',
  'Content Repurposing Flows',
  'Ads Tracking & Attribution Setup',
  'AEO Schema + Structured Data',
  'Monthly Blogs + Repurposed Assets',
  'Ads Oversight & Attribution Reporting',
  'Performance Report & Strategy Review',
  'Full Package (All Services)',
  'Others',
];

interface Props {
  onClose: () => void;
}

export default function BookingModal({ onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.service) e.service = 'Please select a service';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => {
      window.open('https://calendly.com/code_squad/30min', '_blank');
      onClose();
    }, 900);
  };

  const field = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const inputWrap = (hasError: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50 transition-all duration-200
     focus-within:bg-white focus-within:shadow-[0_0_0_2px_#1E3A5F]
     ${hasError ? 'border-red-300 bg-red-50 shadow-[0_0_0_1px_#FCA5A5]' : 'border-gray-200 focus-within:border-[#1E3A5F]'}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0d2040] px-8 pt-8 pb-6">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4 text-white/80" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] flex items-center justify-center shadow-lg">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400">Free Consultation</p>
                <h2 className="text-xl font-bold text-white leading-tight">Book a Free Call</h2>
              </div>
            </div>
            <p className="text-sm text-blue-200/60 leading-relaxed">
              Fill out the form and we&apos;ll get back to you shortly.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">

            {/* Name */}
            <div>
              <div className={inputWrap(!!errors.name)}>
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => field('name', e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none border-none focus:ring-0"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <div className={inputWrap(!!errors.email)}>
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={e => field('email', e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none border-none focus:ring-0"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
            </div>

            {/* Company */}
            <div className={inputWrap(false)}>
              <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Your company"
                value={form.company}
                onChange={e => field('company', e.target.value)}
                className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none border-none focus:ring-0"
              />
            </div>

            {/* Service */}
            <div>
              <div className={inputWrap(!!errors.service)}>
                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                <select
                  value={form.service}
                  onChange={e => field('service', e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-800 outline-none appearance-none cursor-pointer border-none focus:ring-0"
                >
                  <option value="" disabled>Select a service</option>
                  {serviceOptions.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {errors.service && <p className="text-xs text-red-500 mt-1 ml-1">{errors.service}</p>}
            </div>

            {/* Message */}
            <div className={inputWrap(false)}>
              <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <textarea
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={e => field('message', e.target.value)}
                rows={3}
                className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none border-none focus:ring-0 resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={!submitting ? { scale: 1.02 } : {}}
              whileTap={!submitting ? { scale: 0.98 } : {}}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 disabled:opacity-70 transition-all"
              style={{ background: 'linear-gradient(135deg, #1E3A5F, #1E3A5F)' }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirecting to calendar...
                </>
              ) : (
                <>
                  Submit &amp; Book Your Call
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-gray-400">
              You&apos;ll be taken to our calendar to pick a time that works for you.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
