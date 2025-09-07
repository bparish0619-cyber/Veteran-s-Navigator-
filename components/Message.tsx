
import React from 'react';
import type { Message as MessageType } from '../types';
import SourceLink from './SourceLink';

interface MessageProps {
  message: MessageType;
}

const formatContent = (content: string) => {
  // A simple markdown-to-html converter for basic formatting
  let html = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italics

  // Process list blocks
  html = html.replace(/(?:^\s*[-*]\s.*(?:\r?\n|$))+/gm, (match) => {
    const items = match.trim().split('\n').map(item => `<li>${item.replace(/^\s*[-*]\s/, '')}</li>`).join('');
    return `<ul class="list-disc list-inside my-2">${items}</ul>`;
  });

  return { __html: html };
};


const Message: React.FC<MessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  const messageContainerClasses = isModel
    ? 'flex justify-start'
    : 'flex justify-end';
  
  const messageBubbleClasses = isModel
    ? 'bg-slate-700 text-slate-200 rounded-lg rounded-bl-none'
    : 'bg-blue-600 text-white rounded-lg rounded-br-none';

  return (
    <div className={messageContainerClasses}>
      <div className={`p-4 max-w-2xl prose prose-slate ${messageBubbleClasses} whitespace-pre-wrap break-words`}>
        <div dangerouslySetInnerHTML={formatContent(message.content)} />
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 border-t border-slate-600 pt-3">
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Sources</h4>
            <div className="flex flex-wrap gap-2">
              {message.sources.map((source, index) => (
                <SourceLink key={index} source={source} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;