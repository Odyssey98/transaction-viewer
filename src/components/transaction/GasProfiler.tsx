import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { gasProfilerData } from '../../data/mockData';

export function GasProfiler() {
  const [isExpanded, setIsExpanded] = useState(true);

  const gasData = gasProfilerData;

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
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-xl font-semibold">Gas Profiler</h2>
        </div>
        <button
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Gas Stats */}
          <div className="rounded-lg overflow-hidden">
            <div className="bg-[#3B82F6] text-white px-4 py-2">
              Total Gas - {gasData.totalGas.toLocaleString()}
            </div>
            <div className="bg-[#60A5FA] text-white px-4 py-2">
              Actual Gas Used - {gasData.actualGasUsed.toLocaleString()}
            </div>
            <div className="bg-[#93C5FD] text-[#1E3A8A] px-4 py-2">
              <span className="bg-[#BFDBFE] px-2 py-0.5 rounded text-xs mr-2">
                1
              </span>
              Executed Gas - {gasData.executedGas.toLocaleString()}
            </div>
          </div>

          {/* Gas Operations Container */}
          <div className="relative mt-4">
            {/* Steps Bar */}
            <div className="h-8 bg-[#3B82F6]">
              <div className="flex h-full">
                {Array(23)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 border-r border-white/20 flex items-center justify-center"
                    >
                      <span className="text-[10px] text-white/80">s...</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Operations List */}
            <div className="flex justify-end mt-1">
              <div className="w-[60%] space-y-1">
                {gasData.operations.map((op, index) => (
                  <div
                    key={op.name}
                    className={`h-8 px-3 flex items-center ${
                      index === 0
                        ? 'bg-[#60A5FA]'
                        : index === 1
                        ? 'bg-[#93C5FD]'
                        : 'bg-[#BFDBFE]'
                    }`}
                  >
                    <span
                      className={`text-xs ${
                        index < 2 ? 'text-white' : 'text-[#1E3A8A]'
                      }`}
                    >
                      {op.name} - {op.gas.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gas Efficiency */}
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span>Gas Efficiency:</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${
                      (gasData.actualGasUsed / gasData.totalGas) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
