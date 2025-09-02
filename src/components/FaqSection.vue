<template>
  <div class="container">
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
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
   name: 'FaqSection',

   setup() {
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

      const toggleFaq = (index) => {
         activeFaq.value = activeFaq.value === index ? null : index
      }

      return {
         activeFaq,
         faqs,
         toggleFaq
      }
   }
}
</script>

<style scoped>
/* FAQ Section */
.faq-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 0;
  background: white;
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

</style>