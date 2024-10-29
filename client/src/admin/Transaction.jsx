import { useState, useEffect } from 'react';
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { toast } from "react-toastify";

const Transaction = () => {
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // State to hold the selected transaction

  const fetchAllTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/route/admin-transaction`);
      const data = await res.json();
      if (res.ok) {
        setAllTransaction(data.adminTransactions.reverse());
      }
    } catch (error) {
      toast.error(`An error occurred while fetching transactions, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchAllTransactions();
  }, []);

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ['Email', 'Status', 'Amount', 'Working Day']; // Add your headers
    csvRows.push(headers.join(','));

    allTransaction.forEach(transaction => {
      const values = [
        transaction.email,
        transaction.status,
        `GHS ${transaction.amount}`,
        transaction.workingDay ? new Date(transaction.workingDay).toLocaleString() : 'N/A',
      ];
      csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'transactions.csv');
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction); // Set the selected transaction
  };

  return (
    loading ? (
      <div className="flex min-h-screen items-center justify-center gap-2">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    ) : (
      <div className="max-w-[67rem]">
         <Card>
          <CardHeader>
            <div className='flex justify-between'>
              <CardTitle>Transactions</CardTitle>
              <Button size='lg' style={{ borderRadius: '6px' }} onClick={exportToCSV}>
                Export
              </Button>
            </div>
            <CardDescription>
              Manage your transactions and view their status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Working Day</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(allTransaction) && allTransaction.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell className="font-medium">{transaction.email}</TableCell>
                    <TableCell>
                    <Badge
  variant="outline"
  className={`${transaction.status === 'success'? 'bg-green-500': 'bg-red-500'}`}
>
  {transaction.status}
</Badge>
                    </TableCell>
                    <TableCell className="font-medium">GHS {(transaction.amount - transaction.paystackCharge - transaction.myCharge).toFixed(2)}</TableCell>
                    <TableCell className="font-medium">{transaction.method === 'momo'? 'MOMO': 'CASH'}</TableCell>
                    <TableCell className="font-medium">
                      {transaction.workingDay ? 
                        new Date(transaction.workingDay).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        }) : 
                        'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default Transaction;
