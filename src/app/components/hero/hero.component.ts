import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="inicio" class="hero-section">
      <!-- Background Ambient Glow Orbs -->
      <div class="ambient-glow glow-blue" aria-hidden="true"></div>
      <div class="ambient-glow glow-gold" aria-hidden="true"></div>
      <div class="ambient-grid" aria-hidden="true"></div>

      <div class="hero-container">
        <!-- Left Side: Text Content (~40% on Desktop) -->
        <div class="hero-content">
          <div class="hero-tagline">
            <span class="tagline-pulse"></span>
            <span class="tagline-text">TECNOLOGÍA • EQUIPOS • SUMINISTROS</span>
          </div>


          <div class="hero-logo-wrapper">
            <img
              src="images/logo-completo.png"
              alt="Corporación Araya"
              class="hero-logo"
            />
          </div>


          <p class="hero-subtitle">
            Tu aliado estratégico en soluciones tecnológicas para empresas e instituciones.
            Equipamiento de vanguardia, hardware empresarial y suministros con garantía certificada.
          </p>

          <div class="hero-cta-group">
            <a
              href="#catalogo"
              (click)="scrollTo('#catalogo', $event)"
              class="btn btn-primary"
              title="Explorar nuestro catálogo de productos"
            >
              <span>Ver Catálogo</span>
              <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>

            <a
              href="#contacto"
              (click)="scrollTo('#contacto', $event)"
              class="btn btn-outline"
              title="Contactar a nuestro equipo comercial"
            >
              <span>Contáctanos</span>
              <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </a>
          </div>

          <!-- Trust Badges -->
          <div class="hero-features">
            <div class="feature-item">
              <span class="feature-bullet">✓</span>
              <span>Garantía Oficial</span>
            </div>
            <div class="feature-item">
              <span class="feature-bullet">✓</span>
              <span>Soporte Técnico</span>
            </div>
            <div class="feature-item">
              <span class="feature-bullet">✓</span>
              <span>Cobertura Nacional</span>
            </div>
          </div>
        </div>

        <!-- Right Side: Three.js 3D Interactive Laptop (~60% on Desktop) -->
        <div class="hero-visual">
          <div #canvasContainer class="canvas-container"></div>

          <!-- Interactive 3D Badge -->
          <div class="interactive-hint" *ngIf="!isMobile">
            <svg class="hint-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <span>Mueve el cursor para interactuar en 3D</span>
          </div>

          <div class="interactive-hint mobile-hint" *ngIf="isMobile">
            <span class="pulse-dot"></span>
            <span>Vista 3D Interactiva</span>
          </div>
        </div>
      </div>

      <!-- Bottom Scroll Indicator -->
      <a
        href="#catalogo"
        (click)="scrollTo('#catalogo', $event)"
        class="scroll-indicator"
        aria-label="Desplazarse hacia abajo"
      >
        <span class="mouse-icon">
          <span class="wheel"></span>
        </span>
      </a>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
    }

    .hero-section {
      position: relative;
      width: 100%;
      min-height: 100vh;
      min-height: 100dvh;
      background: linear-gradient(135deg, #0F172A 0%, #132238 45%, #1B3A5C 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow-x: hidden;
      overflow-y: visible;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      padding: 2rem 0;
      box-sizing: border-box;
    }

    /* Ambient Background Effects */
    .ambient-glow {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      filter: blur(100px);
      z-index: 1;
      opacity: 0.28;
    }

    .glow-blue {
      width: 520px;
      height: 520px;
      background: radial-gradient(circle, #2E86DE 0%, rgba(46, 134, 222, 0) 70%);
      top: 15%;
      right: 5%;
    }

    .glow-gold {
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, #C4963C 0%, rgba(196, 150, 60, 0) 70%);
      bottom: 10%;
      left: 10%;
      opacity: 0.16;
    }

    .ambient-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
      z-index: 1;
    }

    /* Main Container */
    .hero-container {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 1360px;
      margin: 0 auto;
      padding: 2rem 3rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      box-sizing: border-box;
      min-height: calc(100vh - 4rem);
    }

    /* Left Side: Content (~40%) */
    .hero-content {
      flex: 0 0 42%;
      max-width: 580px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      z-index: 3;
    }

    .hero-tagline {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.4rem 0.9rem;
      background: rgba(196, 150, 60, 0.12);
      border: 1px solid rgba(196, 150, 60, 0.35);
      border-radius: 9999px;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(8px);
    }

    .tagline-pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #C4963C;
      box-shadow: 0 0 10px #C4963C;
      animation: pulse 2s infinite ease-in-out;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.3);
        opacity: 0.6;
      }
    }

    .tagline-text {
      color: #C4963C;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }


    /* Hero Logo */
    .hero-logo-wrapper {
      margin: 0 0 1.5rem 0;
      display: flex;
      align-items: center;
    }

    .hero-logo {
      width: 100%;
      max-width: 380px;
      height: auto;
      object-fit: contain;
      filter: brightness(1.15) drop-shadow(0 4px 24px rgba(46, 134, 222, 0.45));
      transition: filter 0.3s ease, transform 0.3s ease;
    }

    .hero-logo:hover {
      filter: brightness(1.25) drop-shadow(0 6px 32px rgba(46, 134, 222, 0.65));
      transform: scale(1.02);
    }



    .hero-subtitle {
      font-size: clamp(1rem, 1.2vw, 1.18rem);
      line-height: 1.65;
      color: #CBD5E1;
      margin: 0 0 2.2rem 0;
      max-width: 520px;
    }

    /* CTA Buttons */
    .hero-cta-group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.1rem;
      margin-bottom: 2.2rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      padding: 0.92rem 2rem;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      user-select: none;
      box-sizing: border-box;
    }

    .btn-icon {
      width: 18px;
      height: 18px;
      transition: transform 0.25s ease;
    }

    .btn-primary {
      background-color: #2E86DE;
      color: #FFFFFF;
      border: 2px solid #2E86DE;
      box-shadow: 0 6px 20px rgba(46, 134, 222, 0.35);
    }

    .btn-primary:hover {
      background-color: #1c6dc0;
      border-color: #1c6dc0;
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(46, 134, 222, 0.5);
    }

    .btn-primary:hover .btn-icon {
      transform: translateX(3px);
    }

    .btn-outline {
      background-color: transparent;
      color: #FFFFFF;
      border: 2px solid rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(4px);
    }

    .btn-outline:hover {
      background-color: rgba(255, 255, 255, 0.12);
      border-color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
    }

    /* Trust / Features Badges */
    .hero-features {
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      width: 100%;
    }

    .feature-item {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.86rem;
      font-weight: 500;
      color: #94A3B8;
    }

    .feature-bullet {
      color: #C4963C;
      font-weight: 700;
      font-size: 0.95rem;
    }

    /* Right Side: Three.js Visual (~60%) */
    .hero-visual {
      flex: 0 0 58%;
      position: relative;
      height: 620px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      overflow: visible;
    }

    .canvas-container {
      width: 100%;
      height: 100%;
      display: block;
      cursor: grab;
      overflow: visible;
    }

    .canvas-container canvas {
      display: block;
      overflow: visible;
    }

    .canvas-container:active {
      cursor: grabbing;
    }


    .interactive-hint {
      position: absolute;
      bottom: 20px;
      right: 30px;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.9rem;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      font-size: 0.76rem;
      color: #94A3B8;
      pointer-events: none;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    }

    .hint-icon {
      width: 14px;
      height: 14px;
      stroke: #2E86DE;
      animation: nudge 2s infinite ease-in-out;
    }

    @keyframes nudge {
      0%, 100% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(2px, -2px);
      }
    }

    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #2E86DE;
      box-shadow: 0 0 8px #2E86DE;
    }

    /* Scroll Down Indicator */
    .scroll-indicator {
      position: absolute;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      opacity: 0.7;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .scroll-indicator:hover {
      opacity: 1;
      transform: translateX(-50%) translateY(3px);
    }

    .mouse-icon {
      width: 22px;
      height: 36px;
      border: 2px solid rgba(255, 255, 255, 0.55);
      border-radius: 12px;
      position: relative;
    }

    .wheel {
      width: 4px;
      height: 8px;
      background-color: #C4963C;
      border-radius: 2px;
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      animation: wheelMove 2s infinite ease-in-out;
    }

    @keyframes wheelMove {
      0% {
        opacity: 0;
        transform: translateX(-50%) translateY(0);
      }
      40% {
        opacity: 1;
      }
      80%, 100% {
        opacity: 0;
        transform: translateX(-50%) translateY(12px);
      }
    }

    /* Tablet Proportions */
    @media screen and (max-width: 1024px) {
      .hero-container {
        padding: 2rem;
        gap: 1.5rem;
      }

      .hero-content {
        flex: 0 0 48%;
      }

      .hero-visual {
        flex: 0 0 52%;
        height: 500px;
      }

      .hero-title {
        font-size: 2.8rem;
      }
    }

    /* Mobile: 3D laptop beside the headline (two-column grid) */
    @media screen and (max-width: 768px) {
      .hero-section {
        min-height: auto;
        padding: 4.5rem 1rem 2rem 1rem;
      }

      .hero-container {
        display: grid;
        grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
        grid-template-areas:
          'tagline tagline'
          'logo visual'
          'subtitle subtitle'
          'cta cta'
          'features features';
        align-items: center;
        gap: 0.9rem 0.7rem;
        text-align: center;
        padding: 0.5rem 0;
        min-height: auto;
      }

      /* Flatten the wrapper so its children join the grid */
      .hero-content {
        display: contents;
      }

      .hero-tagline {
        grid-area: tagline;
        justify-self: center;
        max-width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.4rem;
        padding: 0.35rem 0.75rem;
        margin-bottom: 0.15rem;
      }

      .tagline-text {
        font-size: 0.64rem;
        letter-spacing: 0.09em;
        line-height: 1.35;
      }

      .hero-logo-wrapper {
        grid-area: logo;
        margin: 0;
        justify-content: center;
        align-self: center;
      }

      .hero-logo {
        max-width: 100%;
        margin: 0 auto;
      }

      .hero-visual {
        grid-area: visual;
        width: 100%;
        height: 210px;
        margin-top: 0;
        align-self: center;
      }

      .hero-subtitle {
        grid-area: subtitle;
        text-align: center;
        font-size: 0.97rem;
        line-height: 1.6;
        margin: 0.35rem 0 0.15rem 0;
        max-width: 100%;
      }

      .hero-cta-group {
        grid-area: cta;
        justify-content: center;
        width: 100%;
        gap: 0.7rem;
        margin-bottom: 0.5rem;
      }

      .btn {
        width: 100%;
        max-width: 320px;
      }

      .hero-features {
        grid-area: features;
        justify-content: center;
        gap: 0.4rem 0.65rem;
        padding-top: 0.9rem;
      }

      .feature-item {
        font-size: 0.7rem;
        gap: 0.3rem;
      }

      .interactive-hint {
        bottom: 0;
        right: 50%;
        transform: translateX(50%);
        font-size: 0.62rem;
        padding: 0.3rem 0.6rem;
      }

      .scroll-indicator {
        display: none;
      }
    }

    @media screen and (max-width: 480px) {
      .hero-visual {
        height: 195px;
      }

      .tagline-text {
        font-size: 0.58rem;
        letter-spacing: 0.06em;
      }

      .hero-subtitle {
        font-size: 0.92rem;
      }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false })
  private canvasContainer!: ElementRef<HTMLDivElement>;

  // Three.js Core
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private laptopGroup!: THREE.Group;
  private clock = new THREE.Clock();
  private animationFrameId: number | null = null;
  private controls!: OrbitControls;

  // Interaction State
  isMobile = false;
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  // Default Laptop Orientations
  private readonly defaultRotationX = 0.22; // Slight downward view to expose keyboard & screen
  private readonly defaultRotationY = -0.42; // ~24 deg tilt for depth showcase

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.checkIsMobile();
    this.initThree();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }

    if (this.scene) {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry) {
            child.geometry.dispose();
          }
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => this.disposeMaterial(mat));
            } else {
              this.disposeMaterial(child.material);
            }
          }
        }
      });
    }
  }

  private disposeMaterial(mat: THREE.Material): void {
    mat.dispose();
    const standardMat = mat as THREE.MeshStandardMaterial;
    if (standardMat.map) standardMat.map.dispose();
    if (standardMat.emissiveMap) standardMat.emissiveMap.dispose();
    if (standardMat.normalMap) standardMat.normalMap.dispose();
    if (standardMat.roughnessMap) standardMat.roughnessMap.dispose();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window === 'undefined') return;
    this.checkIsMobile();

    if (!this.canvasContainer || !this.renderer || !this.camera) return;

    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    this.camera.aspect = width / height;
    this.camera.position.z = this.resolveCameraDistance(width, height);
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isMobile || typeof window === 'undefined') return;

    // Normalize mouse coordinates to -1 ... 1
    this.targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouseY = (event.clientY / window.innerHeight) * 2 - 1;
  }

  private checkIsMobile(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  /**
   * Pulls the camera back when the canvas is narrow/portrait so the whole
   * laptop stays inside the frame (used by the mobile side-by-side layout).
   */
  private resolveCameraDistance(width: number, height: number): number {
    const aspect = width / Math.max(height, 1);
    if (!this.isMobile) {
      return 6.0;
    }
    // Narrow (portrait) canvas: only nudge back if it gets really skinny
    return 5.3 * THREE.MathUtils.clamp(0.8 / aspect, 1, 1.18);
  }

  /**
   * Initializes the Three.js scene, camera, lights, and laptop model.
   */
  private initThree(): void {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera — wider FOV + further back so entire laptop fits in frame
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    this.camera.position.set(0, 0.8, this.resolveCameraDistance(width, height));
    this.camera.lookAt(0, 0.35, 0);

    // 3. Renderer with Alpha support for transparent background
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    container.appendChild(this.renderer.domElement);

    // OrbitControls for interactive rotation
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enablePan = false;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 10;
    this.controls.update();

    // 4. Lights
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    // Point Light 1: White from top
    const topLight = new THREE.PointLight(0xffffff, 3.8, 25);
    topLight.position.set(2, 6, 3.5);
    this.scene.add(topLight);

    // Point Light 2: Blue from side
    const blueLight = new THREE.PointLight(0x2E86DE, 4.5, 25);
    blueLight.position.set(-5, 2, 2.5);
    this.scene.add(blueLight);

    // Accent Point Light: Warm Gold rim light
    const goldLight = new THREE.PointLight(0xC4963C, 2.2, 18);
    goldLight.position.set(4, -1, 2);
    this.scene.add(goldLight);

    // Soft Directional Light for clean highlights
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(0, 7, 5);
    this.scene.add(dirLight);

    // 5. Build 3D Laptop Model
    this.buildLaptopModel();
  }

  /**
   * Constructs the full 3D laptop geometry, materials, and textures.
   */
  private buildLaptopModel(): void {
    this.laptopGroup = new THREE.Group();

    // ==========================================
    // A) Base: BoxGeometry(3, 0.15, 2)
    // Dark metallic material (MeshStandardMaterial, color: #2a2a2a, metalness: 0.8, roughness: 0.3)
    // ==========================================
    const baseGeo = new THREE.BoxGeometry(3, 0.15, 2);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.8,
      roughness: 0.3
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, 0, 0);
    this.laptopGroup.add(baseMesh);

    // Front edge chamfer notch for opening lid
    const notchGeo = new THREE.BoxGeometry(0.5, 0.04, 0.03);
    const notchMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      metalness: 0.9,
      roughness: 0.2
    });
    const notchMesh = new THREE.Mesh(notchGeo, notchMat);
    notchMesh.position.set(0, 0.06, 1.0);
    this.laptopGroup.add(notchMesh);

    // Bottom rubber feet
    const footGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16);
    const footMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const footCoords = [
      [-1.3, -0.08, -0.8],
      [1.3, -0.08, -0.8],
      [-1.3, -0.08, 0.8],
      [1.3, -0.08, 0.8]
    ];
    footCoords.forEach(([x, y, z]) => {
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(x, y, z);
      this.laptopGroup.add(foot);
    });

    // ==========================================
    // D) Keyboard area: Small boxes or subtle texture
    // ==========================================
    // Keyboard well/recess
    const keyboardWellGeo = new THREE.BoxGeometry(2.5, 0.015, 1.05);
    const keyboardWellMat = new THREE.MeshStandardMaterial({
      color: 0x191c22,
      metalness: 0.6,
      roughness: 0.65
    });
    const keyboardWell = new THREE.Mesh(keyboardWellGeo, keyboardWellMat);
    keyboardWell.position.set(0, 0.078, -0.2);
    this.laptopGroup.add(keyboardWell);

    // Keyboard keys texture plane
    const keyboardTex = this.createKeyboardTexture();
    const keyboardPlaneGeo = new THREE.PlaneGeometry(2.46, 1.0);
    const keyboardPlaneMat = new THREE.MeshStandardMaterial({
      map: keyboardTex,
      roughness: 0.5,
      metalness: 0.35,
      emissive: 0x1b3a5c,
      emissiveIntensity: 0.2
    });
    const keyboardPlane = new THREE.Mesh(keyboardPlaneGeo, keyboardPlaneMat);
    keyboardPlane.rotation.x = -Math.PI / 2;
    keyboardPlane.position.set(0, 0.086, -0.2);
    this.laptopGroup.add(keyboardPlane);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.9, 0.01, 0.58);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x2d3440,
      metalness: 0.65,
      roughness: 0.35
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.08, 0.55);
    this.laptopGroup.add(trackpad);

    // ==========================================
    // B) Screen & Hinge
    // Screen: BoxGeometry(2.8, 1.8, 0.08) at ~110 degrees
    // C) Screen face: A plane with blue gradient (emissive glow)
    // ==========================================
    const screenPivotGroup = new THREE.Group();
    screenPivotGroup.position.set(0, 0.075, -1.0); // Hinge location at back edge

    // Hinge cylinder
    const hingeGeo = new THREE.CylinderGeometry(0.045, 0.045, 2.7, 16);
    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x1f2329,
      metalness: 0.9,
      roughness: 0.25
    });
    const hinge = new THREE.Mesh(hingeGeo, hingeMat);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0, 0);
    screenPivotGroup.add(hinge);

    // Screen Lid Back & Frame: BoxGeometry(2.8, 1.8, 0.08)
    const screenLidGeo = new THREE.BoxGeometry(2.8, 1.8, 0.08);
    const screenLidMat = new THREE.MeshStandardMaterial({
      color: 0x22242a,
      metalness: 0.85,
      roughness: 0.28
    });
    const screenLid = new THREE.Mesh(screenLidGeo, screenLidMat);
    screenLid.position.set(0, 0.9, -0.04);
    screenPivotGroup.add(screenLid);

    // Screen Face (Display): Plane with blue gradient & emissive glow
    const screenFaceGeo = new THREE.PlaneGeometry(2.65, 1.65);
    const screenTex = this.createScreenTexture();
    const screenFaceMat = new THREE.MeshStandardMaterial({
      map: screenTex,
      emissive: 0x1e3a8a,
      emissiveMap: screenTex,
      emissiveIntensity: 0.48,
      roughness: 0.22,
      metalness: 0.1
    });
    const screenFace = new THREE.Mesh(screenFaceGeo, screenFaceMat);
    screenFace.position.set(0, 0.9, 0.002);
    screenPivotGroup.add(screenFace);

    // Subtle webcam dot & indicator LED on screen top bezel
    const cameraDotGeo = new THREE.CircleGeometry(0.012, 16);
    const cameraDotMat = new THREE.MeshBasicMaterial({ color: 0x07080a });
    const cameraDot = new THREE.Mesh(cameraDotGeo, cameraDotMat);
    cameraDot.position.set(0, 1.74, 0.003);
    screenPivotGroup.add(cameraDot);

    const ledDotGeo = new THREE.CircleGeometry(0.004, 8);
    const ledDotMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const ledDot = new THREE.Mesh(ledDotGeo, ledDotMat);
    ledDot.position.set(0.032, 1.74, 0.003);
    screenPivotGroup.add(ledDot);

    // Back logo for premium 3D rotations
    const backLogoGeo = new THREE.PlaneGeometry(0.45, 0.45);
    const backLogoTex = this.createBackLogoTexture();
    const backLogoMat = new THREE.MeshStandardMaterial({
      map: backLogoTex,
      transparent: true,
      roughness: 0.35,
      metalness: 0.85
    });
    const backLogo = new THREE.Mesh(backLogoGeo, backLogoMat);
    backLogo.rotation.y = Math.PI;
    backLogo.position.set(0, 0.9, -0.082);
    screenPivotGroup.add(backLogo);

    // Set screen tilt to ~110 degrees from closed base (tilted ~20 deg back from vertical)
    screenPivotGroup.rotation.x = -THREE.MathUtils.degToRad(20);

    this.laptopGroup.add(screenPivotGroup);

    // Initial Laptop Rotation for showcase
    this.laptopGroup.rotation.x = this.defaultRotationX;
    this.laptopGroup.rotation.y = this.defaultRotationY;

    this.scene.add(this.laptopGroup);
  }

  /**
   * Generates a high-resolution canvas texture for the glowing laptop screen.
   */
  private createScreenTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Deep Dark Navy Background
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 640);
    bgGrad.addColorStop(0, '#0F172A');
    bgGrad.addColorStop(0.4, '#1B3A5C');
    bgGrad.addColorStop(1, '#0A111F');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 640);

    // Background Cyber Grid
    ctx.strokeStyle = 'rgba(46, 134, 222, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 640);
      ctx.stroke();
    }
    for (let y = 0; y < 640; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Top Window Header Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(0, 0, 1024, 46);

    // Window Dots
    const dots = [
      { x: 30, color: '#EF4444' },
      { x: 50, color: '#F59E0B' },
      { x: 70, color: '#10B981' }
    ];
    dots.forEach((dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, 23, 5, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.fill();
    });

    // Browser URL / App Title Pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    this.roundRect(ctx, 332, 9, 360, 28, 14);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🔒 corporacionaraya.com • Soluciones TI', 512, 27);

    // Gold Tagline Badge
    ctx.fillStyle = 'rgba(196, 150, 60, 0.16)';
    ctx.strokeStyle = '#C4963C';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, 362, 85, 300, 32, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#C4963C';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('SOLUCIONES CORPORATIVAS TI', 512, 106);

    // Main Brand Heading
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 42px system-ui, sans-serif';
    ctx.fillText('CORPORACIÓN ARAYA', 512, 172);

    // Subtitle
    ctx.fillStyle = '#94A3B8';
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText('Equipamiento de Cómputo • Redes & Servidores • Suministros Empresariales', 512, 212);

    // Glowing Divider Line
    const lineGrad = ctx.createLinearGradient(160, 238, 864, 238);
    lineGrad.addColorStop(0, 'rgba(46, 134, 222, 0)');
    lineGrad.addColorStop(0.5, '#2E86DE');
    lineGrad.addColorStop(1, 'rgba(46, 134, 222, 0)');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(160, 238);
    ctx.lineTo(864, 238);
    ctx.stroke();

    // 3 Cards Layout
    const cards = [
      { title: '💻 Hardware Premium', desc: 'Laptops y workstations empresariales', tag: 'Alta Gama' },
      { title: '🛡️ Garantía & Soporte', desc: 'Asesoría técnica corporativa inmediata', tag: '100% Calidad' },
      { title: '📦 Suministros TI', desc: 'Stock permanente y logística ágil', tag: 'Nacional' }
    ];

    cards.forEach((card, idx) => {
      const cardX = 72 + idx * 300;
      const cardY = 265;
      const cardW = 280;
      const cardH = 180;

      // Card Background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      this.roundRect(ctx, cardX, cardY, cardW, cardH, 12);
      ctx.fill();

      // Card Border with subtle glow
      ctx.strokeStyle = idx === 1 ? '#C4963C' : 'rgba(46, 134, 222, 0.4)';
      ctx.lineWidth = 1.5;
      this.roundRect(ctx, cardX, cardY, cardW, cardH, 12);
      ctx.stroke();

      // Card Content
      ctx.textAlign = 'left';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText(card.title, cardX + 20, cardY + 45);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px system-ui, sans-serif';
      ctx.fillText(card.desc, cardX + 20, cardY + 80, cardW - 40);

      // Card Badge
      ctx.fillStyle = idx === 1 ? 'rgba(196, 150, 60, 0.25)' : 'rgba(46, 134, 222, 0.2)';
      this.roundRect(ctx, cardX + 20, cardY + 120, 110, 28, 14);
      ctx.fill();
      ctx.fillStyle = idx === 1 ? '#C4963C' : '#60A5FA';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(card.tag, cardX + 75, cardY + 138);
    });

    // Bottom Stats / Metrics Bar
    ctx.fillStyle = 'rgba(27, 58, 92, 0.45)';
    this.roundRect(ctx, 72, 475, 880, 95, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(46, 134, 222, 0.3)';
    ctx.lineWidth = 1;
    this.roundRect(ctx, 72, 475, 880, 95, 12);
    ctx.stroke();

    const metrics = [
      { val: '+500', lab: 'Empresas Atendidas' },
      { val: '24/7', lab: 'Soporte Corporativo' },
      { val: '100%', lab: 'Garantía Oficial' },
      { val: 'Perú', lab: 'Cobertura Nacional' }
    ];

    metrics.forEach((m, idx) => {
      const x = 72 + 110 + idx * 220;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.fillText(m.val, x, 518);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(m.lab, x, 545);
    });

    // Screen Glow Edge
    ctx.strokeStyle = '#2E86DE';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 1024, 640);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }

  /**
   * Generates keyboard key layout texture.
   */
  private createKeyboardTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 420;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Keyboard well background
    ctx.fillStyle = '#14171d';
    ctx.fillRect(0, 0, 1024, 420);

    const rowCount = 5;
    const startY = 18;
    const rowHeight = 65;
    const gap = 12;

    for (let r = 0; r < rowCount; r++) {
      const y = startY + r * (rowHeight + gap);

      if (r === 4) {
        // Spacebar row
        ctx.fillStyle = '#1e242c';
        this.roundRect(ctx, 25, y, 90, rowHeight, 6);
        ctx.fill();
        this.roundRect(ctx, 125, y, 90, rowHeight, 6);
        ctx.fill();
        this.roundRect(ctx, 225, y, 90, rowHeight, 6);
        ctx.fill();

        // Spacebar
        ctx.fillStyle = '#222933';
        this.roundRect(ctx, 325, y, 380, rowHeight, 6);
        ctx.fill();
        ctx.strokeStyle = 'rgba(46, 134, 222, 0.35)';
        ctx.lineWidth = 1;
        this.roundRect(ctx, 325, y, 380, rowHeight, 6);
        ctx.stroke();

        // Right side keys
        ctx.fillStyle = '#1e242c';
        this.roundRect(ctx, 715, y, 85, rowHeight, 6);
        ctx.fill();
        this.roundRect(ctx, 810, y, 85, rowHeight, 6);
        ctx.fill();
        this.roundRect(ctx, 905, y, 95, rowHeight, 6);
        ctx.fill();
      } else {
        const keysInRow = r === 0 ? 14 : 13;
        const keyW = (1024 - 40 - (keysInRow - 1) * gap) / keysInRow;

        for (let k = 0; k < keysInRow; k++) {
          const x = 20 + k * (keyW + gap);
          ctx.fillStyle = '#1e242c';
          this.roundRect(ctx, x, y, keyW, rowHeight, 6);
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          this.roundRect(ctx, x, y, keyW, rowHeight, 6);
          ctx.stroke();

          // Subtle backlit letter placeholder
          ctx.fillStyle = 'rgba(46, 134, 222, 0.32)';
          ctx.fillRect(x + keyW / 2 - 5, y + rowHeight / 2 - 2, 10, 4);
        }
      }
    }

    return new THREE.CanvasTexture(canvas);
  }

  /**
   * Generates back logo emblem texture.
   */
  private createBackLogoTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.clearRect(0, 0, 256, 256);

    // Gold chevron / geometric 'A' emblem
    ctx.strokeStyle = '#C4963C';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(128, 45);
    ctx.lineTo(195, 175);
    ctx.lineTo(162, 175);
    ctx.lineTo(128, 105);
    ctx.lineTo(94, 175);
    ctx.lineTo(61, 175);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ARAYA', 128, 220);

    return new THREE.CanvasTexture(canvas);
  }

  /**
   * Helper to draw rounded rectangles on 2D canvas context.
   */
  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /**
   * Animation & Render Loop
   */
  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    const elapsedTime = this.clock.getElapsedTime();

    if (this.laptopGroup) {
      // 1. Subtle Sinusoidal Floating Animation
      this.laptopGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // 2. Rotation control
      if (this.isMobile) {
        // Mobile: gentle front-facing sway so the glowing screen stays visible
        this.laptopGroup.rotation.y =
          this.defaultRotationY + Math.sin(elapsedTime * 0.45) * 0.5;
        this.laptopGroup.rotation.x = this.defaultRotationX + Math.sin(elapsedTime * 1.0) * 0.04;
      } else {
        // Desktop: Smooth lerp tracking mouse position
        // Clamp to ±15 deg horizontal (0.26 rad) and ±10 deg vertical (0.17 rad)
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

        const maxRadH = 15 * (Math.PI / 180);
        const maxRadV = 10 * (Math.PI / 180);

        const targetRotY = this.defaultRotationY + this.mouseX * maxRadH;
        const targetRotX = this.defaultRotationX + this.mouseY * maxRadV;

        this.laptopGroup.rotation.y += (targetRotY - this.laptopGroup.rotation.y) * 0.06;
        this.laptopGroup.rotation.x += (targetRotX - this.laptopGroup.rotation.x) * 0.06;
      }
    }

    if (this.controls) {
      this.controls.update();
    }
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  /**
   * Smoothly scrolls to target section.
   */
  scrollTo(targetId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const cleanId = targetId.replace('#', '');
    const element = document.getElementById(cleanId) || document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = targetId;
    }
  }
}
