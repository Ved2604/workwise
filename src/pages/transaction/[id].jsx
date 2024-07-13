import React from 'react'
import { useRouter } from 'next/router'
import transactionsData from '@/transactionsData'
import { Typography, Paper, Grid, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

const DetailedTransaction = () => { 
  const router = useRouter()
  const { id } = router.query

  // Find the transaction with the matching id
  const transaction = transactionsData.find(t => t.id == id)

  // If transaction is not found, show an error message
  if (!transaction) {
    return (
      <div className="p-6">
        <Typography variant="h4">Transaction not found</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Button startIcon={<ArrowBack />} onClick={() => router.back()} className="mb-4">
        Back to Dashboard
      </Button>
      <Typography variant="h4" className="mb-4">Transaction Details</Typography>
      <Paper elevation={3} className="p-6">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Order ID</Typography>
            <Typography variant="body1">{transaction.id}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Status</Typography>
            <Typography variant="body1">{transaction.status}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Transaction ID</Typography>
            <Typography variant="body1">{transaction.transactionId}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Refund Date</Typography>
            <Typography variant="body1">{transaction.refundDate}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Order Amount</Typography>
            <Typography variant="body1">{transaction.orderAmount}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default DetailedTransaction