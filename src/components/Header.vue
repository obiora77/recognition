
<template>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <div class="logo">
          <router-link to="/" class="logo-link">
             <img src="../assets/images/logo.png" alt="Presidential Seal" class="logo-img">
             <div class="logo-text">
                <label for="logo">George Strait</label>
                <p>recognition</p>
             </div>
          </router-link>
        </div>
        <ul class="nav-links" :class="{ 'open': isMobileMenuOpen }">
          <li><router-link to="/" class="nav-link"  @click="closeMobileMenu">Home</router-link></li>
          <li><router-link to="/about" class="nav-link"  @click="closeMobileMenu">About</router-link></li>
          <li><router-link to="/contact" class="nav-link"  @click="closeMobileMenu">Contact</router-link></li>
          <button class="btn btn-primary" >Donate</button>
        </ul>

          <!-- Mobile Menu Button -->
        <button 
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          :class="{ 'open': isMobileMenuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

  data() {
   return {
      isMobileMenuOpen: false
   }
  },
  methods: {
   toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
   },
   closeMobileMenu() {
      this.isMobileMenuOpen = false
   }
  }
}
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}
.logo-link {
  display: flex;
  gap: .5em;
}
.logo-link .logo-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.logo-text {
   line-height: 1.5em;
}
.logo-text label {
   font-family: "Fjalla One", sans-serif;
   font-size: 1.5em;
   font-weight: 600;
}
.logo-text p {
   text-transform: capitalize;
   font-size: 1.7rem;
   font-family: "Pacifico", cursive;
   color: #3498db;
}
.nav-links {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 30px;
}
.nav-link {
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}  
.nav-link:hover,
.nav-link.router-link-active {
  color: #3498db;
}
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 35px;
  height: 35px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.mobile-menu-btn span {
  display: block;
  width: 100%;
  height: 4px;
  background: black;
  margin: .40rem 0;
  transition: all 0.3s ease;
  transform-origin: center;
}
.mobile-menu-btn.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.mobile-menu-btn.open span:nth-child(2) {
  opacity: 0;
}
.mobile-menu-btn.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}
@media (max-width: 768px) {
   .nav-links {
    position: fixed;
    width: 85%;
    top: 5rem;
    left: 0;
    right: -100%;
    background: white;
    flex-direction: column;
    padding: 1.5rem;
    gap: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 1s ease;
  }
  .nav-links.open {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }
  .mobile-menu-btn {
    display: block;
  }
}
</style>