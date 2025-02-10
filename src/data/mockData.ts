import { BalanceChange, Transaction, InvocationCall, GasData } from '../types';

export const balanceChangesData: BalanceChange[] = [
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
  // ... 其他数据
];

export const transactionData: Transaction = {
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

export const invocationCallsData: InvocationCall[] = [
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

export const gasProfilerData: GasData = {
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
