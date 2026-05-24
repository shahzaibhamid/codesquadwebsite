'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'codesquad-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accepted: true, timestamp: Date.now() }),
    );
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accepted: false, timestamp: Date.now() }),
    );
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-5 left-5 z-[55] max-w-md w-full"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 border border-gray-200/60 p-4">
            <div className="flex items-start gap-3">
              {/* Cookie icon */}
              <div className="w-9 h-9 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-[#1E3A5F]" />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 leading-snug">
                  We use cookies to enhance your experience and analyze site
                  traffic.{' '}
                  <a
                    href="#"
                    className="text-[#1E3A5F] font-medium hover:underline"
                  >
                    Learn more
                  </a>
                </p>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDecline}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 px-3.5 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    Decline
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAccept}
                    className="text-xs font-medium text-white bg-[#1E3A5F] hover:bg-[#15293F] px-4 py-2 rounded-lg shadow-sm shadow-blue-500/20 transition-colors duration-200"
                  >
                    Accept
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
