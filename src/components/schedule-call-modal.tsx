'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Calendar,
  Clock,
  User,
  Mail,
  Send,
  X,
  CheckCircle,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const topics = [
  'Custom Software Development',
  'Cloud Migration',
  'AI / ML Solutions',
  'Mobile App Development',
  'UI/UX Design',
  'DevOps & Automation',
  'Technical Consultation',
  'Partnership Inquiry',
];

export default function ScheduleCallModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    topic: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in your name, email, and phone number.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast({ title: 'Failed', description: data.message || 'Please try again.', variant: 'destructive' });
        return;
      }

      setFormData({ name: '', email: '', phone: '', date: '', topic: '', message: '' });
      onOpenChange(false);
      toast({
        title: 'Callback Scheduled! ✓',
        description: data.summary || 'We\'ll reach out within 2 hours.',
      });
    } catch {
      toast({ title: 'Network error', description: 'Please check your connection.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#15293F] px-6 py-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Schedule a Call
            </DialogTitle>
            <DialogDescription className="text-blue-100/80 mt-1">
              Pick a time that works for you. We&apos;ll call you back within 2 hours.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1A1A]">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="pl-9 h-10 rounded-xl bg-gray-50 border-gray-200 focus:border-[#1E3A5F]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1A1A]">
                Email <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-9 h-10 rounded-xl bg-gray-50 border-gray-200 focus:border-[#1E3A5F]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1A1A]">
                Phone <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="pl-9 h-10 rounded-xl bg-gray-50 border-gray-200 focus:border-[#1E3A5F]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1A1A]">
                Topic
              </Label>
              <Select value={formData.topic} onValueChange={(v) => handleChange('topic', v)}>
                <SelectTrigger className="h-10 rounded-xl bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1A1A1A]">
              Preferred Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="pl-9 h-10 rounded-xl bg-gray-50 border-gray-200 focus:border-[#1E3A5F]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1A1A1A]">
              Message <span className="text-xs text-gray-400 font-normal">(optional)</span>
            </Label>
            <Textarea
              placeholder="Briefly describe your project or question..."
              rows={3}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="rounded-xl bg-gray-50 border-gray-200 focus:border-[#1E3A5F] resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1E3A5F] hover:bg-[#15293F] text-white rounded-xl h-11 font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Scheduling...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Schedule Callback
              </span>
            )}
          </Button>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              <span>No obligation</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              <span>2hr response</span>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
