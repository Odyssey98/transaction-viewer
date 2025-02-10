import { useState, useEffect } from 'react';
import {
  Copy,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

// Add type definitions
interface TokenChange {
  token: string;
  balance: string;
  valueUSD: number;
  icon?: string;
}

interface BalanceChange {
  address: string;
  label?: string;
  changes: TokenChange[];
}

// Add new interfaces
interface InvocationCall {
  id: number;
  type: 'CALL' | 'STATICCALL';
  value?: string;
  from?: string;
  to: string;
  function: string;
  args?: string;
  gas?: string;
  result?: string;
  indent: number;
}

// Move balanceChanges data outside of components so it can be shared
const balanceChangesData: BalanceChange[] = [
  {
    address: '0xfd29445e0716ae540dd85e2a5748641c070e5e77',
    label: 'Sender',
    changes: [
      {
        token: 'Ether',
        balance: '+0.011309549422142913',
        valueUSD: 31.1,
        icon: 'https://assets.blocksec.com/image/1663669189317-3.png',
      },
    ],
  },
  {
    address: '0xce21b204cef753cd8888b842baa9fda20cda1954',
    label: 'Receiver',
    changes: [
      {
        token: 'Wrapped Ether',
        balance: '+0.000000000000000001',
        valueUSD: 0.0,
        icon: 'https://assets.blocksec.com/icon/f1cb2d02c471d545bbc7722daf3277fd852d98e63d118771af7047bd8256c516.png',
      },
      {
        token: 'Circle: USD Coin Token (USDC)',
        balance: '+0.000001',
        valueUSD: 0.0,
        icon: 'https://assets.blocksec.com/icon/0347a86cc07dbd03fdc5db01a4e5ac7e1217f90e0b6e4bb0f75cbcca09160989.png',
      },
    ],
  },
  {
    address: 'Titan Builder',
    changes: [
      { token: 'Ether', balance: '+0.000108000807458785', valueUSD: 0.3 },
    ],
  },
  {
    address: 'FluidLiquidityProxy',
    changes: [
      {
        token: 'Ether',
        balance: '+28.977487625273526672',
        valueUSD: 79692.76,
      },
      {
        token: 'Circle: USD Coin Token (USDC)',
        balance: '-82,897.499925',
        valueUSD: 82897.5,
      },
    ],
  },
  {
    address: 'Uniswap V3: USDC 3',
    changes: [
      {
        token: 'Wrapped Ether',
        balance: '-28.988905179502928571',
        valueUSD: 79724.16,
      },
      {
        token: 'Circle: USD Coin Token (USDC)',
        balance: '+82,897.499924',
        valueUSD: 82897.5,
      },
    ],
  },
  {
    address: 'Wrapped Ether',
    changes: [
      {
        token: 'Ether',
        balance: '-28.98890517950292837',
        valueUSD: 79724.16,
      },
      {
        token: 'Wrapped Ether',
        balance: '+28.98890517950292837',
        valueUSD: 79724.16,
      },
    ],
  },
];

// Add copyToClipboard as a utility function at the top level
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy', err);
    toast.error('Failed to copy');
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock transaction data
  const transaction = {
    status: 'Success',
    block: '21775192',
    timestamp: '2025-02-04 19:21:35 (UTC) (5 days ago)',
    position: '155',
    gasLimit: '5000000',
    gasUsed: '1775708',
    gasPrice: '4.539575861 Gwei',
    base: '2.827575861 Gwei',
    maxPriority: '1.512 Gwei',
    transactionFee: '0.007705819572984588 Ether',
    sender: '0xfd29445e0716ae540dd85e2a5748641c070e5e77',
    receiver: '0xce21b204cef753cd8888b842baa9fda20cda1954',
    value: '3 wei',
    type: '2 (EIP-1559)',
    events: '12',
    internalTxns: '210',
  };

  // 模拟加载数据
  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // ... 加载数据
    } catch (err) {
      console.error('Failed to load transaction data', err);
      setError('Failed to load transaction data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                Transaction Details
              </h1>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {transaction.status}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Basic Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Basic Info Section */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                Basic Info
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <InfoRow label="Block" value={transaction.block} />
                  <InfoRow label="Timestamp" value={transaction.timestamp} />
                  <InfoRow label="Position" value={transaction.position} />
                  <InfoRow label="From" value={transaction.sender} copyable />
                  <InfoRow label="To" value={transaction.receiver} copyable />
                  <InfoRow label="Value" value={transaction.value} />
                </div>

                <div className="space-y-4">
                  <InfoRow label="Gas Limit" value={transaction.gasLimit} />
                  <InfoRow label="Gas Used" value={transaction.gasUsed} />
                  <InfoRow label="Gas Price" value={transaction.gasPrice} />
                  <InfoRow label="Base" value={transaction.base} />
                  <InfoRow
                    label="Max Priority"
                    value={transaction.maxPriority}
                  />
                  <InfoRow
                    label="Transaction Fee"
                    value={transaction.transactionFee}
                  />
                </div>
              </div>
            </div>

            {/* Transaction Type Info */}
            <div className="border-t border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoRow label="Transaction Type" value={transaction.type} />
                <InfoRow label="Event Count" value={transaction.events} />
                <InfoRow
                  label="Internal Transactions"
                  value={transaction.internalTxns}
                />
              </div>
            </div>
          </div>

          {/* Fund Flow Visualization */}
          <div className="mt-8">
            <FundFlow transaction={transaction} />
          </div>

          {/* Gas Profiler */}
          <div className="mt-8">
            <GasProfiler />
          </div>

          {/* State Changes */}
          <StateChanges onCopy={copyToClipboard} />

          {/* Balance Changes */}
          <div className="mt-8">
            <BalanceChanges
              balanceChanges={balanceChangesData}
              onCopy={copyToClipboard}
            />
          </div>

          {/* Invocation Flow - only keep this one */}
          <div className="mt-8">
            <InvocationFlow />
          </div>
        </main>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
        }}
      />
    </>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  copyable?: boolean;
}

