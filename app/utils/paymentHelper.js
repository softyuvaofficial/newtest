// app/utils/paymentHelper.js

import { supabase } from './supabaseClient';

/**
 * Initiate a payment record in the database
 * @param {Object} paymentData - payment info
 * @param {string} paymentData.userId - User making the payment
 * @param {string} paymentData.testSeriesId - Purchased test series
 * @param {number} paymentData.amount - Payment amount
 * @param {string} paymentData.paymentMethod - e.g. 'razorpay', 'stripe'
 * @param {string} [paymentData.status='pending'] - Payment status
 * @returns {Promise<Object>} Inserted payment record or error
 */
export async function createPaymentRecord({
  userId,
  testSeriesId,
  amount,
  paymentMethod,
  status = 'pending',
}) {
  const { data, error } = await supabase.from('payments').insert([
    {
      user_id: userId,
      test_series_id: testSeriesId,
      amount,
      payment_method: paymentMethod,
      status,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error('Error creating payment record:', error);
    throw error;
  }

  return data[0];
}

/**
 * Update payment status (e.g., from webhook confirmation)
 * @param {string} paymentId
 * @param {string} status - 'success', 'failed', 'pending', etc.
 * @returns {Promise<Object>} Updated payment record or error
 */
export async function updatePaymentStatus(paymentId, status) {
  const { data, error } = await supabase
    .from('payments')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', paymentId)
    .single();

  if (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }

  return data;
}

/**
 * Fetch payment history for a user
 * @param {string} userId
 * @returns {Promise<Array>} Array of payment records
 */
export async function fetchUserPayments(userId) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }

  return data;
}

/**
 * Format currency in INR
 * @param {number} amount
 * @returns {string} formatted currency string
 */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}
