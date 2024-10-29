/* import https from 'https';
import crypto from 'crypto';
import Transaction from '../models/transactions.model.js';

export const acceptPayment = async (req, res) => {
  const { email, amount } = req.body;
  const params = JSON.stringify({
    email: email,
    amount: amount * 100,
  });

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: 'Bearer sk_test_53b928f1cff100a0db95c2250ff3796074de3c84',
      'Content-Type': 'application/json',
    },
  };

  // Making the request to Paystack
  const paystackRequest = https.request(options, (paystackResponse) => {
    let data = '';

    paystackResponse.on('data', (chunk) => {
      data += chunk;
    });

    paystackResponse.on('end', () => {
      res.status(200).json(JSON.parse(data)); // Send the response back to the client
    });
  });

  paystackRequest.on('error', (error) => {
    res.status(500).json({ message: 'Server error', error: error.message });
  });

  paystackRequest.write(params);
  paystackRequest.end(); // End the request
};

export const paymentWebhook = async (req, res) => {
  console.log('Received webhook payload:', req.body);
  const secret = 'sk_test_53b928f1cff100a0db95c2250ff3796074de3c84'; // Use your Paystack secret key

  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

  if (hash === req.headers['x-paystack-signature']) {
    const event = req.body;

    if (event.event === 'charge.success') {
      const transactionData = event.data;

      console.log('Transaction data:', transactionData);

      const transaction = new Transaction({
        referenceId: transactionData.reference,
        email: transactionData.customer.email,
        amount: transactionData.amount, // Ensure this is in the correct currency format
        status: true, // Payment status
        workingDay: new Date(transactionData.transaction_date), // Store the transaction date
      });

      try {
        await transaction.save();
        console.log('Transaction saved:', transaction);
      } catch (error) {
        console.error('Error saving transaction:', error);
        return res.status(500).json({ success: false, message: 'Error saving transaction', error });
      }
    }

    return res.sendStatus(200); // Acknowledge receipt of the event
  } else {
    console.warn('Invalid signature received');
    return res.sendStatus(400); // Invalid request
  }
};

export const verifyPayment = async (req, res) => {
  const { reference } = req.body; // Paystack transaction reference from the frontend

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer sk_test_53b928f1cff100a0db95c2250ff3796074de3c84',
    },
  };

  // Verify payment request
  https.request(options, (verifyResponse) => {
    let data = '';

    verifyResponse.on('data', (chunk) => {
      data += chunk;
    });

    verifyResponse.on('end', async () => {
      const result = JSON.parse(data);

      if (result.status && result.data.status === 'success') {
        // Payment was successful, save to database
        const transaction = new Transaction({
          referenceId: result.data.reference,
          email: result.data.customer.email,
          amount: result.data.amount / 100, // Convert back to normal currency format
          status: true,
          workingDay: new Date(result.data.transaction_date),
        });

        try {
          await transaction.save();
          return res.status(200).json({ success: true, message: 'Transaction saved successfully' });
        } catch (error) {
          return res.status(500).json({ success: false, message: 'Failed to save transaction', error });
        }
      } else {
        return res.status(400).json({ success: false, message: 'Transaction not successful' });
      }
    });
  }).on('error', (error) => {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }).end();
}; */