import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductGift {
  icon: string;
  label: string;
}

interface ProductOffer {
  badge: string;
  headline: string;
  note: string;
  gifts: ProductGift[];
}

interface FeaturedProduct {
  id: string;
  /** Slug corto y legible para el enlace compartible (ej. #DellPro14Ultra). */
  link: string;
  name: string;
  category: string;
  badge: string;
  image: string;
  stock: string;
  price: string;
  specs: ProductSpec[];
  isExpanded: boolean;
  offer?: ProductOffer;
}

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="productos" class="featured-section">
      <div class="featured-container">
        <!-- Section Header -->
        <div class="section-header">
          <div class="badge-tag">
            <span class="gold-dot"></span>
            <span>DISPONIBILIDAD INMEDIATA</span>
          </div>
          <h2 class="section-title">Productos Destacados</h2>
          <p class="section-subtitle">
            Equipos empresariales de alto rendimiento con disponibilidad inmediata
          </p>
        </div>

        <!-- Products Grid -->
        <div class="products-grid">
          @for (product of products; track product.id) {
            <article
              class="product-card"
              [id]="'producto-' + product.id"
              [class.has-offer]="product.offer"
            >
              <!-- Availability Badge -->
              <div class="status-badge">
                <span class="pulse-indicator"></span>
                <span>{{ product.badge }}</span>
              </div>

              <!-- Offer Ribbon -->
              @if (product.offer) {
                <div class="offer-ribbon">
                  <i class="fas fa-tag"></i>
                  <span>{{ product.offer.badge }}</span>
                </div>
              }

              <!-- Product Image Showcase -->
              <div class="image-wrapper">
                <picture>
                  <source
                    type="image/webp"
                    [attr.srcset]="getWebpSrcset(product.image)"
                    sizes="(min-width: 992px) 560px, 92vw"
                  />
                  <img
                    [src]="product.image"
                    [alt]="product.name"
                    width="1200"
                    height="640"
                    [attr.loading]="product.offer ? 'eager' : 'lazy'"
                    [attr.fetchpriority]="product.offer ? 'high' : 'auto'"
                    decoding="async"
                    class="product-image"
                  />
                </picture>
              </div>

              <!-- Content Area -->
              <div class="card-content">
                <div class="product-header">
                  <span class="category-pill">{{ product.category }}</span>
                  <h3 class="product-title">{{ product.name }}</h3>

                  <div class="meta-row">
                    <div class="stock-pill">
                      <i class="fas fa-boxes-stacked"></i>
                      <span>{{ product.stock }}</span>
                    </div>
                    <div class="price-pill">
                      <span class="price-label">Inversión:</span>
                      <strong class="price-value">{{ product.price }}</strong>
                    </div>
                  </div>
                </div>

                <!-- Offer / Gift Bundle -->
                @if (product.offer) {
                  <div class="offer-panel">
                    <div class="offer-heading">
                      <span class="offer-gift-icon">
                        <i class="fas fa-gift"></i>
                      </span>
                      <div class="offer-heading-text">
                        <h4>{{ product.offer.headline }}</h4>
                        <p>{{ product.offer.note }}</p>
                      </div>
                    </div>

                    <ul class="gift-list">
                      @for (gift of product.offer.gifts; track gift.label) {
                        <li>
                          <i [class]="'fas ' + gift.icon"></i>
                          <span>{{ gift.label }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                }

                <!-- Specs Section -->
                <div class="specs-wrapper">
                  <div class="specs-header">
                    <span class="specs-title">
                      <i class="fas fa-microchip"></i> Ficha Técnica
                    </span>
                    <button
                      type="button"
                      class="toggle-expand-btn"
                      (click)="toggleSpecs(product)"
                      [attr.aria-expanded]="product.isExpanded"
                    >
                      <span>{{ product.isExpanded ? 'Ver resumen' : 'Ver todo' }}</span>
                      <i
                        class="fas fa-chevron-down toggle-icon"
                        [class.rotated]="product.isExpanded"
                      ></i>
                    </button>
                  </div>

                  <!-- Specs Table -->
                  <div class="specs-table-container">
                    <table class="specs-table">
                      <tbody>
                        @for (
                          spec of getVisibleSpecs(product);
                          track spec.label
                        ) {
                          <tr class="spec-row">
                            <td class="spec-label">{{ spec.label }}</td>
                            <td class="spec-value">{{ spec.value }}</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>

                  <!-- Expanded Specs Counter Note -->
                  @if (!product.isExpanded) {
                    <button
                      type="button"
                      class="view-more-banner"
                      (click)="toggleSpecs(product)"
                    >
                      <i class="fas fa-plus-circle"></i>
                      <span>
                        Mostrar {{ product.specs.length - initialSpecsLimit }} especificaciones técnicas más
                      </span>
                    </button>
                  }
                </div>

                <!-- Card Actions -->
                <div class="card-footer">
                  <button
                    type="button"
                    class="btn-quote"
                    (click)="requestQuote(product.name)"
                  >
                    <i class="fas fa-file-invoice-dollar"></i>
                    <span>Solicitar Cotización</span>
                  </button>

                  <button
                    type="button"
                    class="btn-share"
                    [class.copied]="copiedId === product.id"
                    (click)="shareProduct(product)"
                    [attr.aria-label]="'Compartir enlace de ' + product.name"
                    [attr.title]="'Copiar enlace directo a ' + product.name"
                  >
                    @if (copiedId === product.id) {
                      <i class="fas fa-check"></i>
                    } @else {
                      <i class="fas fa-link"></i>
                    }
                  </button>
                </div>
              </div>
            </article>
          }
        </div>

        <!-- Link copied feedback -->
        @if (shareMessage) {
          <div class="share-toast" role="status" aria-live="polite">
            <i class="fas fa-circle-check"></i>
            <span>{{ shareMessage }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .featured-section {
      background-color: #F3F4F6;
      padding: 5rem 1.25rem;
      position: relative;

      @media (min-width: 768px) {
        padding: 6.5rem 2rem;
      }

      @media (min-width: 1024px) {
        padding: 7.5rem 2.5rem;
      }
    }

    .featured-container {
      max-width: 1240px;
      margin: 0 auto;
    }

    /* Section Header */
    .section-header {
      text-align: center;
      max-width: 760px;
      margin: 0 auto 3.5rem auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .badge-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(46, 134, 222, 0.1);
      color: #1B3A5C;
      font-size: 0.8125rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.4rem 0.95rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
      border: 1px solid rgba(46, 134, 222, 0.2);
    }

    .gold-dot {
      width: 7px;
      height: 7px;
      background-color: #C4963C;
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(196, 150, 60, 0.7);
    }

    .section-title {
      font-size: 2.15rem;
      font-weight: 800;
      color: #1B3A5C;
      line-height: 1.2;
      margin-bottom: 0.85rem;
      letter-spacing: -0.02em;

      @media (min-width: 768px) {
        font-size: 2.75rem;
      }
    }

    .section-subtitle {
      font-size: 1.05rem;
      line-height: 1.6;
      color: #6B7280;
      font-weight: 400;

      @media (min-width: 768px) {
        font-size: 1.15rem;
      }
    }

    /* Grid Layout: Stacked on mobile, 2 columns on desktop */
    .products-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.25rem;

      @media (min-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
      }
    }

    /* Product Card */
    .product-card {
      background: #FFFFFF;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(15, 23, 42, 0.03);
      border: 1px solid #E2E8F0;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 35px rgba(27, 58, 92, 0.12), 0 4px 10px rgba(0, 0, 0, 0.04);
        border-color: #CBD5E1;
      }
    }

    /* Available Green Badge */
    .status-badge {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 5;
      background: #10B981;
      color: #FFFFFF;
      font-size: 0.725rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 0.4rem 0.85rem;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35);
    }

    .pulse-indicator {
      width: 6px;
      height: 6px;
      background: #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
      animation: pulse 1.8s infinite;
    }

    /* Offer Ribbon (top-left) */
    .offer-ribbon {
      position: absolute;
      top: 1.25rem;
      left: 1.25rem;
      z-index: 5;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: linear-gradient(135deg, #F2CD7B 0%, #C4963C 55%, #A87B26 100%);
      color: #1B1F26;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      padding: 0.45rem 0.8rem;
      border-radius: 9999px;
      box-shadow: 0 4px 14px rgba(196, 150, 60, 0.4);
    }

    .product-card.has-offer {
      border-color: #E3C98F;
      box-shadow: 0 10px 25px rgba(168, 123, 38, 0.12), 0 1px 3px rgba(15, 23, 42, 0.03);
    }

    .product-card.is-linked {
      border-color: #C4963C;
      box-shadow: 0 0 0 3px rgba(196, 150, 60, 0.35), 0 22px 40px rgba(27, 58, 92, 0.18);
    }

    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
      }
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
      }
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
      }
    }

    /* Image Wrapper */
    .image-wrapper {
      background: radial-gradient(circle at 50% 45%, #F8FAFC 0%, #FFFFFF 72%);
      padding: 2.25rem 2rem 1.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #F1F5F9;
      min-height: 320px;
    }

    .image-wrapper picture {
      display: contents;
    }

    .product-image {
      display: block;
      width: 100%;
      max-height: 280px;
      height: 280px;
      object-fit: contain;
      transition: transform 0.4s ease;

      .product-card:hover & {
        transform: scale(1.03);
      }
    }

    /* Gift Bundle Panel */
    .offer-panel {
      margin-bottom: 1.5rem;
      padding: 1rem 1.1rem;
      border-radius: 12px;
      background: linear-gradient(135deg, #FFFAF0 0%, #FFF6E4 100%);
      border: 1px solid #F0DCB0;
    }

    .offer-heading {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.85rem;
    }

    .offer-gift-icon {
      flex: 0 0 auto;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: linear-gradient(135deg, #C4963C 0%, #A87B26 100%);
      color: #FFFFFF;
      font-size: 0.95rem;
      box-shadow: 0 3px 10px rgba(168, 123, 38, 0.3);
    }

    .offer-heading-text h4 {
      margin: 0 0 0.2rem 0;
      font-size: 0.95rem;
      font-weight: 800;
      color: #7A5A16;
      line-height: 1.3;
    }

    .offer-heading-text p {
      margin: 0;
      font-size: 0.8rem;
      line-height: 1.45;
      color: #8A6A2A;
    }

    .gift-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.45rem 0.75rem;

      @media (max-width: 380px) {
        grid-template-columns: 1fr;
      }
    }

    .gift-list li {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.79rem;
      font-weight: 600;
      color: #5F4A17;
      line-height: 1.35;

      i {
        color: #A87B26;
        font-size: 0.8rem;
        flex: 0 0 auto;
      }
    }

    /* Card Content Area */
    .card-content {
      padding: 1.75rem 1.5rem 1.75rem 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      @media (min-width: 640px) {
        padding: 2rem;
      }
    }

    .product-header {
      margin-bottom: 1.5rem;
    }

    .category-pill {
      font-size: 0.725rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #C4963C;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 0.35rem;
    }

    .product-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: #1B3A5C;
      line-height: 1.3;
      margin-bottom: 1rem;

      @media (min-width: 640px) {
        font-size: 1.45rem;
      }
    }

    .meta-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.85rem;
      padding: 0.75rem 1rem;
      background: #F8FAFC;
      border-radius: 10px;
      border: 1px solid #E2E8F0;
    }

    .stock-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: #059669;

      i {
        font-size: 0.95rem;
      }
    }

    .price-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
    }

    .price-label {
      color: #6B7280;
    }

    .price-value {
      color: #1B3A5C;
      font-weight: 700;
      font-size: 0.95rem;
    }

    /* Specs Section */
    .specs-wrapper {
      margin-bottom: 2rem;
      flex-grow: 1;
    }

    .specs-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #E2E8F0;
    }

    .specs-title {
      font-size: 0.875rem;
      font-weight: 700;
      color: #1B3A5C;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 0.45rem;

      i {
        color: #2E86DE;
      }
    }

    .toggle-expand-btn {
      background: none;
      border: none;
      color: #2E86DE;
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      transition: background 0.2s ease, color 0.2s ease;

      &:hover {
        background: rgba(46, 134, 222, 0.08);
        color: #1B3A5C;
      }
    }

    .toggle-icon {
      font-size: 0.75rem;
      transition: transform 0.25s ease;

      &.rotated {
        transform: rotate(180deg);
      }
    }

    .specs-table-container {
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      overflow: hidden;
    }

    .specs-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
      text-align: left;
    }

    .spec-row {
      &:nth-child(even) {
        background-color: #F8FAFC;
      }

      &:nth-child(odd) {
        background-color: #FFFFFF;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #F1F5F9;
      }
    }

    .spec-label {
      padding: 0.65rem 0.85rem;
      font-weight: 600;
      color: #1B3A5C;
      width: 38%;
      vertical-align: top;
      border-right: 1px solid #F1F5F9;

      @media (min-width: 640px) {
        padding: 0.75rem 1rem;
        width: 35%;
      }
    }

    .spec-value {
      padding: 0.65rem 0.85rem;
      color: #374151;
      vertical-align: middle;
      line-height: 1.45;

      @media (min-width: 640px) {
        padding: 0.75rem 1rem;
      }
    }

    .view-more-banner {
      width: 100%;
      margin-top: 0.6rem;
      padding: 0.65rem;
      background: #F8FAFC;
      border: 1px dashed #CBD5E1;
      border-radius: 8px;
      color: #2E86DE;
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      transition: all 0.2s ease;

      &:hover {
        background: #EFF6FF;
        border-color: #2E86DE;
        color: #1B3A5C;
      }
    }

    /* Card Footer & Blue CTA */
    .card-footer {
      margin-top: auto;
      display: flex;
      align-items: stretch;
      gap: 0.6rem;
    }

    .btn-share {
      flex: 0 0 auto;
      width: 52px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #F1F5F9;
      color: #2E86DE;
      font-size: 1.05rem;
      border: 1px solid #DBE4EF;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #E8F1FC;
        border-color: #2E86DE;
        color: #1B3A5C;
      }

      &.copied {
        background: #ECFDF3;
        border-color: #10B981;
        color: #059669;
      }
    }

    .btn-quote {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      background: #2E86DE;
      color: #FFFFFF;
      font-size: 1rem;
      font-weight: 700;
      padding: 0.95rem 1.5rem;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(46, 134, 222, 0.35);
      transition: all 0.25s ease;

      &:hover {
        background: #1B3A5C;
        box-shadow: 0 6px 20px rgba(27, 58, 92, 0.4);
        transform: translateY(-2px);
      }

      i {
        font-size: 1.05rem;
      }
    }

    /* Toast feedback */
    .share-toast {
      position: fixed;
      left: 50%;
      bottom: 1.75rem;
      transform: translateX(-50%);
      z-index: 1200;
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      max-width: calc(100vw - 2rem);
      padding: 0.8rem 1.15rem;
      border-radius: 12px;
      background: #1B1F26;
      color: #FFFFFF;
      font-size: 0.86rem;
      font-weight: 600;
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.3);
      animation: toast-in 0.25s ease-out;

      i {
        color: #6EE7B7;
      }
    }

    @keyframes toast-in {
      from {
        opacity: 0;
        transform: translate(-50%, 12px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
  `]
})
export class FeaturedProductsComponent implements AfterViewInit, OnDestroy {
  readonly initialSpecsLimit = 5;

  copiedId: string | null = null;
  shareMessage = '';

  private toastTimer: ReturnType<typeof setTimeout> | null = null;
  private highlightTimer: ReturnType<typeof setTimeout> | null = null;
  private appReady = false;

  private readonly onAppReady = (): void => {
    this.appReady = true;
    this.applyDeepLink(false);
  };

  products: FeaturedProduct[] = [
    {
      id: 'dell-pro-14-ultra-7',
      link: 'DellPro14Ultra',
      name: 'Dell Pro 14 - Intel Ultra 7 255U vPro',
      category: 'GAMA EMPRESARIAL',
      badge: 'DISPONIBLE',
      image: 'images/products/dell-pro-14-ultra-7.jpg',
      stock: '50+ unidades disponibles',
      price: 'Consultar precio',
      isExpanded: false,
      offer: {
        badge: 'En oferta',
        headline: 'Kit de regalo corporativo incluido',
        note:
          'Por cada equipo: lector DVD, mochila y teclado + mouse inalámbricos. Más de 50 kits completos disponibles.',
        gifts: [
          { icon: 'fa-compact-disc', label: 'Lector y quemador de DVD externo' },
          { icon: 'fa-briefcase', label: 'Mochila para laptop' },
          { icon: 'fa-keyboard', label: 'Teclado y mouse inalámbricos' }
        ]
      },
      specs: [
        {
          label: 'Modelo',
          value: 'Dell Pro 14'
        },
        {
          label: 'Procesador',
          value: 'Intel Core Ultra 7 255U (12 núcleos, hasta 5.2 GHz)'
        },
        {
          label: 'Memoria RAM',
          value: '64 GB DDR5, 5600 MT/s'
        },
        {
          label: 'Almacenamiento',
          value: 'SSD 1 TB M.2 NVMe'
        },
        {
          label: 'Pantalla',
          value: '14" FHD+ (1920 x 1200), IPS, antirreflejo (Anti-Glare), 300 nits'
        },
        {
          label: 'Gráficos',
          value: 'Gráficos Intel integrados'
        },
        {
          label: 'Conectividad',
          value: 'Wi-Fi 6E (802.11ax) y Bluetooth 5.3'
        },
        {
          label: 'Cámara',
          value: '1080p Full HD con micrófono dual y obturador de privacidad'
        },
        {
          label: 'Audio',
          value: 'Audio de alta definición, micrófonos duales'
        },
        {
          label: 'Puertos',
          value:
            '1x USB 3.2 Type-A 1.ª gen, 1x USB 3.2 Type-A 1.ª gen con PowerShare, 1x Ethernet RJ-45 (1 GbE), 1x HDMI 2.1, 1x USB Type-C Thunderbolt con Power Delivery 3.1 y DisplayPort 2.1, 1x USB Type-C con Power Delivery 3.1 y DisplayPort 2.0, 1x conector para auriculares universal, 1x conector de alimentación, 1x conector externo para VGA'
        },
        {
          label: 'Batería',
          value: '3 celdas, 55 Wh'
        },
        {
          label: 'Teclado',
          value: 'Español retroiluminado'
        },
        {
          label: 'Sistema Operativo',
          value: 'Windows 11 Pro'
        },
        {
          label: 'Dimensiones',
          value: 'Aprox. 18.5 mm x 313 mm x 224 mm (alto x ancho x profundidad)'
        },
        {
          label: 'Peso',
          value: 'Aprox. 1.35 kg'
        },
        {
          label: 'Color',
          value: 'Plata (Silver)'
        },
        {
          label: 'Garantía',
          value: '2 años'
        }
      ]
    },
    {
      id: 'dell-pro-14-ultra-5',
      link: 'DellPro14',
      name: 'Dell Pro 14 - Ultra 5 235U vPro',
      category: 'GAMA EMPRESARIAL',
      badge: 'DISPONIBLE',
      image: 'images/products/dell-pro-14-ultra-5.jpg',
      stock: '50+ unidades disponibles',
      price: 'Consultar precio',
      isExpanded: false,
      specs: [
        {
          label: 'Modelo',
          value: 'PC14250'
        },
        {
          label: 'Procesador',
          value:
            'Intel Core Ultra 5 225U (12 núcleos, 14 hilos, hasta 4.8 GHz, NPU Intel AI Boost hasta 12 TOPS)'
        },
        {
          label: 'Gráficos',
          value: 'Gráficos Intel integrados'
        },
        {
          label: 'Memoria RAM',
          value: '64 GB DDR5-5600 MT/s, 1x16 GB, canal único'
        },
        {
          label: 'Almacenamiento',
          value: 'SSD M.2 PCIe NVMe Gen4 de 1 TB'
        },
        {
          label: 'Pantalla',
          value:
            '14 pulgadas FHD+, resolución 1920x1200, panel IPS, formato 16:10, 300 nits, 45% NTSC, acabado antirreflejo'
        },
        {
          label: 'Cámara',
          value:
            'FHD RGB + IR de 1080p a 30 FPS, con HDR, reducción de ruido y obturador de privacidad'
        },
        {
          label: 'Conectividad',
          value: 'Intel Wi-Fi 6E y Bluetooth 5.3'
        },
        {
          label: 'Red cableada',
          value: 'Ethernet RJ45 Gigabit'
        },
        {
          label: 'Puertos',
          value:
            '2x USB-A 3.2 Gen 1 (5Gbps), 1x USB-A 3.2 Gen 1 con PowerShare, 1x USB-C 3.2 Gen 2 (10Gbps) con DisplayPort y Power Delivery, 1x Thunderbolt 4 (40Gbps) con DisplayPort 2.1 y PD 3.1, 1x HDMI 2.1, 1x RJ45, 1x audio combo, 1x conector de alimentación'
        },
        {
          label: 'Batería',
          value: '3 celdas, 45 Wh o 55 Wh según configuración'
        },
        {
          label: 'Adaptador',
          value: 'USB-C de 65 W'
        },
        {
          label: 'Sistema Operativo',
          value: 'Windows 11 Pro'
        },
        {
          label: 'Seguridad',
          value: 'TPM, obturador de privacidad para cámara'
        },
        {
          label: 'Dimensiones',
          value: '313.70 x 225.30 mm, altura 18.89 a 20.37 mm'
        },
        {
          label: 'Peso',
          value: 'Desde 1.35 kg'
        },
        {
          label: 'Garantía',
          value: '1080 días'
        }
      ]
    },
    {
      id: 'hp-probook-450-g10',
      link: 'HPProBook450',
      name: 'HP ProBook 450 G10',
      category: 'GAMA EMPRESARIAL',
      badge: 'DISPONIBLE',
      image: 'images/products/hp-probook-450-g10.jpg',
      stock: '50+ unidades disponibles',
      price: 'Consultar precio',
      isExpanded: false,
      specs: [
        {
          label: 'Procesador',
          value: 'Intel Core i5-1335U (10 núcleos, hasta 4.6 GHz)'
        },
        {
          label: 'Gráficos',
          value: 'Intel Iris Xe Graphics'
        },
        {
          label: 'Memoria RAM',
          value: '16 GB DDR4-3200 (2 ranuras SODIMM)'
        },
        {
          label: 'Almacenamiento',
          value: 'SSD 256 GB PCIe NVMe'
        },
        {
          label: 'Pantalla',
          value: '15.6" FHD (1920x1080), IPS, antirreflejo, 250 nits'
        },
        {
          label: 'Sistema Operativo',
          value: 'Windows 11 Pro'
        },
        {
          label: 'Conectividad',
          value: 'Intel Wi-Fi 6E y Bluetooth 5.3'
        },
        {
          label: 'Cámara',
          value: 'HD 720p con obturador de privacidad'
        },
        {
          label: 'Puertos',
          value:
            '2x USB-A 3.2 Gen 1, 1x USB-C Thunderbolt 4, 1x USB-C 3.2 Gen 2, 1x HDMI 2.1, 1x RJ-45, 1x audio combo'
        },
        {
          label: 'Batería',
          value: '3 celdas, 51 Wh con carga rápida'
        },
        {
          label: 'Teclado',
          value: 'Español retroiluminado con lector de huella'
        },
        {
          label: 'Peso',
          value: '1.79 kg'
        },
        {
          label: 'Garantía',
          value: '12 meses'
        }
      ]
    },
    {
      id: 'hp-laserjet-mfp-m428fdw',
      link: 'HPLaserJetM428fdw',
      name: 'HP LaserJet Pro MFP M428fdw',
      category: 'IMPRESIÓN CORPORATIVA',
      badge: 'DISPONIBLE',
      image: 'images/products/hp-laserjet-mfp-m428fdw.jpg',
      stock: '50+ unidades disponibles',
      price: 'Consultar precio',
      isExpanded: false,
      specs: [
        {
          label: 'Funciones',
          value: 'Impresión, copia, escaneo y fax'
        },
        {
          label: 'Tecnología',
          value: 'Láser monocromática'
        },
        {
          label: 'Velocidad',
          value: 'Hasta 40 ppm en negro (A4)'
        },
        {
          label: 'Resolución',
          value: 'Hasta 1200 x 1200 dpi'
        },
        {
          label: 'Doble cara',
          value: 'Automática en impresión y escaneo'
        },
        {
          label: 'Alimentador',
          value: 'ADF de 50 hojas'
        },
        {
          label: 'Conectividad',
          value: 'Wi-Fi de doble banda, Ethernet Gigabit, USB 2.0 y Wi-Fi Direct'
        },
        {
          label: 'Pantalla',
          value: 'Táctil a color de 2.7 pulgadas'
        },
        {
          label: 'Capacidad',
          value: 'Bandeja de 250 hojas + alimentador prioritario de 100'
        },
        {
          label: 'Volumen mensual',
          value: 'Hasta 4.000 páginas recomendadas'
        },
        {
          label: 'Consumible',
          value: 'Tóner HP 58A (CF258A) / 58X de alto rendimiento'
        },
        {
          label: 'Seguridad',
          value: 'HP Wolf Pro Security integrada'
        },
        {
          label: 'Garantía',
          value: '12 meses'
        }
      ]
    }
  ];

  ngAfterViewInit(): void {
    window.addEventListener('araya:ready', this.onAppReady);
    // Enlace profundo (#DellPro14Ultra): abre la ficha del equipo desplegada.
    // Se difiere un tick para no mutar el estado durante la verificación de Angular.
    setTimeout(() => this.applyDeepLink(true), 0);
    // Respaldo por si el preloader no llega a emitir el evento de "listo".
    setTimeout(() => {
      if (!this.appReady) {
        this.appReady = true;
        this.applyDeepLink(false);
      }
    }, 3400);
  }

  ngOnDestroy(): void {
    window.removeEventListener('araya:ready', this.onAppReady);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    if (this.highlightTimer) clearTimeout(this.highlightTimer);
  }

  @HostListener('window:hashchange')
  onHashChange(): void {
    this.applyDeepLink(false);
  }

  /** Genera el srcset WebP responsivo a partir del JPG de origen. */
  getWebpSrcset(image: string): string {
    const base = image.replace(/\.(jpe?g|png)$/i, '');
    return `${base}-480.webp 480w, ${base}-960.webp 960w`;
  }

  /** Comparte (o copia) el enlace directo a esta ficha de producto. */
  async shareProduct(product: FeaturedProduct): Promise<void> {
    const url = this.buildProductUrl(product);

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${product.name} | Corporación Araya`,
          text: product.offer
            ? `${product.name} — incluye kit de regalo corporativo.`
            : product.name,
          url
        });
        return;
      } catch (error) {
        // El usuario canceló el diálogo del sistema: no hacemos nada más.
        if ((error as DOMException)?.name === 'AbortError') {
          return;
        }
      }
    }

    if (await this.copyToClipboard(url)) {
      this.copiedId = product.id;
      this.showToast('Enlace copiado. Compártelo con tu cliente.');
    } else {
      this.showToast(url);
    }
  }

  buildProductUrl(product: FeaturedProduct): string {
    const base = window.location.href.split('#')[0];
    return `${base}#${product.link}`;
  }

  private async copyToClipboard(text: string): Promise<boolean> {
    if (navigator.clipboard?.writeText) {
      try {
        // Si el navegador pide permiso y no responde, no dejamos el botón colgado.
        await Promise.race([
          navigator.clipboard.writeText(text),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1200))
        ]);
        return true;
      } catch {
        // Sin permisos de portapapeles: probamos el método clásico.
      }
    }

    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-1000px';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(area);
      return copied;
    } catch {
      return false;
    }
  }

  private showToast(message: string): void {
    this.shareMessage = message;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.shareMessage = '';
      this.copiedId = null;
    }, 3400);
  }

  private applyDeepLink(instant: boolean): void {
    if (typeof window === 'undefined') return;

    const product = this.linkedProduct();
    if (!product) return;

    // Quien abre el enlace compartido ve la ficha técnica completa de inmediato.
    product.isExpanded = true;

    setTimeout(() => {
      this.alignToProduct(product, instant);

      const element = document.getElementById(`producto-${product.id}`);
      if (!element) return;
      element.classList.add('is-linked');
      if (this.highlightTimer) clearTimeout(this.highlightTimer);
      this.highlightTimer = setTimeout(() => element.classList.remove('is-linked'), 4500);
    }, 120);
  }

  /**
   * Lleva el scroll a la ficha del producto y reajusta si el layout se mueve
   * mientras cargan el hero 3D, las fuentes o las imágenes.
   */
  private alignToProduct(product: FeaturedProduct, instant: boolean): void {
    const headerOffset = 86;
    const delays = instant ? [0, 350, 800, 1500, 2400] : [0, 400, 900];

    delays.forEach((delay, index) => {
      setTimeout(() => {
        if (this.linkedProduct()?.id !== product.id) return;

        const element = document.getElementById(`producto-${product.id}`);
        if (!element) return;

        const offset = element.getBoundingClientRect().top - headerOffset;
        if (Math.abs(offset) < 6) return;

        const smooth = index === 0 && !instant;
        window.scrollTo({
          top: Math.max(0, window.scrollY + offset),
          behavior: smooth ? 'smooth' : 'auto'
        });
      }, delay);
    });
  }

  /** Resuelve el producto asociado al hash actual (#DellPro14Ultra). */
  private linkedProduct(): FeaturedProduct | undefined {
    const raw = window.location.hash.replace(/^#/, '');
    if (!raw) return undefined;

    const hash = decodeURIComponent(raw).toLowerCase();
    const legacyId = hash.startsWith('producto-') ? hash.slice('producto-'.length) : '';

    return this.products.find(
      (item) =>
        item.link.toLowerCase() === hash ||
        item.id.toLowerCase() === hash ||
        (!!legacyId && item.id.toLowerCase() === legacyId)
    );
  }

  toggleSpecs(product: FeaturedProduct): void {
    product.isExpanded = !product.isExpanded;
  }

  getVisibleSpecs(product: FeaturedProduct): ProductSpec[] {
    if (product.isExpanded) {
      return product.specs;
    }
    return product.specs.slice(0, this.initialSpecsLimit);
  }

  requestQuote(productName: string): void {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Set product into inquiry input or form if available
    const productField = document.getElementById('producto-interes') as HTMLInputElement | null;
    if (productField) {
      productField.value = productName;
      productField.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
