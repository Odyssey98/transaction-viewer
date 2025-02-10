import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { BasicInfo } from './components/transaction/BasicInfo';
import { FundFlow } from './components/transaction/FundFlow';
import { GasProfiler } from './components/transaction/GasProfiler';
import { StateChanges } from './components/transaction/StateChanges';
import { BalanceChanges } from './components/transaction/BalanceChanges';
import { InvocationFlow } from './components/transaction/InvocationFlow';
import { balanceChangesData, transactionData } from './data/mockData';
import { copyToClipboard } from './utils/clipboard';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 1000));
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

  const handleDebug = () => {
    console.log('Debug clicked');
  };

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
        <Header status={transactionData.status} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BasicInfo transaction={transactionData} />

          <div className="mt-8">
            <FundFlow transaction={transactionData} />
          </div>

          <div className="mt-8">
            <GasProfiler />
          </div>

          <StateChanges onCopy={copyToClipboard} />

          <div className="mt-8">
            <BalanceChanges
              balanceChanges={balanceChangesData}
              onCopy={copyToClipboard}
            />
          </div>

          <div className="mt-8">
            <InvocationFlow onDebug={handleDebug} />
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

export default App;
