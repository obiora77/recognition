<template>
  <section class="donation-section">
    <div class="container">
      <div class="donation-form">
        <h2 class="form-title">Support the Presidential Honor Ceremony</h2>
        <ProgressBar />
        
        <div class="form-content">
          <div class="amount-selection">
            <h3>Select Donation Amount</h3>
            <div class="amount-buttons">
              <button
                v-for="amount in predefinedAmounts"
                :key="amount"
                @click="selectAmount(amount)"
                :class="['amount-btn', { active: selectedAmount === amount }]"
              >
                ${{ amount }}
              </button>
            </div>
            
            <div class="custom-amount-section">
              <label for="customAmount">Or enter custom amount:</label>
              <div class="input-group">
                <span class="currency">$</span>
                <input
                  id="customAmount"
                  v-model.number="customAmount"
                  type="number"
                  placeholder="0.00"
                  min="1"
                  class="custom-amount-input"
                  @input="selectCustomAmount"
                >
              </div>
            </div>
          </div>
          
          <div class="donor-info">
            <h3>Your Information</h3>
            <div class="form-group">
              <label for="donorName">Full Name *</label>
              <input
                id="donorName"
                v-model="donorInfo.name"
                type="text"
                required
                class="form-input"
                placeholder="Enter your full name"
              >
            </div>
            
            <div class="form-group">
              <label for="donorEmail">Email Address *</label>
              <input
                id="donorEmail"
                v-model="donorInfo.email"
                type="email"
                required
                class="form-input"
                placeholder="Enter your email"
              >
            </div>
            
            <div class="form-group">
              <label for="donorMessage">Message (Optional)</label>
              <textarea
                id="donorMessage"
                v-model="donorInfo.message"
                class="form-textarea"
                placeholder="Leave a message for George Strait..."
                rows="4"
              ></textarea>
            </div>
          </div>
          
          <PaymentForm @payment-success="handlePaymentSuccess" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProgressBar from './ProgressBar.vue'
import PaymentForm from './PaymentForm.vue'

export default {
  name: 'DonationForm',
  components: {
    ProgressBar,
    PaymentForm
  },
  data() {
    return {
      predefinedAmounts: [25, 50, 100, 250, 500, 1000],
      selectedAmount: 0,
      customAmount: 0
    }
  },
  computed: {
    ...mapState(['donationAmount', 'donorInfo']),
    currentAmount() {
      return this.selectedAmount || this.customAmount
    }
  },
  methods: {
    ...mapActions(['updateDonationAmount', 'updateDonorInfo']),
    selectAmount(amount) {
      this.selectedAmount = amount
      this.customAmount = 0
      this.updateDonationAmount(amount)
    },
    selectCustomAmount() {
      this.selectedAmount = 0
      this.updateDonationAmount(this.customAmount)
    },
    handlePaymentSuccess() {
      this.$router.push('/success')
    }
  },
  watch: {
    donorInfo: {
      handler(newInfo) {
        this.updateDonorInfo(newInfo)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.donation-section {
  padding: 40px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.donation-form {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.form-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.form-content {
  display: grid;
  gap: 40px;
}

.amount-selection h3,
.donor-info h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.amount-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.amount-btn {
  padding: 15px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.amount-btn:hover,
.amount-btn.active {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.custom-amount-section {
  margin-top: 20px;
}

.custom-amount-section label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #2c3e50;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 15px;
  font-weight: bold;
  color: #7f8c8d;
  z-index: 1;
}

.custom-amount-input {
  width: 100%;
  padding: 15px 15px 15px 35px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1.1rem;
  transition: border-color 0.3s ease;
}

.custom-amount-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

@media (max-width: 768px) {
  .donation-form {
    padding: 30px 20px;
  }
  
  .form-title {
    font-size: 2rem;
  }
  
  .amount-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>