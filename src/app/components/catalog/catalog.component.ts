import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CatalogCategory = 'todos' | 'computadoras' | 'impresoras' | 'toners';

export interface CatalogProduct {
  id: string;
  name: string;
  category: 'computadoras' | 'impresoras' | 'toners';
  categoryLabel: string;
  description: string;
  image: string;
  stock: string;
  price: string;
  features: string[];
}

interface CategoryFilterTab {
  id: CatalogCategory;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="catalogo" class="catalog-section">
      <div class="catalog-container">
        <!-- Section Header -->
        <div class="section-header">
          <div class="badge-tag">
            <span class="gold-dot"></span>
            <span>PORTAFOLIO CORPORATIVO</span>
          </div>
          <h2 class="section-title">Nuestro Catálogo</h2>
          <p class="section-subtitle">
            Soluciones tecnológicas integrales para empresas e instituciones públicas y privadas con stock garantizado en Bolivia.
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="filter-tabs-wrapper">
          <div class="filter-tabs" role="tablist" aria-label="Categorías de productos">
            @for (tab of categoryTabs; track tab.id) {
              <button
                type="button"
                role="tab"
                [attr.aria-selected]="activeCategory === tab.id"
                class="tab-btn"
                [class.active]="activeCategory === tab.id"
                (click)="setCategory(tab.id)"
              >
                <i [class]="tab.icon"></i>
                <span>{{ tab.label }}</span>
                <span class="tab-count">{{ getCategoryCount(tab.id) }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Products Grid (4 cols desktop, 2 cols tablet, 1 col mobile) -->
        <div class="products-grid">
          @for (product of filteredProducts; track product.id) {
            <article class="product-card">
              <!-- Stock Badge -->
              <div class="stock-badge">
                <i class="fas fa-boxes-stacked"></i>
                <span>{{ product.stock }}</span>
              </div>

              <!-- Product Image -->
              <div class="card-media">
                <img
                  [src]="product.image"
                  [alt]="product.name"
                  loading="lazy"
                  class="product-thumb"
                />
              </div>

              <!-- Product Information -->
              <div class="card-body">
                <span class="category-name">{{ product.categoryLabel }}</span>
                <h3 class="product-name" [title]="product.name">{{ product.name }}</h3>
                <p class="product-desc">{{ product.description }}</p>

                <div class="price-row">
                  <span class="price-label">Precio:</span>
                  <span class="price-tag">{{ product.price }}</span>
                </div>

                <div class="card-actions">
                  <button
                    type="button"
                    class="btn-details"
                    (click)="openDetails(product)"
                  >
                    <span>Ver detalles</span>
                    <i class="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </article>
          }
        </div>
      </div>

      <!-- Product Details Modal Dialog -->
      @if (selectedProduct) {
        <div class="modal-backdrop" (click)="closeDetails()">
          <div class="modal-dialog" (click)="$event.stopPropagation()">
            <!-- Modal Close Button -->
            <button
              type="button"
              class="modal-close-btn"
              (click)="closeDetails()"
              aria-label="Cerrar modal"
            >
              <i class="fas fa-times"></i>
            </button>

            <div class="modal-body">
              <div class="modal-image-col">
                <div class="modal-image-wrapper">
                  <img
                    [src]="selectedProduct.image"
                    [alt]="selectedProduct.name"
                    class="modal-image"
                  />
                </div>
                <div class="modal-stock-indicator">
                  <i class="fas fa-check-circle"></i>
                  <span>{{ selectedProduct.stock }} para despacho inmediato</span>
                </div>
              </div>

              <div class="modal-info-col">
                <span class="modal-category">{{ selectedProduct.categoryLabel }}</span>
                <h3 class="modal-title">{{ selectedProduct.name }}</h3>
                <p class="modal-description">{{ selectedProduct.description }}</p>

                <div class="modal-features">
                  <h4 class="features-title">Características destacadas:</h4>
                  <ul>
                    @for (feature of selectedProduct.features; track feature) {
                      <li>
                        <i class="fas fa-check"></i>
                        <span>{{ feature }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <div class="modal-price-box">
                  <span class="price-title">Cotización Corporativa:</span>
                  <span class="price-value">{{ selectedProduct.price }}</span>
                </div>

                <div class="modal-actions">
                  <button
                    type="button"
                    class="btn-quote-modal"
                    (click)="quoteProduct(selectedProduct)"
                  >
                    <i class="fas fa-file-invoice-dollar"></i>
                    <span>Solicitar Cotización Inmediata</span>
                  </button>
                  <button
                    type="button"
                    class="btn-cancel-modal"
                    (click)="closeDetails()"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .catalog-section {
      background-color: #FFFFFF;
      padding: 5rem 1.25rem;
      position: relative;

      @media (min-width: 768px) {
        padding: 6.5rem 2rem;
      }

      @media (min-width: 1024px) {
        padding: 7.5rem 2.5rem;
      }
    }

    .catalog-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    /* Section Header */
    .section-header {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 3rem auto;
      display: flex;
      flex-direction: column;
      align-items: center;
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
      padding: 0.4rem 0.95rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
      border: 1px solid rgba(196, 150, 60, 0.25);
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

    /* Category Filter Tabs */
    .filter-tabs-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 3rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      scrollbar-width: thin;
    }

    .filter-tabs {
      display: inline-flex;
      align-items: center;
      background: #F3F4F6;
      padding: 0.375rem;
      border-radius: 14px;
      gap: 0.35rem;
      border: 1px solid #E5E7EB;
    }

    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1.25rem;
      border-radius: 10px;
      border: none;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      background: transparent;
      color: #4B5563;
      transition: all 0.25s ease;
      white-space: nowrap;

      i {
        font-size: 0.95rem;
        transition: transform 0.2s ease;
      }

      &:hover:not(.active) {
        background: #E5E7EB;
        color: #1B3A5C;
      }

      &.active {
        background: #1B3A5C;
        color: #FFFFFF;
        box-shadow: 0 4px 12px rgba(27, 58, 92, 0.25);

        .tab-count {
          background: rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
        }

        i {
          color: #C4963C;
        }
      }
    }

    .tab-count {
      font-size: 0.75rem;
      padding: 0.15rem 0.5rem;
      border-radius: 9999px;
      background: #E5E7EB;
      color: #6B7280;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    /* Products Grid: 4 columns desktop, 2 tablet, 1 mobile */
    .products-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.75rem;

      @media (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    /* Product Card */
    .product-card {
      background: #FFFFFF;
      border-radius: 16px;
      border: 1px solid #E5E7EB;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 30px rgba(46, 134, 222, 0.15), 0 4px 10px rgba(0, 0, 0, 0.04);
        border-color: #2E86DE;

        .product-thumb {
          transform: scale(1.06);
        }

        .btn-details {
          background: #2E86DE;
          color: #FFFFFF;
          border-color: #2E86DE;

          i {
            transform: translateX(3px);
          }
        }
      }
    }

    /* Stock Badge in Green */
    .stock-badge {
      position: absolute;
      top: 0.85rem;
      left: 0.85rem;
      z-index: 3;
      background: #ECFDF5;
      color: #059669;
      border: 1px solid rgba(16, 185, 129, 0.3);
      font-size: 0.725rem;
      font-weight: 700;
      padding: 0.3rem 0.65rem;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);

      i {
        font-size: 0.75rem;
      }
    }

    /* Card Media */
    .card-media {
      width: 100%;
      height: 210px;
      background: #FFFFFF;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-bottom: 1px solid #F1F5F9;
    }

    .product-thumb {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 0.5rem 0.75rem;
      transition: transform 0.4s ease;
    }

    /* Card Body */
    .card-body {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .category-name {
      font-size: 0.725rem;
      font-weight: 700;
      color: #C4963C;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 0.35rem;
    }

    .product-name {
      font-size: 1.05rem;
      font-weight: 700;
      color: #1B3A5C;
      line-height: 1.35;
      margin-bottom: 0.5rem;
      min-height: 2.7rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-desc {
      font-size: 0.85rem;
      color: #6B7280;
      line-height: 1.5;
      margin-bottom: 1.25rem;
      min-height: 2.55rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex-grow: 1;
    }

    .price-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0;
      margin-bottom: 1rem;
      border-top: 1px solid #F1F5F9;
    }

    .price-label {
      font-size: 0.8125rem;
      color: #6B7280;
    }

    .price-tag {
      font-size: 0.95rem;
      font-weight: 700;
      color: #1B3A5C;
    }

    .card-actions {
      margin-top: auto;
    }

    .btn-details {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.7rem 1rem;
      border-radius: 10px;
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
      color: #1B3A5C;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;

      i {
        font-size: 0.75rem;
        transition: transform 0.2s ease;
      }
    }

    /* Modal Dialog Styles */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal-dialog {
      background: #FFFFFF;
      border-radius: 20px;
      max-width: 780px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .modal-close-btn {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 10;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #F1F5F9;
      border: none;
      color: #4B5563;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #E2E8F0;
        color: #0F172A;
      }
    }

    .modal-body {
      display: grid;
      grid-template-columns: 1fr;
      padding: 2rem 1.5rem;
      gap: 1.75rem;

      @media (min-width: 640px) {
        grid-template-columns: 1fr 1.2fr;
        padding: 2.5rem;
        gap: 2rem;
      }
    }

    .modal-image-col {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .modal-image-wrapper {
      border-radius: 14px;
      overflow: hidden;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 0.75rem;
      background: #FFFFFF;
    }

    .modal-stock-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: #059669;
      background: #ECFDF5;
      padding: 0.6rem 0.85rem;
      border-radius: 8px;
      border: 1px solid rgba(16, 185, 129, 0.25);
    }

    .modal-info-col {
      display: flex;
      flex-direction: column;
    }

    .modal-category {
      font-size: 0.775rem;
      font-weight: 700;
      color: #C4963C;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.35rem;
    }

    .modal-title {
      font-size: 1.45rem;
      font-weight: 800;
      color: #1B3A5C;
      line-height: 1.3;
      margin-bottom: 0.75rem;
    }

    .modal-description {
      font-size: 0.95rem;
      color: #4B5563;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .modal-features {
      margin-bottom: 1.5rem;

      .features-title {
        font-size: 0.875rem;
        font-weight: 700;
        color: #1B3A5C;
        margin-bottom: 0.6rem;
      }

      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
      }

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: #374151;

        i {
          color: #059669;
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }
      }
    }

    .modal-price-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem 1rem;
      background: #F8FAFC;
      border-radius: 10px;
      border: 1px solid #E2E8F0;
      margin-bottom: 1.5rem;
    }

    .price-title {
      font-size: 0.875rem;
      color: #6B7280;
    }

    .price-value {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1B3A5C;
    }

    .modal-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: auto;

      @media (min-width: 480px) {
        flex-direction: row;
      }
    }

    .btn-quote-modal {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: #2E86DE;
      color: #FFFFFF;
      font-size: 0.9375rem;
      font-weight: 700;
      padding: 0.85rem 1.25rem;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(46, 134, 222, 0.3);
      transition: all 0.2s ease;

      &:hover {
        background: #1B3A5C;
      }
    }

    .btn-cancel-modal {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.85rem 1.25rem;
      border-radius: 10px;
      background: #F1F5F9;
      color: #4B5563;
      border: none;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #E2E8F0;
        color: #1F2937;
      }
    }
  `]
})
export class CatalogComponent {
  activeCategory: CatalogCategory = 'todos';
  selectedProduct: CatalogProduct | null = null;

  categoryTabs: CategoryFilterTab[] = [
    { id: 'todos', label: 'Todos', icon: 'fas fa-th-large' },
    { id: 'computadoras', label: 'Computadoras', icon: 'fas fa-laptop' },
    { id: 'impresoras', label: 'Impresoras', icon: 'fas fa-print' },
    { id: 'toners', label: 'Tóners', icon: 'fas fa-tint' }
  ];

  products: CatalogProduct[] = [
    // COMPUTADORAS
    {
      id: 'dell-latitude-5550',
      name: 'Dell Latitude 5550',
      category: 'computadoras',
      categoryLabel: 'Computadora Portátil',
      description: 'Intel Core i7, 16GB RAM, 512GB SSD, 15.6" FHD',
      image: 'images/products/dell-latitude-5550.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Procesador Intel Core i7 de alto rendimiento',
        '16 GB RAM DDR5 para multitarea fluida',
        'Almacenamiento ultra rápido SSD 512GB NVMe',
        'Pantalla 15.6" Full HD antirreflejo',
        'Garantía oficial y soporte corporativo'
      ]
    },
    {
      id: 'hp-probook-450-g10',
      name: 'HP ProBook 450 G10',
      category: 'computadoras',
      categoryLabel: 'Computadora Portátil',
      description: 'Intel Core i5, 16GB RAM, 256GB SSD, 15.6"',
      image: 'images/products/hp-probook-450-g10.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Procesador Intel Core i5 empresarial',
        '16 GB memoria RAM expandible',
        'Unidad de estado sólido 256GB SSD PCIe',
        'Pantalla de 15.6 pulgadas con microbordes',
        'Chasis reforzado con estándar militar MIL-STD'
      ]
    },
    {
      id: 'lenovo-thinkpad-e14-gen-5',
      name: 'Lenovo ThinkPad E14 Gen 5',
      category: 'computadoras',
      categoryLabel: 'Computadora Portátil',
      description: 'AMD Ryzen 5, 8GB RAM, 256GB SSD',
      image: 'images/products/lenovo-thinkpad-e14-gen-5.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Procesador AMD Ryzen 5 con gráficos Radeon',
        '8 GB de memoria RAM DDR4',
        'SSD de 256GB formato M.2 NVMe',
        'Teclado ergonómico legendario ThinkPad',
        'Seguridad biométrica y chip TPM'
      ]
    },
    {
      id: 'dell-inspiron-16',
      name: 'Dell Inspiron 16',
      category: 'computadoras',
      categoryLabel: 'Computadora Portátil',
      description: 'Intel Core i7, 16GB RAM, 1TB SSD, 16" FHD+',
      image: 'images/products/dell-inspiron-16.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Procesador Intel Core i7 de última generación',
        '16 GB memoria RAM de alta velocidad',
        'Amplio almacenamiento SSD NVMe de 1 TB',
        'Pantalla espaciosa de 16" formato 16:10 FHD+',
        'Batería de larga duración con carga rápida'
      ]
    },

    // IMPRESORAS
    {
      id: 'hp-laserjet-pro-mfp-m428fdw',
      name: 'HP LaserJet Pro MFP M428fdw',
      category: 'impresoras',
      categoryLabel: 'Impresora Multifuncional',
      description: 'Impresora Multifuncional Láser',
      image: 'images/products/hp-laserjet-mfp-m428fdw.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Impresión, copiado, escaneado y fax de alta velocidad',
        'Velocidad de hasta 40 ppm en blanco y negro',
        'Impresión automática a doble cara',
        'Conexión Wi-Fi de doble banda y Ethernet Gigabit',
        'Seguridad dinámica integrada HP Wolf Pro'
      ]
    },
    {
      id: 'epson-ecotank-l3250',
      name: 'Epson EcoTank L3250',
      category: 'impresoras',
      categoryLabel: 'Impresora Multifuncional',
      description: 'Impresora Multifuncional Tinta Continua',
      image: 'images/products/epson-ecotank-l3250.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Sistema original de tanque de tinta EcoTank 100% sin cartuchos',
        'Costo de impresión ultra bajo por página',
        'Conectividad inalámbrica Wi-Fi y Wi-Fi Direct',
        'Aplicación Epson Smart Panel para control móvil',
        'Rendimiento de hasta 4.500 páginas en negro / 7.500 en color'
      ]
    },
    {
      id: 'brother-mfc-l2750dw',
      name: 'Brother MFC-L2750DW',
      category: 'impresoras',
      categoryLabel: 'Impresora Multifuncional',
      description: 'Impresora Láser Multifuncional',
      image: 'images/products/brother-mfc-l2750dw.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Impresión láser monocromática de hasta 36 ppm',
        'Escaneo y copiado a doble cara en una sola pasada',
        'Pantalla táctil a color de 2.7 pulgadas',
        'Conexión inalámbrica, Ethernet y NFC',
        'Bandeja de papel con capacidad para 250 hojas'
      ]
    },
    {
      id: 'hp-officejet-pro-9015e',
      name: 'HP OfficeJet Pro 9015e',
      category: 'impresoras',
      categoryLabel: 'Impresora Multifuncional',
      description: 'Impresora Multifuncional Inyección',
      image: 'images/products/hp-officejet-pro-9015e.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Velocidades de hasta 22 ppm en negro y 18 ppm en color',
        'Impresión y escaneo automático a doble cara',
        'Alimentador automático de documentos de 35 hojas',
        'Solución de impresión inteligente HP+ integrada',
        'Ideal para equipos de trabajo de 1 a 5 usuarios'
      ]
    },

    // TÓNERS
    {
      id: 'toner-hp-26a',
      name: 'Tóner HP 26A (CF226A)',
      category: 'toners',
      categoryLabel: 'Tóner Original',
      description: 'Compatible con HP LaserJet Pro',
      image: 'images/products/toner-hp-26a.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Cartucho de tóner original HP LaserJet negro',
        'Rendimiento promedio de 3.100 páginas estándar',
        'Tecnología JetIntelligence de alta precisión',
        'Impresiones nítidas con texto en negro uniforme',
        'Protección antifraude de fábrica'
      ]
    },
    {
      id: 'toner-brother-tn-2420',
      name: 'Tóner Brother TN-2420',
      category: 'toners',
      categoryLabel: 'Tóner Original',
      description: 'Alto rendimiento, 3000 páginas',
      image: 'images/products/toner-brother-tn2420.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Cartucho de tóner de alta capacidad original Brother',
        'Rendimiento de hasta 3.000 páginas según ISO/IEC 19752',
        'Formulación de tinta en polvo optimizada para nitidez',
        'Menor costo por página impresa',
        'Compatibilidad garantizada con equipos MFC y HL'
      ]
    },
    {
      id: 'toner-hp-58a',
      name: 'Tóner HP 58A (CF258A)',
      category: 'toners',
      categoryLabel: 'Tóner Original',
      description: 'Para HP LaserJet Pro',
      image: 'images/products/toner-hp-58a.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Cartucho de tóner original HP LaserJet negro con chip',
        'Rendimiento estimado de 3.000 páginas de texto nítido',
        'Compatibilidad directa con series M404, M428 y derivados',
        'Sostenibilidad ambiental con programa HP Planet Partners',
        'Máxima velocidad y fiabilidad de impresión'
      ]
    },
    {
      id: 'toner-epson-t664',
      name: 'Tóner Epson T664 Pack 4 colores',
      category: 'toners',
      categoryLabel: 'Pack Tintas / Suministros',
      description: 'Para EcoTank',
      image: 'images/products/toner-epson-t664.jpg',
      stock: 'Stock: 50+ unidades',
      price: 'Consultar',
      features: [
        'Pack completo de 4 botellas (Negro, Cian, Magenta, Amarillo)',
        'Botellas de 70 ml con sistema de llenado codificado',
        'Hasta 4.000 páginas en negro y 6.500 páginas a color',
        'Tinta genuina que protege los cabezales MicroPiezo',
        'Secado rápido y resistencia a la decoloración'
      ]
    }
  ];

  get filteredProducts(): CatalogProduct[] {
    if (this.activeCategory === 'todos') {
      return this.products;
    }
    return this.products.filter(item => item.category === this.activeCategory);
  }

  setCategory(category: CatalogCategory): void {
    this.activeCategory = category;
  }

  getCategoryCount(category: CatalogCategory): number {
    if (category === 'todos') {
      return this.products.length;
    }
    return this.products.filter(item => item.category === category).length;
  }

  openDetails(product: CatalogProduct): void {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden';
  }

  closeDetails(): void {
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }

  @HostListener('window:keydown.escape')
  onEscapePress(): void {
    if (this.selectedProduct) {
      this.closeDetails();
    }
  }

  quoteProduct(product: CatalogProduct): void {
    this.closeDetails();
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    const productField = document.getElementById('producto-interes') as HTMLInputElement | null;
    if (productField) {
      productField.value = product.name;
      productField.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
