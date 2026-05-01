const fs = require('fs');
const file = fs.readFileSync('src/app/pages/home/home.component.html', 'utf8');

const topPart = file.split('<!-- ===== 2. WHAT IS INNOVAT BHARAT ===== -->')[0];
const bottomPart = '  <!-- ===== 9. CONTACT US ===== -->' + file.split('<!-- ===== 9. CONTACT US ===== -->')[1];

const newSections = `  <!-- ===== DISCOVER INNOVAT BHARAT (TABBED) ===== -->
  <section class="section discover-section">
    <div class="container">
      <div class="section-header text-center" style="margin-bottom: 2rem;">
        <p class="section-eyebrow">Discover Innovat Bharat</p>
        <h2 class="section-title">Explore Our Ecosystem</h2>
      </div>

      <!-- Tab Navigation -->
      <div class="tabs-nav-wrapper">
        <div class="tabs-nav">
          <button class="tab-btn" [class.active]="activeTab === 'overview'" (click)="setActiveTab('overview')">Overview</button>
          <button class="tab-btn" [class.active]="activeTab === 'challenge'" (click)="setActiveTab('challenge')">The Challenge</button>
          <button class="tab-btn" [class.active]="activeTab === 'approach'" (click)="setActiveTab('approach')">Our Approach</button>
          <button class="tab-btn" [class.active]="activeTab === 'get-involved'" (click)="setActiveTab('get-involved')">Get Involved</button>
        </div>
      </div>

      <!-- Tab Content Area -->
      <div class="tabs-content">
        
        <!-- OVERVIEW TAB -->
        @if (activeTab === 'overview') {
          <div class="tab-pane fade-in">
            <div class="what-is-compact" style="margin-bottom: 3rem;">
              <h2 class="section-title text-center">What is <span class="text-accent">Innovat Bharat</span>?</h2>
              <p class="section-subtitle text-center">We build premier institute-like ecosystems inside Tier-3 & rural colleges — giving students the direction, mentorship, and real exposure they deserve. While IITs have all the resources, we focus on the millions of talented students in small-town colleges who are often overlooked.</p>
              <div class="what-is-cta text-center mt-4">
                <a routerLink="/about" class="btn-learn-more">
                  Learn More About Us
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            <div class="vision-section-inner">
              <h3 class="text-center mb-4" style="color: var(--primary-dark); font-size: 2rem; font-weight: 800;">Vision &amp; Mission</h3>
              <div class="vm-grid">
                <div class="vm-card vm-card-vision">
                  <div class="vm-icon">🎯</div>
                  <h3>Vision</h3>
                  <p>To transform Bharat into a global Product Nation by 2047, powered by a Bharat-centric economic model and 1 million rural entrepreneurs from Tier-3 and rural colleges.</p>
                </div>
                <div class="vm-card vm-card-mission">
                  <div class="vm-icon">🚀</div>
                  <h3>Mission</h3>
                  <p>We transform rural colleges into startup hubs where students learn to invent and build their own products. When students become entrepreneurs in their own towns, they create opportunities, generate jobs, and drive India's growth from the grassroots.</p>
                </div>
              </div>
              <p class="vision-tagline text-center mt-4">"Right direction. Right mentorship. Real exposure."</p>
            </div>
          </div>
        }

        <!-- THE CHALLENGE TAB -->
        @if (activeTab === 'challenge') {
          <div class="tab-pane fade-in problem-section-inner">
            <p class="section-subtitle text-center" style="max-width: 800px; margin: 0 auto 3rem;">Three interconnected failures holding back millions of talented students in rural and Tier-3 colleges.</p>
            <div class="problem-grid">
              <div class="problem-card">
                <div class="problem-icon">📚</div>
                <h3>Theory vs. Execution</h3>
                <ul class="problem-list">
                  <li>There is a big gap between the deep theory taught in a 4-year degree and the fast, "action-heavy" needs of modern Tech and Pharma industries.</li>
                  <li>In global companies, tools and technologies change every 6 months, while college degrees remain the same for 4 years.</li>
                  <li>Students graduate with good bookish knowledge but don't know how to handle live production or real-world standards.</li>
                  <li>Even after graduating, students often have to start learning from scratch to meet actual industry standards.</li>
                </ul>
              </div>
              <div class="problem-card">
                <div class="problem-icon">⏰</div>
                <h3>Training Starts Too Late</h3>
                <ul class="problem-list">
                  <li>In most colleges, students spend their first three years only studying books and preparing for exams.</li>
                  <li>Communication skills and interview preparation only start in the final or pre-final year.</li>
                  <li>Because training starts so late, students don't get enough time to become experts before they graduate.</li>
                  <li>By the time students start learning real-world skills, they have already lost three very important years.</li>
                </ul>
              </div>
              <div class="problem-card">
                <div class="problem-icon">💸</div>
                <h3>Parents Pay Twice</h3>
                <ul class="problem-list">
                  <li>Parents spend their life savings on college fees with the simple hope that it will lead to a good job.</li>
                  <li>Because degrees focus only on theory, parents are forced to pay a second time for private "job-guarantee" courses.</li>
                  <li>Students spend 4–5 critical years in college but still don't feel ready for the real world.</li>
                  <li>Instead of starting their career after college, students have to start learning basic job skills from scratch.</li>
                </ul>
              </div>
            </div>
          </div>
        }

        <!-- OUR APPROACH TAB -->
        @if (activeTab === 'approach') {
          <div class="tab-pane fade-in pillars-section-inner">
            <p class="section-subtitle text-center" style="max-width: 800px; margin: 0 auto 3rem;">A proven model that turns a regular college into a launchpad for student founders.</p>
            <div class="pillars-grid">
              @for (pillar of pillars; track $index) {
                <div class="pillar-card">
                  <span class="pillar-icon">{{ pillar.icon }}</span>
                  <h3>{{ pillar.title }}</h3>
                  <p>{{ pillar.desc }}</p>
                </div>
              }
            </div>
          </div>
        }

        <!-- GET INVOLVED TAB -->
        @if (activeTab === 'get-involved') {
          <div class="tab-pane fade-in get-involved-inner">
            <div class="audience-split-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
              <!-- Students -->
              <div class="audience-block" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); text-align: center;">
                <h3 class="audience-title" style="color: var(--primary-dark); margin-bottom: 1rem; font-size: 1.5rem;">For Students</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">Are you a student in a Tier-3 or rural college? Discover how Innovat Bharat can help you build a real career, earn early, and create impact from your own hometown.</p>
                <div>
                  <a routerLink="/for-students-parents" class="btn btn-cta">Learn More for Students</a>
                </div>
              </div>
              
              <!-- Mentors -->
              <div class="audience-block" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); text-align: center;">
                <h3 class="audience-title" style="color: var(--primary-dark); margin-bottom: 1rem; font-size: 1.5rem;">For Mentors</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">Are you an experienced professional who wants to make a real difference? Join our network of mentors and help shape the next generation of entrepreneurs from rural India.</p>
                <div>
                  <a routerLink="/partners-mentors" class="btn btn-cta">Become a Mentor</a>
                </div>
              </div>
            </div>

            <!-- Collaborate -->
            <div class="collaborate-block" style="background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
              <h3 class="text-center mb-3" style="color: var(--primary-dark); font-size: 1.75rem;">Collaborate With Us</h3>
              <p class="text-center" style="color: var(--text-muted); max-width: 600px; margin: 0 auto 2.5rem;">Companies, NGOs, and Institutes — partner with Innovat Bharat to drive real change in rural education and entrepreneurship.</p>
              <div class="collaborate-cards">
                <div class="collab-preview-card">
                  <div class="collab-preview-icon">🏢</div>
                  <h3>Company</h3>
                  <p>Offer live projects, internships, and industry exposure to student founders.</p>
                  <a routerLink="/collaborate" class="btn btn-outline-sm">Learn More</a>
                </div>
                <div class="collab-preview-card">
                  <div class="collab-preview-icon">🏛️</div>
                  <h3>Institutes</h3>
                  <p>Co-create programs and share educational resources to uplift the ecosystem.</p>
                  <a routerLink="/for-colleges" class="btn btn-outline-sm">Learn More</a>
                </div>
                <div class="collab-preview-card">
                  <div class="collab-preview-icon">🤲</div>
                  <h3>NGO</h3>
                  <p>Collaborate on grassroots social impact initiatives for rural communities.</p>
                  <a routerLink="/collaborate" class="btn btn-outline-sm">Learn More</a>
                </div>
              </div>
              <div class="text-center" style="margin-top: 2.5rem;">
                <a routerLink="/collaborate" class="btn btn-cta btn-large">Register to Collaborate</a>
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  </section>

`;

const newFile = topPart + newSections + bottomPart;
fs.writeFileSync('src/app/pages/home/home.component.html', newFile);
console.log('HTML Replaced');
