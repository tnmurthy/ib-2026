import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BannerSlide {
  image: string;
  eyebrow: string;
  headline: string;
  highlightText: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Banner Slides — Tier-3 Indian town students & small enterprise imagery
  bannerSlides: BannerSlide[] = [
    {
      image: '/assets/banners/campus-innovation.png',
      eyebrow: "India's Campus Transformation Initiative",
      headline: 'Turning Small-Town Colleges Into',
      highlightText: 'Startup Powerhouses',
      subtitle: 'We build premier ecosystems inside Tier-3 & rural colleges — giving students the direction, mentorship, and real exposure they deserve.',
      ctaText: 'Invite Us To Your College',
      ctaLink: '/contact'
    },
    {
      image: '/assets/banners/campus-life.png',
      eyebrow: 'Bridging Rural Roots & Digital Innovation',
      headline: 'From Village Dreams To',
      highlightText: 'Global Impact',
      subtitle: 'Empowering rural youth with the tools, skills, and mindset to build world-class products — right from their hometowns.',
      ctaText: 'Learn About Our Mission',
      ctaLink: '/about'
    },
    {
      image: '/assets/banners/startup-culture.png',
      eyebrow: 'Learn From Industry Leaders',
      headline: 'Mentorship That Builds',
      highlightText: 'Future Founders',
      subtitle: 'Connect with experienced professionals and business leaders who guide students from idea to execution.',
      ctaText: 'Become a Mentor',
      ctaLink: '/partners-mentors'
    },
    {
      image: '/assets/banners/tier3-students.png',
      eyebrow: 'A Movement Across Campuses',
      headline: 'Building a Culture of',
      highlightText: 'Innovation & Self-Reliance',
      subtitle: 'Transforming everyday college campuses into vibrant ecosystems where students think, build, and launch their ventures.',
      ctaText: 'Partner Your College',
      ctaLink: '/for-colleges'
    },
    {
      image: '/assets/banners/rural-empowerment.png',
      eyebrow: 'Product Nation 2047',
      headline: 'Creating 1 Million',
      highlightText: 'Rural Entrepreneurs',
      subtitle: "From college project to startup — we help students prototype, pitch, and build real businesses that drive India's future.",
      ctaText: 'Join the Movement',
      ctaLink: '/contact'
    }
  ];

  activeBannerIndex: number = 0;
  private bannerInterval: any;
  private autoplayPaused: boolean = false;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.bannerInterval = setInterval(() => {
      if (!this.autoplayPaused) {
        this.activeBannerIndex = (this.activeBannerIndex + 1) % this.bannerSlides.length;
      }
    }, 6000);
  }

  stopAutoPlay(): void {
    if (this.bannerInterval) {
      clearInterval(this.bannerInterval);
    }
  }

  goToSlide(index: number): void {
    this.activeBannerIndex = index;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  nextSlide(): void {
    this.goToSlide((this.activeBannerIndex + 1) % this.bannerSlides.length);
  }

  prevSlide(): void {
    this.goToSlide((this.activeBannerIndex - 1 + this.bannerSlides.length) % this.bannerSlides.length);
  }

  pauseAutoPlay(): void {
    this.autoplayPaused = true;
  }

  resumeAutoPlay(): void {
    this.autoplayPaused = false;
  }

  // Compact 4 Pillars for homepage
  pillars = [
    { icon: '🧠', title: 'Mindset & Foundation', desc: 'Shifting student thinking from "finding a job" to "solving a problem" from year one.' },
    { icon: '🏢', title: 'Industry Exposure', desc: 'Real internships, live projects, and hands-on learning from active professionals.' },
    { icon: '🚀', title: 'Startup Culture', desc: 'Transforming campuses into active labs where teams build real products.' },
    { icon: '🤝', title: 'Community & Mentorship', desc: 'Connecting students with alumni, leaders, and traditional business wisdom.' }
  ];
}
