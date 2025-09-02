<template>
  <section class="hero">
    <div class="container">
      <div class="grid grid-2">
        <div class="hero-content">
          <h2>Presidential Honor for the King of Country</h2>
          <p class="hero-subtitle">
            Join us in celebrating George Strait's incredible contribution to American music 
            as he receives a special presidential recognition this December.
          </p>
          <div class="honor-details">
            <h3>🏆 Presidential Medal of Arts Ceremony</h3>
            <p><strong>Date:</strong> December 15, 2024</p>
            <p><strong>Location:</strong> The White House, Washington D.C.</p>
            <p><strong>Purpose:</strong> Honoring 50+ years of musical excellence</p>
          </div>
          <div class="stats">
            <div class="stat">
              <span class="stat-number">60+</span>
              <span class="stat-label">#1 Hits</span>
            </div>
            <div class="stat">
              <span class="stat-number">100M+</span>
              <span class="stat-label">Records Sold</span>
            </div>
            <div class="stat">
              <span class="stat-number">50+</span>
              <span class="stat-label">Years Active</span>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <img src="../assets/images/images1.webp" alt="George Strait" class="main-image">
          <div class="image-overlay">
            <p>"The King of Country Music"</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Hosted by Trump -->
   <section>
    <div class="container">
      <div class="grid grid-2 mt-5 mb-5">
        <div class="host-content">
          <h2>Honoring George Strait: Donate to Celebrate a Legend</h2>
          <p class="about-george">
            <strong>George Strait</strong>, the King of Country, is receiving one of America’s highest cultural honors this December the 
            <strong >Kennedy Center Honors</strong>, recognizing his four decades of musical excellence and philanthropic impact.
            This donation page is dedicated to celebrating his legacy and supporting the causes he holds dear, including:
          </p>
          <div class="mt-4">
            <ol class="mt-4"><strong>Military Warriors Support Foundation</strong>: Providing mortgage-free homes to wounded veterans</ol>
            <ol class="mt-4"><strong>Jenifer Strait Memorial Foundation</strong>: Supporting children’s charities in memory of his daughter</ol>
          </div>
        </div>
        <div class="image-content">
          <div class="why">
            <h2>Why Donate?</h2>
            <p class="mt-3 mb-4">Your contribution is more than a gift it's a tribute. By donating, you:</p>
            <div class="">
              <ol class="mb-3">Join fans around the world in honoring George Strait’s legacy</ol>
              <ol class="mb-3">Support real families and veterans through trusted foundations</ol>
              <ol class="mb-3">Help amplify the impact of this historic recognition</ol>
            </div>
          </div>
          <div class="how">
            <h2>How It Works</h2>
            <div class="mt-3">
              <ol class="mb-3">Choose a one-time or monthly donation</ol>
              <ol class="mb-3">100% of proceeds go to verified charities connected to George Strait</ol>
              <ol>Receive a digital thank-you badge and updates on the impact of your gift</ol>
            </div>
            <p class="mb-3">Let’s make this December unforgettable—for George, for the causes he champions, 
              and for the fans who’ve stood by him through every note <strong>Host by Trump</strong></p>
          </div>
        </div>
      </div>
    </div>
   </section>

  <!-- Recent Donors -->
    <section class="recent-donors">
      <div class="container">
        <h3>Recent Supporters</h3>
        <div class="donors-list">
          <div class="donor-item" v-for="donor in recentDonors" :key="donor.id">
            <div class="donor-avatar">{{ donor.initials }}</div>
            <div class="donor-info">
              <p class="donor-name">{{ donor.name }}</p>
              <p class="donor-amout">£{{ donor.amount }}</p>
              <p class="donor-time">{{ donor.timeAgo }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

</template>

<script>
export default {
  name: 'HeroSection',

  data() {
    return {
      recentDonors: [
        { id: 1, name: 'Anonymous Donor', initials: 'AD', amount: '7000', timeAgo: '55 minutes ago' },
        { id: 2, name: 'Anonymous Donor', initials: 'AD', amount: '500', timeAgo: '2 hours ago' },
        { id: 3, name: 'Sarah Mitchell', initials: 'SM', amount: '100', timeAgo: '5 hours ago' },
        { id: 4, name: 'John Thompson', initials: 'JT', amount: '250', timeAgo: '1 day ago' },
        { id: 5, name: 'Anonymous Donor', initials: 'AD', amount: '50', timeAgo: '1 day ago' },
        { id: 6, name: 'Emma Wilson', initials: 'EW', amount: '75', timeAgo: '2 days ago' }
      ]
    }
  }
}
</script>

<style scoped>
.hero-content {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
.hero-content h2 {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #2c3e50;
  line-height: 1.2;
}
.hero-subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 30px;
  line-height: 1.6;
}
.honor-details {
  background: linear-gradient(45deg, #f39c12, #e67e22);
  padding: 25px;
  border-radius: 15px;
  color: white;
  margin-bottom: 30px;
}
.honor-details h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
}
.honor-details p {
  margin-bottom: 8px;
  font-size: 1rem;
}
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}
.stat {
  text-align: center;
  padding: 20px;
  background: linear-gradient(45deg, #3498db, #2980b9);
  border-radius: 15px;
  color: white;
}
.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
}
.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}
.hero-image {
  position: relative;
  text-align: center;
}
.main-image {
  width: 100%;
  max-width: 500px;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
.image-overlay {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px 30px;
  border-radius: 25px;
  font-style: italic;
  font-size: 1.1rem;
}

/*  Hosted */
.host-content h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #2c3e50;
  line-height: 1.2;
}

/* Recent Donors */
.recent-donors {
  padding: 3rem 0;
  background: #f8f9fa;
}

.recent-donors h3 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
}

.donors-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.donor-item {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.donor-avatar {
  width: 50px;
  height: 50px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.donor-name {
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.donor-amount {
  color: #4CAF50;
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.donor-time {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) { 
  .hero-content {
   order: 1;
  } 
  .hero-content h2 {
    font-size: 2rem;
  }
  .stats {
    grid-template-columns: 1fr;
  }
  .image-overlay {
   width: 85%;
  }
}
</style>