import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BannerSlide {
  image: string;
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
      image: '/assets/banners/campus-innovation.png'
    },
    {
      image: '/assets/banners/campus-life.png'
    },
    {
      image: '/assets/banners/startup-culture.png'
    },
    {
      image: '/assets/banners/tier3-students.png'
    },
    {
      image: '/assets/banners/rural-empowerment.png'
    }
  ];

  activeBannerIndex: number = 0;
  private bannerInterval: any;
  private autoplayPaused: boolean = false;

  // Quote of the Day — rotates daily
  quotes: string[] = [
    '"Be the college that didn\'t just place students, but built the nation."',
    '"Right direction. Right mentorship. Real exposure."',
    '"The best investment you can make is in the youth of Bharat."',
    '"Small town roots, national impact — that is the Innovat Bharat story."',
    '"Every great founder started somewhere. Let it start at your campus."',
    '"Empowering one student changes a family. Empowering a college changes a nation."',
    '"Dream big, start local, impact global."'
  ];

  get quoteOfTheDay(): string {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000
    );
    return this.quotes[dayOfYear % this.quotes.length];
  }

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

  // What We Do — 4 Pillars
  pillars = [
    { icon: '🧠', title: 'Mindset & Foundation', desc: 'Shifting student thinking from "finding a job" to "solving a problem" from year one.' },
    { icon: '🏢', title: 'Industry Exposure', desc: 'Real internships, live projects, and hands-on learning from active professionals.' },
    { icon: '🚀', title: 'Startup Culture', desc: 'Transforming campuses into active labs where teams build real products.' },
    { icon: '🤝', title: 'Community & Mentorship', desc: 'Connecting students with alumni, leaders, and traditional business wisdom.' }
  ];

  // Tabbed Interface State
  activeTab: string = 'overview';

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
}

