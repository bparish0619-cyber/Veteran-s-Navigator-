
import React from 'react';
import type { Source } from '../types';

interface SourceLinkProps {
  source: Source;
}

const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
      <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 005.656 5.656l3-3a4 4 0 00-.225-5.865z" />
    </svg>
);


const SourceLink: React.FC<SourceLinkProps> = ({ source }) => {
  const domain = new URL(source.uri).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

  return (
    <a
      href={source.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center bg-white hover:bg-slate-50 border border-slate-300 rounded-full px-3 py-1 text-sm text-slate-700 hover:text-blue-600 transition-colors"
      title={source.title}
    >
      <img src={faviconUrl} alt={`${domain} favicon`} className="w-4 h-4 mr-2" onError={(e) => (e.currentTarget.style.display = 'none')} />
      <span className="truncate max-w-[200px]">{source.title}</span>
    </a>
  );
};

export default SourceLink;
