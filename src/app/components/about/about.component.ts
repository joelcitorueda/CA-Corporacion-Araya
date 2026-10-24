import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  highlight?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="nosotros" class="about-section">
      <div class="about-container">
        <!-- Left Column: Company Story & Proposition -->
        <div class="about-content">
          <div class="badge-tag">
            <span class="gold-dot"></span>
            <span>SOBRE NOSOTROS</span>
          </div>

          <h2 class="section-title">
            ¿Por qué elegir <br />
            <span class="brand-highlight">Corporación Araya?</span>
          </h2>

          <p class="section-lead">
            Somos una empresa líder en tecnología en Bolivia, especializada en computadoras de alto rendimiento,
            impresoras corporativas y suministros originales para empresas e instituciones.
          </p>

          <p class="section-desc">
            Contamos con productos 100% certificados, un stock permanente garantizado para responder a requerimientos
            inmediatos y los precios más competitivos del mercado, respaldados por asesoría experta y servicio postventa de primer nivel.
          </p>

          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-number">+10</span>
              <span class="stat-label">Años de Liderazgo</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">Unidades por Modelo</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">1080</span>
              <span class="stat-label">Días de Garantía</span>
            </div>
          </div>

          <div class="about-cta-wrapper">
            <button class="btn-primary" (click)="scrollTo('contacto')">
              <span>Solicitar Asesoría</span>
              <i class="fas fa-arrow-right"></i>
            </button>
            <button class="btn-outline" (click)="scrollTo('catalogo')">
              <i class="fas fa-boxes-stacked"></i>
              <span>Ver Catálogo</span>
            </button>
          </div>
        </div>

        <!-- Right Column: 4 Feature Cards (2x2 Grid) -->
        <div class="features-grid">
          @for (card of featureCards; track card.title) {
            <div class="feature-card">
              <div class="card-icon-container">
                <i [class]="card.icon"></i>
              </div>
              <h3 class="card-title">{{ card.title }}</h3>
              <p class="card-desc">{{ card.description }}</p>
              @if (card.highlight) {
                <div class="card-highlight">
                  <i class="fas fa-check-circle"></i>
                  <span>{{ card.highlight }}</span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      background-color: #FFFFFF;
      padding: 5rem 1.25rem;
      position: relative;
      overflow: hidden;

      @media (min-width: 768px) {
        padding: 6.5rem 2rem;
      }

      @media (min-width: 1024px) {
        padding: 7.5rem 3rem;
      }
    }

    .about-container {
      max-width: 1240px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 3.5rem;
      align-items: center;

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 1.1fr;
        gap: 4.5rem;
      }
    }

    /* Left Column Styles */
    .about-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .badge-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(196, 150, 60, 0.1);
      color: #C4963C;
      font-size: 0.8125rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.4rem 0.9rem;
      border-radius: 9999px;
      margin-bottom: 1.25rem;
      border: 1px solid rgba(196, 150, 60, 0.25);
    }

    .gold-dot {
      width: 7px;
      height: 7px;
      background-color: #C4963C;
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(196, 150, 60, 0.6);
    }

    .section-title {
      font-size: 2.125rem;
      line-height: 1.2;
      font-weight: 800;
      color: #1B3A5C;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;

      @media (min-width: 768px) {
        font-size: 2.65rem;
      }

      @media (min-width: 1024px) {
        font-size: 3rem;
      }
    }

    .brand-highlight {
      color: #2E86DE;
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 0;
        width: 100%;
        height: 6px;
        background: rgba(46, 134, 222, 0.15);
        border-radius: 4px;
        z-index: -1;
      }
    }

    .section-lead {
      font-size: 1.125rem;
      line-height: 1.7;
      color: #374151;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .section-desc {
      font-size: 0.9875rem;
      line-height: 1.7;
      color: #6B7280;
      margin-bottom: 2.25rem;
    }

    .stats-row {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      width: 100%;
      padding: 1.25rem;
      background: #F8FAFC;
      border-radius: 14px;
      border: 1px solid #E2E8F0;
      margin-bottom: 2.5rem;

      @media (min-width: 640px) {
        gap: 2rem;
        padding: 1.5rem;
      }
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .stat-number {
      font-size: 1.75rem;
      font-weight: 800;
      color: #1B3A5C;
      line-height: 1.1;

      @media (min-width: 640px) {
        font-size: 2.1rem;
      }
    }

    .stat-label {
      font-size: 0.775rem;
      font-weight: 600;
      color: #6B7280;
      margin-top: 0.35rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .stat-divider {
      width: 1px;
      height: 42px;
      background: #CBD5E1;
    }

    .about-cta-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;

      @media (min-width: 640px) {
        flex-direction: row;
        width: auto;
      }
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      background: #2E86DE;
      color: #FFFFFF;
      font-size: 0.9375rem;
      font-weight: 600;
      padding: 0.875rem 1.625rem;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(46, 134, 222, 0.3);
      transition: all 0.25s ease;

      &:hover {
        background: #1B3A5C;
        box-shadow: 0 6px 18px rgba(27, 58, 92, 0.35);
        transform: translateY(-2px);
      }

      i {
        font-size: 0.85rem;
        transition: transform 0.2s ease;
      }

      &:hover i {
        transform: translateX(3px);
      }
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      background: transparent;
      color: #1B3A5C;
      font-size: 0.9375rem;
      font-weight: 600;
      padding: 0.875rem 1.5rem;
      border-radius: 10px;
      border: 1.5px solid #CBD5E1;
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover {
        border-color: #1B3A5C;
        background: #F8FAFC;
        transform: translateY(-2px);
      }
    }

    /* Right Column: 2x2 Feature Cards Grid */
    .features-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;

      @media (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .feature-card {
      background: #FFFFFF;
      border-radius: 16px;
      padding: 2rem 1.625rem;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      position: relative;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 30px rgba(27, 58, 92, 0.1), 0 4px 10px rgba(27, 58, 92, 0.04);
        border-color: #2E86DE;

        .card-icon-container {
          background: #1B3A5C;
          color: #FFFFFF;
          transform: scale(1.05);
        }
      }
    }

    .card-icon-container {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background: rgba(27, 58, 92, 0.08);
      color: #1B3A5C;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      font-size: 1.5rem;
      transition: all 0.3s ease;
    }

    .card-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1B3A5C;
      margin-bottom: 0.625rem;
      line-height: 1.3;
    }

    .card-desc {
      font-size: 0.925rem;
      color: #6B7280;
      line-height: 1.6;
      margin-bottom: 1rem;
      flex-grow: 1;
    }

    .card-highlight {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #059669;
      background: #ECFDF5;
      padding: 0.35rem 0.65rem;
      border-radius: 6px;
      align-self: flex-start;

      i {
        font-size: 0.75rem;
      }
    }
  `]
})
export class AboutComponent {
  featureCards: FeatureCard[] = [
    {
      icon: 'fas fa-laptop',
      title: 'Equipos Certificados',
      description: 'Dispositivos empresariales originales avalados por los fabricantes de mayor prestigio internacional.',
      highlight: 'Calidad 100% garantizada'
    },
    {
      icon: 'fas fa-boxes-stacked',
      title: 'Stock Garantizado',
      description: 'Más de 50 unidades disponibles por producto para atender requerimientos institucionales y licitaciones.',
      highlight: '50+ unidades por modelo'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Garantía Extendida',
      description: 'Respaldo técnico oficial de hasta 1080 días con soporte técnico especializado en todo el territorio boliviano.',
      highlight: 'Hasta 1080 días de cobertura'
    },
    {
      icon: 'fas fa-truck',
      title: 'Entrega Inmediata',
      description: 'Despacho prioritario y distribución segura a nivel nacional para que sus proyectos nunca se detengan.',
      highlight: 'Envíos a todo el país'
    }
  ];

  scrollTo(elementId: string): void {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
