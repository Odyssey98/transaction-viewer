import React from 'react';
import { Copy } from 'lucide-react';
import { BalanceChange } from '../../types';

interface BalanceChangesProps {
  balanceChanges: BalanceChange[];
  onCopy: (text: string) => Promise<void>;
}

export function BalanceChanges({
  balanceChanges,
  onCopy,
}: BalanceChangesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Balance Changes
      </h2>
      <div className="space-y-4">
        {balanceChanges.map((change, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded transition-colors">
                {change.label && (
                  <span className="text-gray-500">[{change.label}]</span>
                )}
              </button>
              <div className="group relative">
                <span className="text-gray-500 text-sm font-mono">
                  {change.address.slice(0, 6)}...{change.address.slice(-4)}
                </span>
                <button
                  onClick={() => onCopy(change.address)}
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
            <div className="pl-6 space-y-1">
              {change.changes.map((tokenChange, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    {tokenChange.icon && (
                      <img
                        src={tokenChange.icon}
                        alt={tokenChange.token}
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                    <span>{tokenChange.token}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={
                        tokenChange.balance.startsWith('+')
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {tokenChange.balance}
                    </span>
                    <span className="text-gray-500">
                      ${tokenChange.valueUSD.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
