import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LoadStage {
  threshold: number;
  label: string;
}

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="preloader"
      [class.leaving]="isLeaving"
      role="status"
      aria-live="polite"
      aria-label="Cargando Corporación Araya"
    >
      <div class="bg-grid" aria-hidden="true"></div>
      <div class="glow glow-blue" aria-hidden="true"></div>
      <div class="glow glow-gold" aria-hidden="true"></div>

      <!-- Laptop + brand -->
      <div class="content">
        <div class="scene" aria-hidden="true">
          <div class="laptop">
            <div class="laptop-float">
              <!-- Lid / screen -->
              <div class="lid">
                <div class="lid-shell">
                  <div class="screen">
                    <div class="screen-inner">
                      <div class="screen-glow"></div>

                      <div class="screen-brand">
                        <span class="screen-brand-top">CORPORACIÓN</span>
                        <span class="screen-brand-bottom">ARAYA</span>
                      </div>

                      <div class="screen-lines">
                        <span class="line line-1"></span>
                        <span class="line line-2"></span>
                        <span class="line line-3"></span>
                      </div>

                      <div class="screen-chip">
                        <span class="chip-dot"></span>
                        PEDIDO EN PROCESO
                      </div>

                      <div class="screen-scan"></div>
                    </div>
                  </div>

                  <div class="lid-chin">
                    <span class="cam-dot"></span>
                  </div>
                </div>
              </div>

              <!-- Hinge -->
              <div class="hinge"></div>

              <!-- Keyboard deck -->
              <div class="deck">
                <div class="keys"></div>
                <div class="trackpad"></div>
                <div class="deck-glow"></div>
              </div>

              <!-- Base lip -->
              <div class="base"></div>
            </div>

            <div class="laptop-shadow"></div>
          </div>
        </div>

        <!-- Brand lockup -->
        <div class="brand">
          <h1 class="brand-name">
            CORPORACIÓN <span class="brand-gold">ARAYA</span>
          </h1>
          <p class="brand-sub">{{ statusMessage }}</p>
        </div>

        <!-- Progress -->
        <div class="progress-wrap">
          <div class="progress-track">
            <div class="progress-fill" [style.width.%]="progress"></div>
          </div>
          <div class="progress-meta">
            <span class="progress-label">Preparando tu equipamiento</span>
            <span class="progress-value">{{ progress }}%</span>
          </div>
        </div>
      </div>

      <div class="seam" aria-hidden="true"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .preloader {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% 35%, #34343A 0%, #26262A 45%, #1B1B1E 100%);
      font-family: var(--font-family, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      color: #FFFFFF;
      clip-path: inset(0 0 0 0);
      transition: clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1);
      -webkit-user-select: none;
      user-select: none;
    }

    .preloader.leaving {
      clip-path: inset(50% 0 50% 0);
    }

    /* ---------- Ambient background ---------- */
    .bg-grid {
      position: absolute;
      inset: -10%;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 54px 54px;
      mask-image: radial-gradient(circle at 50% 45%, rgba(0, 0, 0, 0.9), transparent 72%);
      -webkit-mask-image: radial-gradient(circle at 50% 45%, rgba(0, 0, 0, 0.9), transparent 72%);
      opacity: 0;
      animation: gridFade 1s ease-out forwards, gridDrift 14s linear infinite;
    }

    @keyframes gridFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes gridDrift {
      from { transform: translate3d(0, 0, 0); }
      to { transform: translate3d(54px, 54px, 0); }
    }

    .glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(110px);
      pointer-events: none;
      opacity: 0;
      animation: glowIn 1.6s ease-out 0.15s forwards;
    }

    .glow-blue {
      width: 480px;
      height: 480px;
      top: 12%;
      right: 14%;
      background: radial-gradient(circle, #2E86DE 0%, rgba(46, 134, 222, 0) 70%);
      opacity: 0;
    }

    .glow-gold {
      width: 380px;
      height: 380px;
      bottom: 8%;
      left: 14%;
      background: radial-gradient(circle, #C4963C 0%, rgba(196, 150, 60, 0) 70%);
      animation-delay: 0.35s;
    }

    @keyframes glowIn {
      from { opacity: 0; transform: scale(0.85); }
      to { opacity: 0.3; transform: scale(1); }
    }

    .preloader.leaving .glow-gold {
      opacity: 0.18;
    }

    /* ---------- Layout ---------- */
    .content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 1.5rem;
      transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .preloader.leaving .content {
      opacity: 0;
      transform: translateY(-14px) scale(0.96);
    }

    /* ---------- 3D laptop ---------- */
    .scene {
      perspective: 1100px;
      perspective-origin: 50% 30%;
      margin-bottom: 2.5rem;
    }

    .laptop {
      position: relative;
      width: 300px;
      height: 232px;
      transform-style: preserve-3d;
      transform: rotateX(7deg);
      opacity: 0;
      animation: laptopEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
    }

    @keyframes laptopEnter {
      from {
        opacity: 0;
        transform: rotateX(7deg) translateY(26px) scale(0.92);
      }
      to {
        opacity: 1;
        transform: rotateX(7deg) translateY(0) scale(1);
      }
    }

    .laptop-float {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      animation: float 4.5s ease-in-out 1s infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-7px); }
    }

    /* Lid */
    .lid {
      position: absolute;
      top: 0;
      left: 0;
      width: 300px;
      height: 190px;
      transform-origin: center bottom;
      transform-style: preserve-3d;
      transform: rotateX(-96deg);
      animation: lidOpen 1.15s cubic-bezier(0.22, 1.15, 0.32, 1) 0.35s forwards;
    }

    @keyframes lidOpen {
      0% { transform: rotateX(-96deg); }
      65% { transform: rotateX(5deg); }
      85% { transform: rotateX(-2deg); }
      100% { transform: rotateX(0deg); }
    }

    .lid-shell {
      position: absolute;
      inset: 0;
      border-radius: 11px 11px 3px 3px;
      background: linear-gradient(160deg, #31363f 0%, #22262d 45%, #171a20 100%);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.07) inset,
        0 -18px 40px rgba(46, 134, 222, 0.18);
      padding: 9px 9px 0 9px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    .screen {
      position: relative;
      flex: 1;
      border-radius: 5px;
      background: #070b12;
      padding: 4px;
      box-sizing: border-box;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.8) inset;
    }

    .screen-inner {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 3px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background:
        radial-gradient(circle at 50% 12%, rgba(46, 134, 222, 0.28), transparent 62%),
        linear-gradient(160deg, #0F172A 0%, #14293f 55%, #0a1220 100%);
      animation: screenBoot 1.2s ease-out 0.85s both;
    }

    @keyframes screenBoot {
      0% {
        filter: brightness(0.08) contrast(1.4);
        opacity: 0.35;
      }
      22% {
        filter: brightness(1.5) contrast(1);
        opacity: 1;
      }
      100% {
        filter: brightness(1) contrast(1);
        opacity: 1;
      }
    }

    .screen-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 45%, rgba(46, 134, 222, 0.2) 0%, transparent 70%);
      animation: screenPulse 3s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes screenPulse {
      0%, 100% { opacity: 0.45; }
      50% { opacity: 1; }
    }

    .screen-brand {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
      line-height: 1;
      margin-top: -4px;
    }

    .screen-brand-top {
      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.34em;
      color: rgba(255, 255, 255, 0.72);
    }

    .screen-brand-bottom {
      font-size: 21px;
      font-weight: 800;
      letter-spacing: 0.16em;
      background: linear-gradient(135deg, #FFFFFF 0%, #E7C988 45%, #C4963C 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: #C4963C;
    }

    .screen-lines {
      width: 62%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      position: relative;
      z-index: 2;
    }

    .line {
      height: 3px;
      border-radius: 2px;
      background: linear-gradient(90deg, rgba(46, 134, 222, 0.85), rgba(46, 134, 222, 0.1));
      transform-origin: left center;
      animation: linePulse 1.8s ease-in-out infinite;
    }

    .line-1 { width: 100%; }
    .line-2 { width: 78%; animation-delay: 0.18s; }
    .line-3 { width: 52%; animation-delay: 0.36s; }

    @keyframes linePulse {
      0%, 100% { opacity: 0.35; transform: scaleX(0.82); }
      50% { opacity: 1; transform: scaleX(1); }
    }

    .screen-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 7px;
      border-radius: 999px;
      border: 1px solid rgba(196, 150, 60, 0.55);
      background: rgba(196, 150, 60, 0.12);
      color: #E7C988;
      font-size: 5.5px;
      font-weight: 700;
      letter-spacing: 0.14em;
      white-space: nowrap;
    }

    .chip-dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #C4963C;
      box-shadow: 0 0 6px #C4963C;
      animation: chipBlink 1.1s ease-in-out infinite;
    }

    @keyframes chipBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.15; }
    }

    /* Screen refresh scan */
    .screen-scan {
      position: absolute;
      left: 0;
      right: 0;
      top: -40%;
      height: 40%;
      background: linear-gradient(180deg, transparent, rgba(46, 134, 222, 0.22), transparent);
      animation: scan 2.4s linear 1.4s infinite;
      pointer-events: none;
    }

    @keyframes scan {
      0% { top: -40%; }
      100% { top: 110%; }
    }

    /* Lid chin + webcam */
    .lid-chin {
      position: relative;
      height: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 11px;
    }

    .cam-dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #05070b;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
    }

    /* Hinge */
    .hinge {
      position: absolute;
      top: 188px;
      left: 6px;
      right: 6px;
      height: 3px;
      border-radius: 2px;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(46, 134, 222, 0.5), rgba(255, 255, 255, 0.05));
      box-shadow: 0 0 12px rgba(46, 134, 222, 0.4);
    }

    /* Keyboard deck */
    .deck {
      position: absolute;
      top: 190px;
      left: 5px;
      width: 290px;
      height: 44px;
      border-radius: 2px 2px 8px 8px;
      background: linear-gradient(180deg, #2a2f38 0%, #1e222a 60%, #16191f 100%);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
      overflow: hidden;
    }

    .keys {
      position: absolute;
      inset: 5px 8px 14px 8px;
      border-radius: 2px;
      background-image:
        repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.085) 0 11px, transparent 11px 14px),
        repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0 6px, transparent 6px 8px);
      background-color: rgba(0, 0, 0, 0.28);
      opacity: 0.9;
    }

    .trackpad {
      position: absolute;
      bottom: 3px;
      left: 50%;
      transform: translateX(-50%);
      width: 46px;
      height: 8px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.07);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
    }

    .deck-glow {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(46, 134, 222, 0.28) 50%, transparent 100%);
      animation: keyboardWave 2.6s ease-in-out 1.5s infinite;
    }

    @keyframes keyboardWave {
      0% { transform: translateX(-120%); opacity: 0; }
      25% { opacity: 1; }
      75% { opacity: 1; }
      100% { transform: translateX(120%); opacity: 0; }
    }

    /* Base lip */
    .base {
      position: absolute;
      top: 232px;
      left: 0;
      width: 300px;
      height: 10px;
      border-radius: 0 0 9px 9px;
      background: linear-gradient(180deg, #1a1d23 0%, #0d0f13 100%);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.05) inset,
        0 8px 18px rgba(0, 0, 0, 0.55);
    }

    .laptop-shadow {
      position: absolute;
      bottom: -26px;
      left: 50%;
      transform: translateX(-50%);
      width: 260px;
      height: 22px;
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(46, 134, 222, 0.3) 0%, rgba(0, 0, 0, 0.35) 55%, transparent 75%);
      filter: blur(9px);
      animation: shadowPulse 4.5s ease-in-out 1s infinite;
    }

    @keyframes shadowPulse {
      0%, 100% { opacity: 0.55; transform: translateX(-50%) scale(1); }
      50% { opacity: 0.8; transform: translateX(-50%) scale(0.94); }
    }

    /* ---------- Brand ---------- */
    .brand {
      text-align: center;
      margin-bottom: 1.9rem;
    }

    .brand-name {
      margin: 0 0 0.5rem 0;
      font-size: clamp(1.05rem, 2.6vw, 1.4rem);
      font-weight: 700;
      letter-spacing: 0.34em;
      text-transform: uppercase;
      color: #FFFFFF;
      opacity: 0;
      animation: brandIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
    }

    .brand-gold {
      background: linear-gradient(135deg, #FFFFFF 0%, #E7C988 45%, #C4963C 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: #C4963C;
    }

    @keyframes brandIn {
      from { opacity: 0; letter-spacing: 0.55em; transform: translateY(8px); }
      to { opacity: 1; letter-spacing: 0.34em; transform: translateY(0); }
    }

    .brand-sub {
      margin: 0;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.06em;
      color: #94A3B8;
      opacity: 0;
      animation: subIn 0.7s ease-out 1s forwards;
    }

    @keyframes subIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ---------- Progress ---------- */
    .progress-wrap {
      width: min(330px, 78vw);
      opacity: 0;
      animation: subIn 0.7s ease-out 0.9s forwards;
    }

    .progress-track {
      position: relative;
      height: 4px;
      width: 100%;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.09);
      overflow: hidden;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04);
    }

    .progress-fill {
      position: relative;
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #2E86DE 0%, #58A6EC 55%, #C4963C 100%);
      box-shadow: 0 0 14px rgba(46, 134, 222, 0.7);
      transition: width 0.16s linear;
      overflow: hidden;
    }

    .progress-fill::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
      transform: translateX(-100%);
      animation: sheen 1.3s linear infinite;
    }

    @keyframes sheen {
      to { transform: translateX(100%); }
    }

    .progress-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 0.65rem;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #64748B;
    }

    .progress-value {
      color: #C4963C;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.08em;
    }

    /* ---------- Exit seam ---------- */
    .seam {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 3;
      width: 0;
      height: 2px;
      transform: translate(-50%, -50%);
      background: linear-gradient(90deg, transparent, #C4963C 45%, #FFFFFF 50%, #C4963C 55%, transparent);
      filter: blur(0.5px);
      box-shadow: 0 0 22px rgba(196, 150, 60, 0.8);
      opacity: 0;
      transition: width 0.7s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.25s ease;
    }

    .preloader.leaving .seam {
      width: 120%;
      opacity: 1;
    }

    /* ---------- Responsive ---------- */
    @media (min-width: 1024px) {
      .scene {
        transform: scale(1.14);
        margin-bottom: 3.25rem;
      }

      .brand-name {
        font-size: 1.5rem;
      }

      .brand-sub {
        font-size: 0.85rem;
      }
    }

    @media (max-height: 640px) {
      .content {
        transform: scale(0.82);
      }

      .scene {
        margin-bottom: 1.5rem;
      }
    }

    @media (max-width: 420px) {
      .laptop {
        width: 232px;
        height: 188px;
      }

      .lid {
        width: 232px;
        height: 150px;
      }

      .lid-chin {
        height: 9px;
        flex-basis: 9px;
      }

      .hinge {
        top: 148px;
      }

      .deck {
        top: 150px;
        width: 224px;
        height: 34px;
      }

      .base {
        top: 180px;
        width: 232px;
        height: 8px;
      }

      .laptop-shadow {
        bottom: -18px;
        width: 208px;
      }

      .screen-brand-bottom {
        font-size: 17px;
      }

      .screen-chip {
        font-size: 5px;
      }
    }

    /* ---------- Reduced motion ---------- */
    @media (prefers-reduced-motion: reduce) {
      .lid,
      .content,
      .brand-name,
      .brand-sub,
      .progress-wrap,
      .laptop,
      .laptop-float,
      .bg-grid,
      .screen-scan,
      .deck-glow,
      .laptop-shadow,
      .progress-fill::after {
        animation: none !important;
      }

      .lid { transform: rotateX(0deg); }
      .laptop { opacity: 1; }
      .brand-name,
      .brand-sub,
      .progress-wrap,
      .bg-grid { opacity: 1; }
    }
  `]
})
export class PreloaderComponent implements OnDestroy {
  @Output() finished = new EventEmitter<void>();

  progress = 0;
  statusMessage = 'Iniciando sesión segura';
  isLeaving = false;

  private readonly reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private readonly totalDuration = this.reduceMotion ? 700 : 1600;
  private readonly holdBeforeExit = this.reduceMotion ? 200 : 320;
  private readonly exitDuration = this.reduceMotion ? 320 : 820;

  private readonly stages: LoadStage[] = [
    { threshold: 0, label: 'Verificando stock de equipos' },
    { threshold: 28, label: 'Configurando hardware' },
    { threshold: 58, label: 'Empaquetando tu pedido' },
    { threshold: 84, label: 'Despachando equipamiento' },
    { threshold: 100, label: 'Todo listo' }
  ];

  private frameId: number | null = null;
  private timers: ReturnType<typeof setTimeout>[] = [];
  private startTime = 0;

  constructor() {
    if (typeof document !== 'undefined') {
      document.body.classList.add('preloader-active');
    }
    this.runProgress();
  }

  ngOnDestroy(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers = [];

    if (typeof document !== 'undefined') {
      document.body.classList.remove('preloader-active');
    }
  }

  private runProgress(): void {
    if (typeof window === 'undefined') {
      this.finish();
      return;
    }

    this.startTime = window.performance.now();

    const step = (now: number): void => {
      const elapsed = now - this.startTime;
      const ratio = Math.min(1, elapsed / this.totalDuration);
      // Ease-out cubic: rápido al inicio, aterriza suave en 100%
      const eased = 1 - Math.pow(1 - ratio, 3);

      this.progress = Math.min(100, Math.round(eased * 100));
      this.statusMessage = this.resolveStage(this.progress);

      if (ratio < 1) {
        this.frameId = requestAnimationFrame(step);
      } else {
        this.frameId = null;
        this.progress = 100;
        this.statusMessage = this.resolveStage(100);
        this.scheduleExit();
      }
    };

    this.frameId = requestAnimationFrame(step);

    // Safety net: rAF se pausa en pestañas en segundo plano y el overlay
    // nunca debe quedar bloqueando la página.
    this.timers.push(
      setTimeout(() => {
        if (this.isLeaving) return;
        if (this.frameId !== null) {
          cancelAnimationFrame(this.frameId);
          this.frameId = null;
        }
        this.progress = 100;
        this.statusMessage = this.resolveStage(100);
        this.isLeaving = true;
        this.timers.push(setTimeout(() => this.finish(), this.exitDuration));
      }, this.totalDuration + this.holdBeforeExit + 900)
    );
  }

  private resolveStage(progress: number): string {
    let label = this.stages[0].label;
    for (const stage of this.stages) {
      if (progress >= stage.threshold) {
        label = stage.label;
      }
    }
    return label;
  }

  private scheduleExit(): void {
    const holdTimer = setTimeout(() => {
      this.isLeaving = true;
      const endTimer = setTimeout(() => this.finish(), this.exitDuration);
      this.timers.push(endTimer);
    }, this.holdBeforeExit);

    this.timers.push(holdTimer);
  }

  private finish(): void {
    this.finished.emit();
  }
}
