import React, { useState } from 'react';
import { Copy, ChevronDown, ChevronRight } from 'lucide-react';
import { ContractStateChange } from '../../types';

interface StateChangesProps {
  onCopy: (text: string) => Promise<void>;
}

export function StateChanges({ onCopy }: StateChangesProps) {
  const [expandedChanges, setExpandedChanges] = useState<number[]>([]);
  const [hoveredAddress, setHoveredAddress] = useState<string | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const stateChanges: ContractStateChange[] = [
    {
      contract: 'FluidLiquidityProxy',
      address: '0x52aa899454998be5b000ad077a46bbe360f4e497',
      changes: [
        {
          key: '_userBorrowData',
          type: 'mapping(address => mapping(address => uint256))',
          value: '0x836951eb21f3df98273517b7249dceff270d34bf',
        },
        {
          key: '_totalAmounts',
          type: 'mapping(address => uint256)',
          values: [
            {
              from: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
              to: '122109847355824500122113115268342768686509130318396722688',
            },
            {
              from: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
              to: '387940423373955658284102693165266634131090093448267029012',
            },
          ],
        },
      ],
    },
  ];

  const toggleChange = (idx: number) => {
    setExpandedChanges((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleCopy = async (text: string) => {
    await onCopy(text);
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <svg
          className="w-5 h-5 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900">State Changes</h2>
      </div>

      {stateChanges.map((change, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
              onClick={() => toggleChange(index)}
            >
              {expandedChanges.includes(index) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="font-medium">{change.contract}</span>
            </button>
            <div
              className="group relative"
              onMouseEnter={() => setHoveredAddress(change.address)}
              onMouseLeave={() => setHoveredAddress(null)}
            >
              <span className="text-gray-500 text-sm font-mono">
                {change.address.slice(0, 6)}...{change.address.slice(-4)}
              </span>
              <button
                onClick={() => handleCopy(change.address)}
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
              {hoveredAddress === change.address && (
                <div className="absolute left-0 -top-8 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  {change.address}
                </div>
              )}
            </div>
          </div>

          {expandedChanges.includes(index) && (
            <div className="pl-4 space-y-4 animate-fadeIn">
              {change.changes.map((stateChange, idx) => (
                <div key={idx} className="flex flex-col space-y-1">
                  <div className="text-sm font-mono text-gray-500">
                    {stateChange.key}
                    <span className="text-gray-400 ml-2">
                      ({stateChange.type})
                    </span>
                  </div>
                  {stateChange.value ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">→</span>
                      <span className="text-sm font-mono text-gray-900">
                        {stateChange.value}
                      </span>
                    </div>
                  ) : (
                    stateChange.values?.map((value, vidx) => (
                      <div key={vidx} className="flex items-center space-x-2">
                        <span className="text-gray-400">→</span>
                        <span className="text-sm font-mono text-gray-900">
                          {value.from && (
                            <>
                              <span className="text-gray-500">
                                {value.from}
                              </span>
                              <span className="mx-2">→</span>
                            </>
                          )}
                          {value.to}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Copy Feedback */}
      {copiedValue && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded text-sm">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
