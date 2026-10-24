import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="site-footer">
      <div class="container">
        <!-- Top Section: 3 Columns -->
        <div class="footer-grid">
          <!-- Column 1: Brand Info & Social Media -->
          <div class="footer-col col-brand">
            <a href="#inicio" (click)="scrollTo('inicio', $event)" class="footer-logo-link" aria-label="Corporación Araya">
              <img
                src="images/logo-completo.png"
                alt="Corporación Araya"
                class="footer-logo"
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
            <p class="footer-description">
              Soluciones integrales de vanguardia en tecnología informática, equipamiento para empresas y suministros de alta calidad con garantía y respaldo técnico profesional.
            </p>
            <div class="social-links" aria-label="Redes sociales">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn facebook"
                aria-label="Facebook"
              >
                <i class="fab fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn instagram"
                aria-label="Instagram"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                href="https://wa.me/59168222855"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn whatsapp"
                aria-label="WhatsApp"
              >
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <!-- Column 2: Enlaces Rápidos -->
          <div class="footer-col col-links">
            <h4 class="col-title">Enlaces Rápidos</h4>
            <div class="title-underline"></div>
            <ul class="quick-links">
              <li>
                <a href="#inicio" (click)="scrollTo('inicio', $event)">
                  <i class="fas fa-chevron-right link-bullet"></i> Inicio
                </a>
              </li>
              <li>
                <a href="#nosotros" (click)="scrollTo('nosotros', $event)">
                  <i class="fas fa-chevron-right link-bullet"></i> Nosotros
                </a>
              </li>
              <li>
                <a href="#productos" (click)="scrollTo('productos', $event)">
                  <i class="fas fa-chevron-right link-bullet"></i> Productos
                </a>
              </li>
              <li>
                <a href="#catalogo" (click)="scrollTo('catalogo', $event)">
                  <i class="fas fa-chevron-right link-bullet"></i> Catálogo
                </a>
              </li>
              <li>
                <a href="#contacto" (click)="scrollTo('contacto', $event)">
                  <i class="fas fa-chevron-right link-bullet"></i> Contacto
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 3: Contacto -->
          <div class="footer-col col-contact">
            <h4 class="col-title">Contacto</h4>
            <div class="title-underline"></div>
            <ul class="contact-list">
              <li>
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-detail">
                  <span class="label">Ventas</span>
                  <a href="mailto:ventas@corporacionaraya.com">ventas&#64;corporacionaraya.com</a>
                </div>
              </li>
              <li>
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-detail">
                  <span class="label">Gerencia</span>
                  <a href="mailto:gerencia@corporacionaraya.com">gerencia&#64;corporacionaraya.com</a>
                </div>
              </li>
              <li>
                <div class="contact-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="contact-detail">
                  <span class="label">Dirección</span>
                  <span>Barrio San Roque, Calle Fray Manuel Mingo, Calle Ballivian Nro. 747</span>
                </div>
              </li>
              <li>
                <div class="contact-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="contact-detail">
                  <span class="label">Teléfono fijo</span>
                  <a href="tel:46658723">466: 58723</a>
                </div>
              </li>
              <li>
                <div class="contact-icon">
                  <i class="fas fa-mobile-alt"></i>
                </div>
                <div class="contact-detail">
                  <span class="label">Móvil directo</span>
                  <a href="tel:68222855">Celular: 68222855</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar: Copyright -->
        <div class="footer-bottom">
          <p class="copyright-text">
            &copy; 2024 Corporación Araya. Todos los derechos reservados.
          </p>
          <div class="footer-bottom-badges">
            <span class="badge"><i class="fas fa-shield-alt"></i> Calidad Garantizada</span>
            <span class="badge"><i class="fas fa-headset"></i> Soporte Especializado</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background-color: #0F172A;
      color: #9CA3AF;
      padding-top: 4.5rem;
      padding-bottom: 2rem;
      border-top: 3px solid #C4963C;
      font-size: 0.95rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1.4fr;
      gap: 3rem;
      margin-bottom: 3.5rem;
    }

    // Brand Column
    .footer-logo-link {
      display: inline-block;
      margin-bottom: 1.25rem;
      text-decoration: none;
    }

    .footer-logo {
      width: 150px;
      height: auto;
      object-fit: contain;
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
        font-size: 1.75rem;
      }

      .logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1.1;

        .logo-main {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #FFFFFF;
        }

        .logo-sub {
          font-size: 1.35rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #2E86DE;
        }
      }
    }

    .footer-description {
      color: #94A3B8;
      line-height: 1.65;
      margin-bottom: 1.75rem;
      font-size: 0.925rem;
    }

    .social-links {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .social-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.07);
      color: #FFFFFF;
      font-size: 1.1rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      &.facebook:hover {
        background-color: #1877F2;
        box-shadow: 0 4px 12px rgba(24, 119, 242, 0.4);
      }

      &.instagram:hover {
        background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
        box-shadow: 0 4px 12px rgba(214, 36, 159, 0.4);
      }

      &.whatsapp:hover {
        background-color: #25D366;
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
      }
    }

    // Column Titles
    .col-title {
      color: #FFFFFF;
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      letter-spacing: 0.02em;
    }

    .title-underline {
      width: 42px;
      height: 3px;
      background: linear-gradient(90deg, #C4963C, #2E86DE);
      border-radius: 2px;
      margin-bottom: 1.5rem;
    }

    // Quick Links Column
    .quick-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      li a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: #94A3B8;
        text-decoration: none;
        transition: all 0.25s ease;
        font-weight: 500;

        .link-bullet {
          font-size: 0.65rem;
          color: #C4963C;
          transition: transform 0.25s ease;
        }

        &:hover {
          color: #2E86DE;
          transform: translateX(4px);

          .link-bullet {
            transform: translateX(2px);
          }
        }
      }
    }

    // Contact Column
    .contact-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.15rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.85rem;

        .contact-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: rgba(46, 134, 222, 0.12);
          color: #2E86DE;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          margin-top: 0.15rem;
        }

        .contact-detail {
          display: flex;
          flex-direction: column;
          line-height: 1.4;

          .label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #C4963C;
            font-weight: 600;
            margin-bottom: 0.15rem;
          }

          a {
            color: #E2E8F0;
            text-decoration: none;
            transition: color 0.2s ease;

            &:hover {
              color: #2E86DE;
            }
          }

          span {
            color: #CBD5E1;
            font-size: 0.9rem;
          }
        }
      }
    }

    // Bottom Bar
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .copyright-text {
      color: #64748B;
      font-size: 0.875rem;
      margin: 0;
    }

    .footer-bottom-badges {
      display: flex;
      align-items: center;
      gap: 1.25rem;

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.8rem;
        color: #94A3B8;

        i {
          color: #C4963C;
        }
      }
    }

    // Responsive: Single column on mobile & tablet
    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }

      .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class FooterComponent {
  logoLoadFailed = false;

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
