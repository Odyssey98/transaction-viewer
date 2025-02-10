import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { InvocationFlowProps, FilterOptions } from '../../types';
import { invocationCallsData } from '../../data/mockData';

export function InvocationFlow({ onDebug }: InvocationFlowProps) {
  const [filter, setFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    showStaticCall: true,
    showGasUsed: false,
    expandView: 'Default',
  });

  const calls = invocationCallsData;

  const filteredCalls = calls.filter((call) => {
    if (!filterOptions.showStaticCall && call.type === 'STATICCALL')
      return false;
    if (filter) {
      const searchTerm = filter.toLowerCase();
      return (
        call.to.toLowerCase().includes(searchTerm) ||
        call.function.toLowerCase().includes(searchTerm)
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <h2 className="text-xl font-semibold">Invocation Flow</h2>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-2xl">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by contract label/address, function name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filterOptions.showStaticCall}
              onChange={(e) =>
                setFilterOptions((prev) => ({
                  ...prev,
                  showStaticCall: e.target.checked,
                }))
              }
              className="form-checkbox h-4 w-4 text-blue-500"
            />
            <span className="text-sm text-gray-600">Static Call</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filterOptions.showGasUsed}
              onChange={(e) =>
                setFilterOptions((prev) => ({
                  ...prev,
                  showGasUsed: e.target.checked,
                }))
              }
              className="form-checkbox h-4 w-4 text-blue-500"
            />
            <span className="text-sm text-gray-600">Gas Used</span>
          </label>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Expand:</span>
            <select
              value={filterOptions.expandView}
              onChange={(e) =>
                setFilterOptions((prev) => ({
                  ...prev,
                  expandView: e.target.value as 'Default' | 'Full',
                }))
              }
              className="form-select text-sm border-gray-300 rounded-md"
            >
              <option value="Default">Default</option>
              <option value="Full">Full</option>
            </select>
          </div>

          <button
            onClick={onDebug}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Debug
          </button>
        </div>
      </div>

      {/* Call List */}
      <div className="space-y-1">
        {filteredCalls.map((call) => (
          <div
            key={call.id}
            className="flex items-start space-x-2"
            style={{ marginLeft: `${call.indent * 20}px` }}
          >
            <div className="flex items-center space-x-2 py-1">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                {call.id}
              </span>
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                {call.type}
              </span>
              {call.value && (
                <span className="text-xs text-gray-500">
                  value: {call.value}
                </span>
              )}
              {call.from && (
                <span className="text-xs bg-yellow-100 px-2 py-0.5 rounded">
                  {call.from}
                </span>
              )}
              <span className="text-xs text-blue-500 hover:text-blue-600">
                {call.to}
              </span>
              {call.function && (
                <span className="text-xs text-gray-600">.{call.function}</span>
              )}
              {call.args && (
                <span className="text-xs text-gray-500">{call.args}</span>
              )}
              {call.result && (
                <span className="text-xs text-gray-500">{call.result}</span>
              )}
              {filterOptions.showGasUsed && call.gas && (
                <span className="text-xs text-gray-400">({call.gas} gas)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