function InfoRow({ label, value, copyable }: InfoRowProps) {
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

// Update BalanceChanges props interface
interface BalanceChangesProps {
  balanceChanges: BalanceChange[];
  onCopy: (text: string) => Promise<void>;
}

// Update BalanceChanges component
function BalanceChanges({ balanceChanges, onCopy }: BalanceChangesProps) {
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

// Add new component
function GasProfiler() {
  const [isExpanded, setIsExpanded] = useState(true);

  const gasData = {
    totalGas: 1806808,
    actualGasUsed: 1775708,
    executedGas: 1785480,
    operations: [
      { name: 'flashLoan', gas: 334172 },
      { name: 'receiveFlashLoan', gas: 280000 },
      { name: 'swapIn', gas: 163000 },
      { name: 'swap', gas: 150000 },
    ],
  };

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
                  .fill('s...')
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

            {/* Operations List - Now using relative positioning */}
            <div className="flex justify-end mt-1">
              <div className="w-[60%] space-y-1">
                <div className="bg-[#60A5FA] h-8 px-3 flex items-center">
                  <span className="text-xs text-white">
                    flashLoan - {gasData.operations[0].gas.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#93C5FD] h-8 px-3 flex items-center">
                  <span className="text-xs text-white">
                    receiveFlashLoan -{' '}
                    {gasData.operations[1].gas.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#BFDBFE] h-8 flex">
                  <div className="flex-1 px-3 flex items-center">
                    <span className="text-xs text-[#1E3A8A]">
                      swapIn - {gasData.operations[2].gas.toLocaleString()}
                    </span>
                  </div>
                  <div className="px-3 flex items-center border-l border-white/20">
                    <span className="text-xs text-[#1E3A8A]">
                      swap - {gasData.operations[3].gas.toLocaleString()}
                    </span>
                  </div>
                </div>
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

// Update StateChanges props interface
interface StateChangesProps {
  onCopy: (text: string) => Promise<void>;
}

// Update StateChanges component
function StateChanges({ onCopy }: StateChangesProps) {
  const [expandedChanges, setExpandedChanges] = useState<number[]>([]);
  const [hoveredAddress, setHoveredAddress] = useState<string | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

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

  const stateChanges = [
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
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">→</span>
                    <span className="text-sm font-mono text-gray-900">
                      {stateChange.value}
                    </span>
                  </div>
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

// 首先定义 FundFlow 的 props 接口
interface FundFlowProps {
  transaction: {
    sender: string;
    receiver: string;
  };
}

// 修改 FundFlow 组件
function FundFlow({ transaction }: FundFlowProps) {
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
                {transaction.sender.slice(0, 10)}...
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
                {transaction.receiver.slice(0, 10)}...
              </text>
            </g>

            {/* Contract Nodes */}
            <g
              transform="translate(750, 150)"
              className={`transition-transform duration-200 ${
                hoveredNode === 'balancer' ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredNode('balancer')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedFlow('balancer')}
            >
              <rect
                width="180"
                height="50"
                rx="4"
                fill="#FFF3E0"
                stroke="#FFB74D"
                className="transition-colors"
              />
              <text x="90" y="30" textAnchor="middle" className="text-sm">
                Balancer: Vault
              </text>
            </g>

            <g
              transform="translate(750, 250)"
              className={`transition-transform duration-200 ${
                hoveredNode === 'fluid' ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredNode('fluid')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedFlow('fluid')}
            >
              <rect
                width="180"
                height="50"
                rx="4"
                fill="#E8EAF6"
                stroke="#9FA8DA"
                className="transition-colors"
              />
              <text x="90" y="30" textAnchor="middle" className="text-sm">
                FluidDexV1
              </text>
            </g>

            <g
              transform="translate(750, 350)"
              className={`transition-transform duration-200 ${
                hoveredNode === 'proxy' ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredNode('proxy')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedFlow('proxy')}
            >
              <rect
                width="180"
                height="50"
                rx="4"
                fill="#FCE4EC"
                stroke="#F48FB1"
                className="transition-colors"
              />
              <text x="90" y="30" textAnchor="middle" className="text-sm">
                FluidLiquidityProxy
              </text>
            </g>
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
              3 wei
            </text>

            {/* Contract Interactions */}
            <path
              d="M 600 280 C 675 175, 675 175, 750 175"
              stroke="#FFB74D"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4"
              className={`transition-opacity duration-200 ${
                selectedFlow && !['receiver', 'balancer'].includes(selectedFlow)
                  ? 'opacity-25'
                  : 'opacity-100'
              }`}
            />
            <path
              d="M 600 280 C 675 280, 675 280, 750 280"
              stroke="#3F51B5"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4"
              className={`transition-opacity duration-200 ${
                selectedFlow && !['receiver', 'fluid'].includes(selectedFlow)
                  ? 'opacity-25'
                  : 'opacity-100'
              }`}
            />
            <path
              d="M 600 280 C 675 375, 675 375, 750 375"
              stroke="#E91E63"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4"
              className={`transition-opacity duration-200 ${
                selectedFlow && !['receiver', 'proxy'].includes(selectedFlow)
                  ? 'opacity-25'
                  : 'opacity-100'
              }`}
            />
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

function InvocationFlow() {
  const [filter, setFilter] = useState('');
  const [showStaticCall, setShowStaticCall] = useState(true);
  const [showGasUsed, setShowGasUsed] = useState(false);
  const [expandView, setExpandView] = useState<'Default' | 'Full'>('Default');

  const calls: InvocationCall[] = [
    {
      id: 0,
      type: 'CALL',
      value: '0.000000000000000003',
      from: '[Sender]',
      to: '0xce21b204cef753cd8888b842baa9fda20cda1954',
      function: '',
      args: '(raw data)',
      indent: 0,
    },
    {
      id: 1,
      type: 'STATICCALL',
      to: 'Uniswap V3: USDC 3',
      function: 'tickSpacing',
      result: '(10)',
      indent: 1,
    },
    {
      id: 2,
      type: 'STATICCALL',
      to: 'Uniswap V3: USDC 3',
      function: 'fee',
      result: '(500)',
      indent: 1,
    },
  ];

  const filteredCalls = calls.filter((call) => {
    if (!showStaticCall && call.type === 'STATICCALL') return false;
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
              checked={showStaticCall}
              onChange={(e) => setShowStaticCall(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-500"
            />
            <span className="text-sm text-gray-600">Static Call</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showGasUsed}
              onChange={(e) => setShowGasUsed(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-500"
            />
            <span className="text-sm text-gray-600">Gas Used</span>
          </label>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Expand:</span>
            <select
              value={expandView}
              onChange={(e) =>
                setExpandView(e.target.value as 'Default' | 'Full')
              }
              className="form-select text-sm border-gray-300 rounded-md"
            >
              <option value="Default">Default</option>
              <option value="Full">Full</option>
            </select>
          </div>

          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
