import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private titleService: Title, private metaService: Meta) {}

  updateTitle(title: string) {
    let fullTitle = title || 'Innovat Bharat — Transforming Tier-3 Colleges Into Startup Ecosystems';
    if (title && !title.includes('Innovat Bharat')) {
      fullTitle = `${title} | Innovat Bharat`;
    }
    this.titleService.setTitle(fullTitle);
  }

  updateMeta(description: string, keywords?: string) {
    if (description) {
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ property: 'og:description', content: description });
      this.metaService.updateTag({ name: 'twitter:description', content: description });
    }
    
    if (keywords) {
      this.metaService.updateTag({ name: 'keywords', content: keywords });
    }
  }

  updateCanonical(url: string) {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
