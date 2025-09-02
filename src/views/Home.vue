<template>
  <div class="home">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  }
}
</script>
