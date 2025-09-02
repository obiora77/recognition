import { createRouter, createWebHistory } from 'vue-router'
import HeroBanner from '@/components/HeroBanner.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import FaqSection from '@/components/FaqSection.vue'

const routes = [
  {
    path: '/',
    component: HeroBanner
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/faqsection',
    component: FaqSection
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
