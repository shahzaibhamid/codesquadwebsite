'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnimatedSection, AnimatedItem } from '@/components/animated-section';
import SectionHeader from '@/components/section-header';
import { useToast } from '@/hooks/use-toast';

const serviceOptions = [
  'Healthcare Solutions',
  'Computer Vision',
  'Agriculture Technology',
  'Engineering IoT',
  'Engineering Tech',
];

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'info@codesquad.ai', href: 'mailto:info@codesquad.ai' },
  { icon: Phone, label: 'Phone', value: '+1 (307) 396-4945', href: 'tel:+13073964945' },
  { icon: MapPin, label: 'Office', value: 'Johar Town J2, Lahore Pakistan', href: 'https://maps.app.goo.gl/uhAhYB7Ja5REpc3o9' },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in your name, email, and message.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast({
          title: 'Submission failed',
          description: data.message || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      setFormData({ name: '', email: '', company: '', service: '', message: '' });

      toast({
        title: 'Message sent successfully!',
        description: data.summary || "We'll get back to you within 24 hours.",
      });
    } catch {
      toast({
        title: 'Network error',
        description:
          'Unable to reach the server. Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-gradient-to-b from-white to-gray-50/40 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionHeader
          label="Contact"
          title="Get in Touch"
          description="Tell us what you want to build. We&apos;ll reply with the next step."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* ── Left Panel ── */}
          <AnimatedSection variant="fade-right" className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-[#0A1628] to-[#0d1f3a] rounded-3xl p-8 sm:p-10 text-white h-full flex flex-col">
              {/* Subtle top-right glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Heading */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                  Let&apos;s build something{' '}
                  <span className="bg-gradient-to-r from-[#338AFF] to-[#66B2FF] bg-clip-text text-transparent">
                    great together.
                  </span>
                </h3>
                <p className="text-blue-200/50 text-sm leading-relaxed mt-3 mb-10">
                  Whether you have a clear plan or just an idea, we&apos;ll help shape the next move.
                </p>

                {/* Contact Details */}
                <div className="space-y-4 mb-10">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF]/20 group-hover:border-[#0066FF]/30 transition-colors duration-300">
                        <Icon className="w-4 h-4 text-blue-300/70 group-hover:text-[#66B2FF] transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.12em] text-blue-200/30 font-semibold">
                          {label}
                        </p>
                        <p className="text-sm text-blue-100/90 font-medium group-hover:text-white transition-colors duration-300">
                          {value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Availability */}
                <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 mb-10">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-sm font-semibold text-emerald-300">
                      Available for new projects
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/35 ml-[18px]">
                    Mon – Fri, 9 AM – 6 PM PST
                  </p>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

              </div>
            </div>
          </AnimatedSection>

          {/* ── Right: Form ── */}
          <AnimatedSection variant="fade-left" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-6 sm:p-8 lg:p-10"
            >
              <div className="mb-8">
                <h4 className="text-xl font-bold text-[#0A1628] tracking-tight">
                  Send a message
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  Give us a quick overview and we&apos;ll respond shortly.
                </p>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-600">
                    Full Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="h-11 rounded-xl border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="h-11 rounded-xl border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
                  />
                </div>
              </div>

              {/* Company & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-gray-600">
                    Company
                  </Label>
                  <Input
                    id="company"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="h-11 rounded-xl border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm font-medium text-gray-600">
                    Service Interest
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleChange('service', value)}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 w-full">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 mb-8">
                <Label htmlFor="message" className="text-sm font-medium text-gray-600">
                  Message <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="rounded-xl border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-xl h-12 text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </>
                  )}
                </span>
              </Button>

              <p className="text-center text-xs text-gray-400 mt-5">
                By submitting, you agree to our privacy policy. We&apos;ll never share your data.
              </p>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
