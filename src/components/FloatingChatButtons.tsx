import React from 'react';
import TawkButton from './TawkButton';
import WhatsappButton from './WhatsappButton';

const FloatingChatButtons = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <TawkButton />
    <WhatsappButton />
  </div>
);

export default FloatingChatButtons;
