import React, { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';

const FlashMessage = () => {
  const { flash } = usePage().props;
  const [messages, setMessages] = useState([]); 
  const timerRef = useRef(null);

  useEffect(() => {
    if (flash && flash.message) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), message: flash.message },
      ]);
    }
  }, [flash]);

  useEffect(() => {
    if (messages.length > 0) {
      timerRef.current = setTimeout(() => {
        setMessages((prevMessages) => prevMessages.slice(1));
      }, 5000); 

      return () => clearTimeout(timerRef.current);
    }
  }, [messages]); // Re-run when messages change

  // Function to remove message manually
  const handleClose = (id) => {
    setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== id));
  };

  if (messages.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="p-4 bg-green-500 text-white rounded-lg shadow-lg relative"
        >
          {msg.message}
          <button
            onClick={() => handleClose(msg.id)}  // Trigger manual close
            className="absolute top-1 right-1 text-xl text-white bg-transparent border-0 cursor-pointer"
          >
            &times; {/* Cross icon for closing */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlashMessage;
