
import React, { useRef, useEffect } from 'react';
import type { Message as MessageType } from '../types';
import Message from './Message';
import LoadingSpinner from './LoadingSpinner';

interface ChatWindowProps {
  messages: MessageType[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-slate-700 rounded-lg rounded-bl-none p-3 max-w-lg">
                <LoadingSpinner />
                <span className="text-slate-400 animate-pulse">Thinking...</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;