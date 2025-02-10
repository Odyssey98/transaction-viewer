import React from 'react';

interface HeaderProps {
  status: string;
}

export function Header({ status }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Transaction Details
          </h1>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {status}
          </span>
        </div>
      </div>
    </header>
  );
}
