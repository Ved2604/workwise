import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, InputBase, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, TextField, Pagination, Menu, MenuItem } from '@mui/material';
import { InfoOutlined, SearchOutlined, SwapVert, FileDownloadOutlined, HelpOutline, MessageOutlined } from '@mui/icons-material'; 
import transactionsData from '@/transactionsData';
import * as XLSX from 'xlsx';
import Link from 'next/link';

const Dashboard = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState(transactionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [sortCriteria, setSortCriteria] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredTransactions.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (event, value) => setCurrentPage(value);

  function getStatus(status){
    if(status === 'Successful'){ 
      return <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>;
    } 
    else if(status === 'Processing'){
      return <span className="w-2 h-2 bg-gray-500 rounded-full inline-block mr-2"></span>; 
    }
    else if(status === 'Failed') {
      return <span className="w-2 h-2 bg-red-500 rounded-full inline-block mr-2"></span>
    }
  }

  const sortTransactions = (criteria) => {
    let sortedTransactions = [...transactions];
    switch(criteria) {
      case 'amountLowToHigh':
        sortedTransactions.sort((a, b) => parseFloat(a.orderAmount.replace('₹', '').replace(',', '')) - parseFloat(b.orderAmount.replace('₹', '').replace(',', '')));
        break;
      case 'amountHighToLow':
        sortedTransactions.sort((a, b) => parseFloat(b.orderAmount.replace('₹', '').replace(',', '')) - parseFloat(a.orderAmount.replace('₹', '').replace(',', '')));
        break;
      case 'dateLatestToOldest':
        sortedTransactions.sort((a, b) => new Date(b.refundDate) - new Date(a.refundDate));
        break;
      case 'dateOldestToLatest':
        sortedTransactions.sort((a, b) => new Date(a.refundDate) - new Date(b.refundDate));
        break;
      default:
        break;
    }
    setTransactions(sortedTransactions);
    setSortCriteria(criteria);
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  return (
    <div className="p-6 space-y-6"> 
      <AppBar position="static" color="default" elevation={0} className="border-b">
        <Toolbar className="justify-between">
          <Typography variant="h6" className="text-gray-800">
            Payments
          </Typography>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <HelpOutline className="text-gray-600" />
              <Typography variant="body2" className="text-gray-600">How it works</Typography>
            </div>
            <div className="relative">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <InputBase
                placeholder="Search features, tutorials, etc."
                className="bg-gray-100 rounded-md pl-10 pr-4 py-2 w-64"
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <MessageOutlined className="text-gray-600" />
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Typography variant="body2">A</Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
          
      <div className="flex justify-between items-center">
        <Typography variant="h5">Overview</Typography>
        <select className="border rounded p-2">
          <option>This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#146EB4] text-white">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">Next Payout</Typography>
              <InfoOutlined fontSize="small" />
            </div>
            <Typography variant="h4" className="mb-2">₹2,312.23</Typography>
            <div className="flex justify-between items-center">
              <Typography variant="body2" className="underline">
                23 orders
              </Typography>
              <Typography variant="body2">
                Today, 04:00PM
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className="h-[120px]">
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <Typography variant="h6">Amount Pending</Typography>
              <InfoOutlined fontSize="small" />
            </div>
            <Typography variant="h4">₹92,312.20</Typography>
            <Typography variant="body2" color="text.secondary">
              23 orders
            </Typography>
          </CardContent>
        </Card>
        <Card className="h-[120px]">
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <Typography variant="h6">Amount Processed</Typography>
              <InfoOutlined fontSize="small" />
            </div>
            <Typography variant="h4">₹23,92,312.19</Typography>
          </CardContent>
        </Card>
      </div>

      <Typography variant="h6">Transactions | This Month</Typography>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <Button variant="outlined" className="mr-2">Payouts (22)</Button>
          <Button variant="contained">Refunds (6)</Button>
        </div>
        <div className="flex items-center">
          <Button startIcon={<SwapVert />} onClick={handleSortClick}>Sort</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleSortClose}
          >
            <MenuItem onClick={() => { sortTransactions('amountLowToHigh'); handleSortClose(); }}>Sort by Order Amount (Low to High)</MenuItem>
            <MenuItem onClick={() => { sortTransactions('amountHighToLow'); handleSortClose(); }}>Sort by Order Amount (High to Low)</MenuItem>
            <MenuItem onClick={() => { sortTransactions('dateLatestToOldest'); handleSortClose(); }}>Sort by Date (Latest to Oldest)</MenuItem>
            <MenuItem onClick={() => { sortTransactions('dateOldestToLatest'); handleSortClose(); }}>Sort by Date (Oldest to Latest)</MenuItem>
          </Menu>
          <Button startIcon={<FileDownloadOutlined />} onClick={downloadExcel}>Download</Button>
        </div>
      </div>

      <TextField
        placeholder="Search by order ID..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
        className="mb-4"
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Refund date</TableCell>
              <TableCell align="right">Order amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((row) => (
              <TableRow key={row.id}>
                <TableCell> 
                  <Link href={`/transaction/${row.id}`}>
                  <span 
                    className="text-blue-600 cursor-pointer" 
                    
                  >
                    {row.id}
                  </span>
                  </Link>
                </TableCell> 
                <TableCell>{getStatus(row.status)}{row.status}</TableCell>
                <TableCell>{row.transactionId}</TableCell>
                <TableCell>{row.refundDate}</TableCell>
                <TableCell align="right">{row.orderAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination 
        count={Math.ceil(filteredTransactions.length / ordersPerPage)}
        page={currentPage}
        onChange={paginate}
        color="primary"
        className="mt-4"
      />
    </div>
  );
};

export default Dashboard;