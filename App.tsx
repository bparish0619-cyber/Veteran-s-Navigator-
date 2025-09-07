
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import Footer from './components/Footer';
import QuickActions from './components/QuickActions';
import { getVABenefitsResponse } from './services/geminiService';
import type { Message } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState<boolean>(true);

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: 'initial-welcome',
        role: 'model',
        content: 'Welcome to the VA Benefits Navigator. I am an AI assistant designed to help you understand the VA benefits process based on official regulations. How can I assist you today? \n\nFor example, you can ask: "What is the PACT Act?" or "How do I file a claim for disability?"'
      }
    ]);
  }, []);

  const handleSendMessage = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    setShowQuickActions(false);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const { text, sources } = await getVABenefitsResponse(prompt);
      const modelMessage: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: text,
        sources: sources,
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Sorry, I encountered an error: ${errorMessage}`);
      const errorMessageModel: Message = {
          id: `error-${Date.now()}`,
          role: 'model',
          content: `I'm sorry, but I ran into a problem trying to get a response. Please check your connection or try again later. \n\n**Error:** ${errorMessage}`
      };
      setMessages(prev => [...prev, errorMessageModel]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen font-sans bg-slate-900 text-slate-200">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </main>
      <div className="bg-slate-800 border-t border-slate-700">
        <div className="container mx-auto p-4">
            {showQuickActions && <QuickActions onSendMessage={handleSendMessage} />}
            <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;