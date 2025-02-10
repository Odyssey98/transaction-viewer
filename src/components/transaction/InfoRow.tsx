import React from 'react';
import { Copy } from 'lucide-react';
import { InfoRowProps } from '../../types';
import { copyToClipboard } from '../../utils/clipboard';

export function InfoRow({ label, value, copyable }: InfoRowProps) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-900">{value}</span>
        {copyable && (
          <button
            onClick={() => copyToClipboard(value)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
