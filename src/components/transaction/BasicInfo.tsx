import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Transaction } from '../../types';
import { InfoRow } from './InfoRow';

interface BasicInfoProps {
  transaction: Transaction;
}

export function BasicInfo({ transaction }: BasicInfoProps) {
  return (
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
            <InfoRow label="Max Priority" value={transaction.maxPriority} />
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
  );
}
