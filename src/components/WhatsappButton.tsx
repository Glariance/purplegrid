import React from 'react';
import { MessageCircle } from 'lucide-react';

type WhatsappButtonProps = {
  className?: string;
};

const WhatsappButton = ({ className = '' }: WhatsappButtonProps) => {
  return (
    <a
      href="https://wa.me/17187508480"
      target="_blank"
      rel="noopener noreferrer"
      className={`group block ${className}`}
      aria-label="Chat with us on WhatsApp"
    >
      <div className="relative flex items-center justify-end gap-3">
        <span className="absolute right-full mr-3 inline-flex items-center px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wide text-white drop-shadow-[0_0_8px_rgba(209,0,255,0.8)] transform translate-x-6 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          WhatsApp
        </span>
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-[#7A00FF] via-[#D100FF] to-[#5A00B0] opacity-70 rounded-full" />
          <div className="relative h-16 w-16 rounded-full bg-white/15 border border-white/30 backdrop-blur-md shadow-lg shadow-[#5A00B0]/40 flex items-center justify-center group-hover:scale-105 transition-transform animate-float">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7A00FF] via-[#D100FF] to-[#5A00B0] text-white">
              <MessageCircle className="h-6 w-6 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default WhatsappButton;
