import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { useHoldingsManager } from '@/hooks/useHoldingsManager';
import Button from '@/components/atoms/Button';
import HoldingsTable from '@/components/organisms/HoldingsTable';
import TransactionModal from '@/components/organisms/TransactionModal';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const Holdings = () => {
  const { holdings, loading, error, refetch } = usePortfolioData();
  const { addHolding, updateHolding, deleteHolding } = useHoldingsManager();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editHolding, setEditHolding] = useState(null);

  const handleAddHolding = () => {
    setEditHolding(null);
    setIsModalOpen(true);
  };

  const handleEditHolding = (holding) => {
    setEditHolding(holding);
    setIsModalOpen(true);
  };

  const handleDeleteHolding = async (holding) => {
    if (window.confirm(`Are you sure you want to delete ${holding.symbol}? This action cannot be undone.`)) {
      try {
        await deleteHolding(holding.Id);
        toast.success(`${holding.symbol} deleted successfully`);
        refetch();
      } catch (error) {
        toast.error('Failed to delete holding');
      }
    }
  };

  const handleSaveTransaction = async (transactionData) => {
    try {
      if (editHolding) {
        await updateHolding(editHolding.Id, transactionData);
      } else {
        await addHolding(transactionData);
      }
      refetch();
      setIsModalOpen(false);
      setEditHolding(null);
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} type="data" />;
  }

  if (!holdings || holdings.length === 0) {
    return (
      <Empty
        title="No Holdings Yet"
        description="Start building your investment portfolio by adding your first holding. Track stocks, ETFs, bonds, and other investments all in one place."
        icon="Briefcase"
        actionLabel="Add First Holding"
        action={handleAddHolding}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">
            Holdings
          </h1>
          <p className="text-secondary-600 mt-1">
            Manage your investment positions and track performance
          </p>
        </div>
        <Button
          onClick={handleAddHolding}
          icon="Plus"
          variant="primary"
          size="lg"
        >
          Add Holding
        </Button>
      </motion.div>

      {/* Holdings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <HoldingsTable
          holdings={holdings}
          onEdit={handleEditHolding}
          onDelete={handleDeleteHolding}
        />
      </motion.div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditHolding(null);
        }}
        onSave={handleSaveTransaction}
        editTransaction={editHolding}
      />
    </motion.div>
  );
};

export default Holdings;