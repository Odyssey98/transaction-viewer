export interface TokenChange {
  token: string;
  balance: string;
  valueUSD: number;
  icon?: string;
}

export interface BalanceChange {
  address: string;
  label?: string;
  changes: TokenChange[];
}

export interface Transaction {
  status: string;
  block: string;
  timestamp: string;
  position: string;
  gasLimit: string;
  gasUsed: string;
  gasPrice: string;
  base: string;
  maxPriority: string;
  transactionFee: string;
  sender: string;
  receiver: string;
  value: string;
  type: string;
  events: string;
  internalTxns: string;
}

export interface InfoRowProps {
  label: string;
  value: string;
  copyable?: boolean;
}

export interface GasOperation {
  name: string;
  gas: number;
}

export interface GasData {
  totalGas: number;
  actualGasUsed: number;
  executedGas: number;
  operations: GasOperation[];
}

export interface StateChangeValue {
  from?: string;
  to: string;
}

export interface StateChange {
  key: string;
  type: string;
  value?: string;
  values?: StateChangeValue[];
}

export interface ContractStateChange {
  contract: string;
  address: string;
  changes: StateChange[];
}

export interface InvocationFlowProps {
  onDebug?: () => void;
}

export interface FilterOptions {
  showStaticCall: boolean;
  showGasUsed: boolean;
  expandView: 'Default' | 'Full';
}

export interface InvocationCall {
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
