<template>
  <div class="payment-form">
    <h3>Payment Information</h3>
    <div class="payment-methods">
      <div class="method-tabs">
        <button
          v-for="method in paymentMethods"
          :key="method.id"
          @click="selectedMethod = method.id"
          :class="['method-tab', { active: selectedMethod === method.id }]"
        >
          {{ method.name }}
        </button>
      </div>
      
      <div class="payment-content">
        <div v-if="selectedMethod === 'card'" class="card-payment">
          <div id="card-element" class="stripe-element">
            <!-- Stripe Elements will create form elements here -->
          </div>
          <div v-if="cardError" class="error-message">
            {{ cardError }}
          </div>
        </div>
        
        <div v-else-if="selectedMethod === 'paypal'" class="paypal-payment">
          <div class="paypal-info">
            <p>🔵 PayPal payment will open in a new window</p>
          </div>
        </div>
      </div>
      
      <div class="donation-summary">
        <div class="summary-row">
          <span>Donation Amount:</span>
          <span class="amount">${{ donationAmount }}</span>
        </div>
        <div class="summary-row">
          <span>Processing Fee:</span>
          <span class="fee">${{ processingFee }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span class="total-amount">${{ totalAmount }}</span>
        </div>
      </div>
      
      <button
        @click="processPayment"
        :disabled="!canProcess"
        :class="['donate-btn', { processing: isProcessing }]"
      >
        <span v-if="isProcessing">Processing...</span>
        <span v-else>Donate ${{ totalAmount }}</span>
      </button>
      
      <div class="security-notice">
        <p>🔒 Your payment information is secure and encrypted</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StripeService from '@/services/stripe'

export default {
  name: 'PaymentForm',
  data() {
    return {
      selectedMethod: 'card',
      cardError: null,
      isProcessing: false,
      paymentMethods: [
        { id: 'card', name: '💳 Credit/Debit Card' },
        { id: 'paypal', name: '🔵 PayPal' }
      ]
    }
  },
  computed: {
    ...mapState(['donationAmount', 'donorInfo']),
    processingFee() {
      return Math.round(this.donationAmount * 0.029 + 0.30)
    },
    totalAmount() {
      return this.donationAmount + this.processingFee
    },
    canProcess() {
      return this.donationAmount > 0 && 
             this.donorInfo.name && 
             this.donorInfo.email && 
             !this.isProcessing
    }
  },
  async mounted() {
    await this.initializeStripe()
  },
  methods: {
    ...mapActions(['submitDonation', 'setLoading']),
    async initializeStripe() {
      try {
        await StripeService.initialize()
        this.cardElement = StripeService.createCardElement()
        
        this.$nextTick(() => {
          if (document.getElementById('card-element')) {
            this.cardElement.mount('#card-element')
            
            this.cardElement.on('change', (event) => {
              this.cardError = event.error ? event.error.message : null
            })
          }
        })
      } catch (error) {
        console.error('Stripe initialization failed:', error)
      }
    },
    async processPayment() {
      if (!this.canProcess) return
      
      this.isProcessing = true
      this.setLoading(true)
      
      try {
        if (this.selectedMethod === 'card') {
          await this.processCardPayment()
        } else if (this.selectedMethod === 'paypal') {
          await this.processPayPalPayment()
        }
      } catch (error) {
        console.error('Payment failed:', error)
        this.cardError = 'Payment failed. Please try again.'
      } finally {
        this.isProcessing = false
        this.setLoading(false)
      }
    },
    async processCardPayment() {
      const { token, error } = await StripeService.createToken(this.cardElement)
      
      if (error) {
        this.cardError = error.message
        return
      }
      
      const result = await this.submitDonation({
        type: 'card',
        token: token.id,
        amount: this.totalAmount
      })
      
      if (result.success) {
        this.$emit('payment-success')
      } else {
        this.cardError = result.error
      }
    },
    async processPayPalPayment() {
      // PayPal integration simulation
      const result = await this.submitDonation({
        type: 'paypal',
        amount: this.totalAmount
      })
      
      if (result.success) {
        this.$emit('payment-success')
      } else {
        this.cardError = result.error
      }
    }
  }
}
</script>

<style scoped>
.payment-form {
  border-top: 2px solid #ecf0f1;
  padding-top: 30px;
}

.payment-form h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.method-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.method-tab {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #ddd;
  background: white;
  color: #2c3e50;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.method-tab:hover,
.method-tab.active {
  border-color: #3498db;
  background: #3498db;
  color: white;
}

.payment-content {
  margin-bottom: 25px;
  min-height: 80px;
}

.stripe-element {
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  transition: border-color 0.3s ease;
}

.stripe-element:focus-within {
  border-color: #3498db;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);
}

.paypal-info {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #ddd;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 10px;
  padding: 10px;
  background: #fadbd8;
  border-radius: 5px;
}

.donation-summary {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  border: 1px solid #dee2e6;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1rem;
}

.summary-row.total {
  border-top: 2px solid #ddd;
  padding-top: 10px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.2rem;
}

.amount,
.fee {
  color: #555;
}

.total-amount {
  color: #27ae60;
  font-weight: bold;
}

.donate-btn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.donate-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.donate-btn:hover:not(:disabled)::before {
  left: 100%;
}

.donate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
}

.donate-btn:disabled,
.donate-btn.processing {
  background: #95a5a6;
  cursor: not-allowed;
  transform: none;
}

.security-notice {
  text-align: center;
  margin-top: 15px;
  font-size: 0.9rem;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .method-tabs {
    flex-direction: column;
  }
  
  .method-tab {
    padding: 15px;
  }
}
</style>