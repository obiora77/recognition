<template>
  <div class="container">
     <!-- Contact Form Section -->
    <section class="contact-form-section">
      <div class="container">
        <div class="form-container">
          <div class="form-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you within 24 hours</p>
          </div>
          
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name <span>*</span></label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="form.firstName" 
                  required
                  :class="{ 'error': errors.firstName }"
                >
                <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
              </div>
              
              <div class="form-group">
                <label for="lastName">Last Name <span>*</span></label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="form.lastName" 
                  required
                  :class="{ 'error': errors.lastName }"
                >
                <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address <span>*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required
                  :class="{ 'error': errors.email }"
                >
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone"
                  placeholder="+1 (555) 123-4567"
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="company">Company Name</label>
              <input 
                type="text" 
                id="company" 
                v-model="form.company"
                placeholder="Your company name"
              >
            </div>
            
            <div class="form-group">
              <label for="message">Message <span>*</span></label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5" 
                required
                placeholder="Tell us about your project management challenges and how we can help..."
                :class="{ 'error': errors.message }"
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>
            
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.newsletter">
                <span class="checkmark"></span>
                Subscribe to our newsletter for product updates and industry insights
              </label>
            </div>
            
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to common questions</p>
        </div>
        
        <div class="faq-list">
          <div 
            class="faq-item" 
            v-for="(faq, index) in faqs" 
            :key="index"
            :class="{ 'active': activeFaq === index }"
          >
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ faq.question }}</h3>
              <span class="faq-toggle">{{ activeFaq === index ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-show="activeFaq === index">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

     <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Message Sent Successfully!</h3>
          <button @click="closeModal" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <p>Thank you for contacting TechFlow. We've received your message and will get back to you within 24 hours.</p>
          <p>In the meantime, feel free to explore our <router-link to="/features">features</router-link> or check out our <router-link to="/about">company story</router-link>.</p>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="btn btn-primary">Close</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {

   setup() {
      const form = reactive({
         firstName: '',
         lastName: '',
         email: '',
         phone: '',
         company: '',
         teamSize: '',
         inquiryType: '',
         message: '',
         newsletter: false
      })

      const errors = reactive({})
      const isSubmitting = ref(false)
      const showSuccessModal = ref(false)
      const activeFaq = ref(null)

      const faqs = ref([
      {
        question: 'What types of payment are supported?',
        answer: 'All major credit cards, PayPal, and a bank transfer using Plaid'
      },
      {
        question: 'Are there processing fees?',
        answer: 'Your donation will include the option to cover any processing fees, depending on the form of payment.'
      },
      {
        question: 'Is this tax-deductible?',
        answer: "George Strait Recognition is a 501(c)3 organization registered in all 50 states. Contributions are deductible to the extent allowed by law. International donations may not be tax-deductible. International donors should check with their tax advisors to determine whether their donations are deductible under their jurisdiction's tax law. Please consult your tax advisor to see how this may apply to you. a bank transfer using Plaid"
      },
      {
        question: 'Where does my money actually go?',
        answer: 'We offer 24/7 live chat support, email support, phone support for enterprise customers, and a comprehensive knowledge base with tutorials and best practices.'
      },
      {
        question: 'What if my donation exceeds $5,000?',
        answer: 'For donations that exceed $5,000 USD, please reach out to us at {donation@gmail.com} for guidance!'
      },
      {
        question: 'What kind of support do you provide?',
        answer: 'We offer 24/7 live chat support, email support, phone support for enterprise customers, and a comprehensive knowledge base with tutorials and best practices.'
      }
    ])

    const validateForm = () => {
      const newErrors = {}

      if (!form.firstName.trim()) {
        newErrors.firstName = 'First name is required'
      }

      if (!form.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
      }

      if (!form.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = 'Please enter a valid email address'
      }

      if (!form.message.trim()) {
        newErrors.message = 'Message is required'
      } else if (form.message.trim().length < 10) {
        newErrors.message = 'Message must be at least 10 characters long'
      }

      Object.keys(errors).forEach(key => delete errors[key])
      Object.assign(errors, newErrors)

      return Object.keys(newErrors).length === 0
    }

    
    const submitForm = async () => {
      if (!validateForm()) {
        return
      }

      isSubmitting.value = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Reset form
        Object.keys(form).forEach(key => {
          if (typeof form[key] === 'boolean') {
            form[key] = false
          } else {
            form[key] = ''
          }
        })

        showSuccessModal.value = true
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('There was an error sending your message. Please try again.')
      } finally {
        isSubmitting.value = false
      }
    }

    const closeModal = () => {
      showSuccessModal.value = false
    }

    const toggleFaq = (index) => {
      activeFaq.value = activeFaq.value === index ? null : index
    }

    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      })

      document.querySelectorAll('.contact-method, .faq-item').forEach(el => {
        observer.observe(el)
      })
    })

    return {
      form,
      errors,
      isSubmitting,
      showSuccessModal,
      activeFaq,
      faqs,
      submitForm,
      closeModal,
      toggleFaq
    }
   }

}
</script>

<style scoped>
/* Contact Form Section */
.contact-form-section {
  padding: 6rem 0;
  background: white;
}
.form-container {
  max-width: 800px;
  margin: 0 auto;
}
.form-header {
  text-align: center;
  margin-bottom: 3rem;
}
.form-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}
.form-header p {
  font-size: 1.1rem;
  color: #4b5563;
}
.contact-form {
  background: #fcfcfc;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}
.form-group label span {
  color: #ef4444;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: white;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0284c7;
}
.form-group input.error,
.form-group textarea.error {
  border-color: #ef4444;
}
.error-message {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  display: block;
}
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
}
.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}
.submit-button {
  background: linear-gradient(135deg, #0ea5e9, #0369a1);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
}
.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
}
.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}


/* FAQ Section */
.faq-section {
  padding: 6rem 0;
  background: white;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}
.faq-item {
  border: 2px solid #0ea5e9;
  border-radius: 15px;
  margin-bottom: 1rem;
  gap: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  transform: translateY(20px);
}
.faq-item.animate-in {
  transform: translateY(0);
}
.faq-item.active {
  border-color: #0284c7;
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  background: #f8fafc;
  transition: background-color 0.3s ease;
}
.faq-question:hover {
  background: #f3f4f6;
}
.faq-question h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}
.faq-toggle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0284c7;
}
.faq-answer {
  padding: 0 1.5rem 1.5rem;
  background: white;
}
.faq-answer p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  box-shadow: var(--shadow-xl);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
}
.modal-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-800);
  margin: 0;
}
.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--gray-500);
  cursor: pointer;
}
.modal-body {
  padding: 0 2rem 1rem;
  color: var(--gray-600);
  line-height: 1.6;
}
.modal-body a {
  color: var(--primary-600);
  text-decoration: none;
}
.modal-footer {
  padding: 1rem 2rem 2rem;
  text-align: right;
}
.btn {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.btn:hover {
  transform: translateY(-2px);
}


/* Responsive Design */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-form {
    padding: 2rem;
  }
  .form-header h2 {
   font-size: 2rem;
  }
  .form-header p {
   font-size: .7rem;
  }
}
</style>