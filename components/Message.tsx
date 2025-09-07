
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
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
    .replace(/^\s*-\s(.*)/gm, '<li class="ml-4 list-disc">$1</li>'); // List items

  return { __html: html.replace(/\n/g, '<br />') };
};


const Message: React.FC<MessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  const messageContainerClasses = isModel
    ? 'flex justify-start'
    : 'flex justify-end';
  
  const messageBubbleClasses = isModel
    ? 'bg-slate-200 text-slate-800 rounded-lg rounded-bl-none'
    : 'bg-blue-600 text-white rounded-lg rounded-br-none';

  return (
    <div className={messageContainerClasses}>
      <div className={`p-4 max-w-2xl prose prose-slate ${messageBubbleClasses}`}>
        <div dangerouslySetInnerHTML={formatContent(message.content)} />
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 border-t border-slate-300 pt-3">
            <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Sources</h4>
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
