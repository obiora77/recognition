<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>Future Stars Foundation</h4>
            <p>Empowering young footballers through education and training</p>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <p>Email: info@futurestars.org</p>
            <p>Phone: +44 20 1234 5678</p>
          </div>
          <div class="footer-section">
            <h4>Follow Us</h4>
            <div class="social-links">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 Honoring George Str. All rights reserved.</p>
        </div>
      </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style scoped>

/* Footer */
.footer {
  background: #333;
  color: white;
  padding: 3rem  3rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #4CAF50;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #4CAF50;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #555;
  color: #ccc;
}
</style>