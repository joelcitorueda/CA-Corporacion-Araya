import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="site-header" [class.scrolled]="isScrolled">
      <div class="container header-container">
        <!-- Logo -->
        <a href="#inicio" (click)="scrollTo('inicio', $event)" class="logo-link" aria-label="Corporación Araya Inicio">
          <img
            src="images/logo-ca.png"
            alt="Corporación Araya"
            class="header-logo"
            (error)="onLogoError($event)"
          />
          <div class="logo-fallback" [class.visible]="logoLoadFailed">
            <span class="logo-icon"><i class="fas fa-layer-group"></i></span>
            <div class="logo-text">
              <span class="logo-main">CORPORACIÓN</span>
              <span class="logo-sub">ARAYA</span>
            </div>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" aria-label="Navegación principal">
          <ul class="nav-list">
            <li *ngFor="let link of navLinks">
              <a
                [href]="'#' + link.target"
                (click)="scrollTo(link.target, $event)"
                class="nav-link"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
          <a
            href="#contacto"
            (click)="scrollTo('contacto', $event)"
            class="header-cta"
          >
            Contáctanos
          </a>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          class="mobile-toggle"
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="isMobileMenuOpen"
          aria-label="Abrir o cerrar menú de navegación"
        >
          <i class="fas" [class.fa-bars]="!isMobileMenuOpen" [class.fa-xmark]="isMobileMenuOpen"></i>
        </button>
      </div>

      <!-- Mobile Dropdown Navigation -->
      <div class="mobile-menu" [class.open]="isMobileMenuOpen">
        <div class="container mobile-menu-inner">
          <ul class="mobile-nav-list">
            <li *ngFor="let link of navLinks">
              <a
                [href]="'#' + link.target"
                (click)="scrollTo(link.target, $event)"
                class="mobile-nav-link"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
          <div class="mobile-cta-wrapper">
            <a
              href="#contacto"
              (click)="scrollTo('contacto', $event)"
              class="mobile-cta-btn"
            >
              <i class="fas fa-paper-plane"></i> Contáctanos
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      background: linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0) 100%);
      transition: background-color 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease;
      padding: 1.15rem 0;

      &.scrolled {
        background: #1B3A5C;
        padding: 0.75rem 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    // Logo Styles
    .logo-link {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      cursor: pointer;
    }

    .header-logo {
      height: 42px;
      width: auto;
      object-fit: contain;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    .logo-fallback {
      display: none;
      align-items: center;
      gap: 0.65rem;

      &.visible {
        display: inline-flex;
      }

      .logo-icon {
        color: #C4963C;
        font-size: 1.6rem;
      }

      .logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1;

        .logo-main {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #FFFFFF;
        }

        .logo-sub {
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #2E86DE;
        }
      }
    }

    // Desktop Navigation
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 2.25rem;
    }

    .nav-list {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .nav-link {
      position: relative;
      color: #FFFFFF;
      font-size: 0.95rem;
      font-weight: 500;
      padding: 0.35rem 0;
      text-decoration: none;
      transition: color 0.3s ease;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #2E86DE;
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 2px;
      }

      &:hover {
        color: #2E86DE;

        &::after {
          width: 100%;
        }
      }
    }

    .header-cta {
      display: inline-flex;
      align-items: center;
      padding: 0.55rem 1.35rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: #FFFFFF;
      background-color: #2E86DE;
      border: 1px solid #2E86DE;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        background-color: #1e6ec0;
        border-color: #1e6ec0;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(46, 134, 222, 0.4);
      }
    }

    // Mobile Hamburger Button
    .mobile-toggle {
      display: none;
      background: transparent;
      border: none;
      color: #FFFFFF;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      line-height: 1;
      transition: color 0.3s ease, transform 0.2s ease;

      &:hover {
        color: #2E86DE;
      }

      &:active {
        transform: scale(0.92);
      }
    }

    // Mobile Menu Dropdown
    .mobile-menu {
      display: none;
      max-height: 0;
      overflow: hidden;
      background-color: #1B3A5C;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
      opacity: 0;

      &.open {
        max-height: 400px;
        opacity: 1;
      }
    }

    .mobile-menu-inner {
      padding-top: 1.25rem;
      padding-bottom: 1.5rem;
    }

    .mobile-nav-list {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .mobile-nav-link {
      display: block;
      padding: 0.75rem 0.5rem;
      color: #FFFFFF;
      font-size: 1.05rem;
      font-weight: 500;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.2s ease;

      &:hover {
        color: #2E86DE;
        background-color: rgba(255, 255, 255, 0.05);
        padding-left: 0.85rem;
      }
    }

    .mobile-cta-wrapper {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .mobile-cta-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-weight: 600;
      color: #FFFFFF;
      background-color: #2E86DE;
      border-radius: 8px;
      text-decoration: none;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #1e6ec0;
      }
    }

    // Responsive Breakpoint
    @media (max-width: 768px) {
      .desktop-nav {
        display: none;
      }

      .mobile-toggle {
        display: block;
      }

      .mobile-menu {
        display: block;
      }
    }
  `]
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  logoLoadFailed = false;

  navLinks = [
    { label: 'Inicio', target: 'inicio' },
    { label: 'Nosotros', target: 'nosotros' },
    { label: 'Productos', target: 'productos' },
    { label: 'Catálogo', target: 'catalogo' },
    { label: 'Contacto', target: 'contacto' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 40;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  onLogoError(event: Event): void {
    this.logoLoadFailed = true;
    const target = event.target as HTMLElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  scrollTo(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeMobileMenu();

    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 75;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
