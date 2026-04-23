import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BannerSlide {
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
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
