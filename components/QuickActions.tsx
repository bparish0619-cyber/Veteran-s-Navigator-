
import React from 'react';

interface QuickActionsProps {
  onSendMessage: (message: string) => void;
}

const actions = [
  { label: 'Disability Compensation', prompt: 'What are the basics of VA disability compensation?' },
  { label: 'The PACT Act', prompt: 'Tell me about the PACT Act.' },
  { label: 'VA Health Care', prompt: 'How do I enroll in VA health care?' },
  { label: 'Education Benefits', prompt: 'What are the main VA education benefits?' },
  { label: 'VA Home Loans', prompt: 'Explain VA home loans.' },
  { label: 'Filing a Claim', prompt: 'How do I file a VA claim?' },
];

const QuickActions: React.FC<QuickActionsProps> = ({ onSendMessage }) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-slate-400 mb-2 text-center md:text-left">Or try one of these common topics:</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => onSendMessage(action.prompt)}
            className="text-sm text-left p-3 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;