import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Transaction } from '../../types';

interface FundFlowProps {
  transaction: Transaction;
}

export function FundFlow({ transaction }: FundFlowProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ArrowRight className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Fund Flow</h2>
        </div>
        <button className="px-4 py-2 bg-[#B07D56] text-white rounded-lg hover:bg-[#96684A] transition-colors flex items-center gap-2">
          <span>Deep Dive with MetaSleuth</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Flow Visualization */}
      <div className="relative overflow-x-auto">
        <svg width="100%" height="600" className="min-w-[1000px]">
          {/* Define gradients */}
          <defs>
            <linearGradient id="ethGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: '#627EEA', stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#627EEA', stopOpacity: 0.1 }}
              />
            </linearGradient>
            <linearGradient id="usdcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: '#2775CA', stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#2775CA', stopOpacity: 0.1 }}
              />
            </linearGradient>
          </defs>

          {/* Nodes */}
          <g className="nodes">
            {/* Sender Node */}
            <g
              className={`transition-transform duration-200 ${
                hoveredNode === 'sender' ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredNode('sender')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedFlow('sender')}
            >
              <rect
                x="50"
                y="250"
                width="200"
                height="60"
                rx="4"
                fill="#E3F2FD"
                stroke="#90CAF9"
                className="transition-colors"
              />
              <text x="150" y="275" textAnchor="middle" className="text-sm">
                Sender
              </text>
              <text
                x="150"
                y="295"
                textAnchor="middle"
                className="text-xs text-gray-500"
              >
                {transaction.sender.slice(0, 6)}...
                {transaction.sender.slice(-4)}
              </text>
            </g>

            {/* Receiver Node */}
            <g
              className={`transition-transform duration-200 ${
                hoveredNode === 'receiver' ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredNode('receiver')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedFlow('receiver')}
            >
              <rect
                x="400"
                y="250"
                width="200"
                height="60"
                rx="4"
                fill="#E8F5E9"
                stroke="#A5D6A7"
                className="transition-colors"
              />
              <text x="500" y="275" textAnchor="middle" className="text-sm">
                Receiver
              </text>
              <text
                x="500"
                y="295"
                textAnchor="middle"
                className="text-xs text-gray-500"
              >
                {transaction.receiver.slice(0, 6)}...
                {transaction.receiver.slice(-4)}
              </text>
            </g>

            {/* Contract Nodes */}
            {['balancer', 'fluid', 'proxy'].map((node, i) => (
              <g
                key={node}
                className={`transition-transform duration-200 ${
                  hoveredNode === node ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedFlow(node)}
                transform={`translate(750, ${145 + i * 105})`}
              >
                <rect
                  x="0"
                  y="0"
                  width="180"
                  height="60"
                  rx="4"
                  fill={
                    node === 'balancer'
                      ? '#FFF3E0'
                      : node === 'fluid'
                      ? '#E8EAF6'
                      : '#FCE4EC'
                  }
                  stroke={
                    node === 'balancer'
                      ? '#FFB74D'
                      : node === 'fluid'
                      ? '#9FA8DA'
                      : '#F48FB1'
                  }
                  className="transition-colors"
                />
                <text x="90" y="30" textAnchor="middle" className="text-sm">
                  {node === 'balancer'
                    ? 'Balancer: Vault'
                    : node === 'fluid'
                    ? 'FluidDexV1'
                    : 'FluidLiquidityProxy'}
                </text>
              </g>
            ))}
          </g>

          {/* Flow Lines */}
          <g className="flows">
            {/* ETH Flow */}
            <path
              d="M 250 280 C 325 280, 325 280, 400 280"
              stroke="#627EEA"
              strokeWidth="2"
              fill="none"
              className={`transition-opacity duration-200 ${
                selectedFlow && !['sender', 'receiver'].includes(selectedFlow)
                  ? 'opacity-25'
                  : 'opacity-100'
              }`}
            />
            <text x="325" y="270" textAnchor="middle" className="text-xs">
              {transaction.value}
            </text>

            {/* Contract Interactions */}
            {[
              { y1: 175, color: '#FFB74D', node: 'balancer' },
              { y1: 280, color: '#3F51B5', node: 'fluid' },
              { y1: 375, color: '#E91E63', node: 'proxy' },
            ].map(({ y1, color, node }) => (
              <path
                key={node}
                d={`M 600 280 C 675 ${y1}, 675 ${y1}, 750 ${y1}`}
                stroke={color}
                strokeWidth="2"
                fill="none"
                strokeDasharray="4"
                className={`transition-opacity duration-200 ${
                  selectedFlow && !['receiver', node].includes(selectedFlow)
                    ? 'opacity-25'
                    : 'opacity-100'
                }`}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#627EEA] rounded-full"></div>
          <span className="text-sm text-gray-600">ETH Transfer</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#2775CA] rounded-full"></div>
          <span className="text-sm text-gray-600">USDC Transfer</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Contract Interaction</span>
        </div>
      </div>
    </div>
  );
}
