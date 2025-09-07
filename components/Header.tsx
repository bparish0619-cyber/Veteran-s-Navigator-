
import React from 'react';

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.927 0l-7.5 4.25A.75.75 0 003 7.236v10.024a.75.75 0 00.536.72l7.5 4.25a.75.75 0 00.927 0l7.5-4.25a.75.75 0 00.536-.72V7.236a.75.75 0 00-.536-.72l-7.5-4.25zM12 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0112 6zM11.25 12.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
    </svg>
);

const Header: React.FC = () => {
    return (
        <header className="bg-slate-800 border-b border-slate-700 z-10">
            <div className="container mx-auto px-4 py-3 flex items-center">
                <ShieldIcon className="h-8 w-8 text-blue-500 mr-3" />
                <h1 className="text-xl font-bold text-slate-100 tracking-tight">
                    VA Benefits Navigator
                </h1>
            </div>
        </header>
    );
};

export default Header;