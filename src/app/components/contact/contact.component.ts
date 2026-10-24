import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';

interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contacto" class="contact-section">
      <div class="contact-container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="badge">Atención Personalizada</span>
          <h2 class="section-title">¿Interesado en nuestros productos?</h2>
          <div class="gold-divider"></div>
          <p class="section-subtitle">Déjanos tu consulta y te responderemos a la brevedad</p>
        </div>

        <div class="contact-grid">
          <!-- LEFT COLUMN: Contact Information -->
          <div class="contact-info-column">
            <div class="info-card">
              <h3 class="info-title">
                <i class="fas fa-building"></i> Información de Contacto
              </h3>
              <p class="info-intro">
                Estamos listos para atender sus requerimientos industriales y comerciales con soluciones integrales de alta calidad.
              </p>

              <div class="info-items-list">
                <!-- 1. Correos Electrónicos -->
                <div class="info-item">
                  <div class="icon-wrapper">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="info-content">
                    <span class="info-label">Correos Electrónicos</span>
                    <a href="mailto:ventas@corporacionaraya.com" class="info-link">ventas&#64;corporacionaraya.com</a>
                    <a href="mailto:gerencia@corporacionaraya.com" class="info-link">gerencia&#64;corporacionaraya.com</a>
                  </div>
                </div>

                <!-- 2. Dirección -->
                <div class="info-item">
                  <div class="icon-wrapper">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="info-content">
                    <span class="info-label">Dirección</span>
                    <address class="info-text">
                      Barrio San Roque, Calle Fray Manuel Mingo, Calle Ballivian Nro. 747, Tarija, Bolivia
                    </address>
                  </div>
                </div>

                <!-- 3. Teléfono Fijo -->
                <div class="info-item">
                  <div class="icon-wrapper">
                    <i class="fas fa-phone"></i>
                  </div>
                  <div class="info-content">
                    <span class="info-label">Teléfono</span>
                    <a href="tel:+59146658723" class="info-link">466: 58723</a>
                  </div>
                </div>

                <!-- 4. Celular -->
                <div class="info-item">
                  <div class="icon-wrapper">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="info-content">
                    <span class="info-label">Celular</span>
                    <a href="tel:+59168222855" class="info-link">+591 68222855</a>
                  </div>
                </div>
              </div>

              <!-- Direct WhatsApp Button -->
              <div class="whatsapp-action">
                <a
                  href="https://wa.me/59168222855"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="whatsapp-btn"
                  aria-label="Escribir por WhatsApp a Corporación Araya"
                >
                  <i class="fab fa-whatsapp"></i>
                  <span>Escribir por WhatsApp</span>
                </a>
              </div>

              <!-- Tarija Bolivia Google Map Embed -->
              <div class="map-wrapper">
                <div class="map-header">
                  <i class="fas fa-map-marked-alt"></i>
                  <span>Ubicación en Tarija, Bolivia</span>
                </div>
                <iframe
                  title="Ubicación Corporación Araya en Tarija, Bolivia"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119286.03666249764!2d-64.78696841262804!3d-21.53325605051936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94064736183637e5%3A0x2db4ab1798363e8a!2sTarija%2C%20Bolivia!5e0!3m2!1ses!2sbo!4v1710000000000!5m2!1ses!2sbo"
                  width="100%"
                  height="220"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Contact Form -->
          <div class="contact-form-column">
            <div class="form-card">
              <h3 class="form-title">
                <i class="fas fa-paper-plane"></i> Envíanos un Mensaje
              </h3>
              <p class="form-intro">
                Completa el formulario y nuestro equipo comercial te responderá a la brevedad.
              </p>

              <!-- Success Notification State -->
              @if (submitSuccess) {
                <div class="status-alert success-alert" role="alert">
                  <div class="alert-icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                  <div class="alert-body">
                    <h4 class="alert-title">¡Mensaje enviado correctamente!</h4>
                    <p class="alert-text">
                      Gracias por comunicarte con Corporación Araya. Hemos recibido tu consulta y uno de nuestros ejecutivos se pondrá en contacto contigo muy pronto.
                    </p>
                    <button
                      type="button"
                      class="btn-reset"
                      (click)="resetForm(contactForm)"
                    >
                      <i class="fas fa-redo"></i> Enviar otro mensaje
                    </button>
                  </div>
                </div>
              }

              <!-- Error Notification State -->
              @if (submitError) {
                <div class="status-alert error-alert" role="alert">
                  <div class="alert-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                  </div>
                  <div class="alert-body">
                    <h4 class="alert-title">Error al enviar el mensaje</h4>
                    <p class="alert-text">{{ errorMessage }}</p>
                    <p class="alert-subtext">
                      También puedes escribirnos directamente a
                      <a href="mailto:ventas@corporacionaraya.com">ventas&#64;corporacionaraya.com</a>
                      o por WhatsApp al
                      <a href="https://wa.me/59168222855" target="_blank" rel="noopener noreferrer">+591 68222855</a>.
                    </p>
                  </div>
                </div>
              }

              <!-- Contact Form -->
              <form
                #contactForm="ngForm"
                (ngSubmit)="onSubmit(contactForm)"
                novalidate
                class="contact-form"
              >
                <!-- 1. Nombre Completo -->
                <div class="form-group">
                  <label for="nombre" class="form-label">
                    Nombre Completo <span class="required-indicator">*</span>
                  </label>
                  <div class="input-container">
                    <i class="fas fa-user input-icon"></i>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      [(ngModel)]="formData.nombre"
                      #nombreModel="ngModel"
                      required
                      minlength="3"
                      placeholder="Ej. Juan Pérez"
                      class="form-control"
                      [class.is-invalid]="nombreModel.invalid && (nombreModel.touched || contactForm.submitted)"
                    />
                  </div>
                  @if (nombreModel.invalid && (nombreModel.touched || contactForm.submitted)) {
                    <div class="validation-message">
                      <i class="fas fa-info-circle"></i>
                      @if (nombreModel.errors?.['required']) {
                        <span>El nombre completo es obligatorio.</span>
                      }
                      @if (nombreModel.errors?.['minlength']) {
                        <span>El nombre debe tener al menos 3 caracteres.</span>
                      }
                    </div>
                  }
                </div>

                <!-- 2. Correo Electrónico -->
                <div class="form-group">
                  <label for="email" class="form-label">
                    Correo Electrónico <span class="required-indicator">*</span>
                  </label>
                  <div class="input-container">
                    <i class="fas fa-envelope input-icon"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      [(ngModel)]="formData.email"
                      #emailModel="ngModel"
                      required
                      email
                      placeholder="nombre@ejemplo.com"
                      class="form-control"
                      [class.is-invalid]="emailModel.invalid && (emailModel.touched || contactForm.submitted)"
                    />
                  </div>
                  @if (emailModel.invalid && (emailModel.touched || contactForm.submitted)) {
                    <div class="validation-message">
                      <i class="fas fa-info-circle"></i>
                      @if (emailModel.errors?.['required']) {
                        <span>El correo electrónico es obligatorio.</span>
                      }
                      @if (emailModel.errors?.['email']) {
                        <span>Ingrese una dirección de correo válida.</span>
                      }
                    </div>
                  }
                </div>

                <!-- 3. Teléfono (Opcional) -->
                <div class="form-group">
                  <label for="telefono" class="form-label">
                    Teléfono / Celular <span class="optional-indicator">(Opcional)</span>
                  </label>
                  <div class="input-container">
                    <i class="fas fa-phone-alt input-icon"></i>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      [(ngModel)]="formData.telefono"
                      placeholder="Ej. +591 68222855"
                      class="form-control"
                    />
                  </div>
                </div>

                <!-- 4. Asunto -->
                <div class="form-group">
                  <label for="asunto" class="form-label">
                    Asunto <span class="required-indicator">*</span>
                  </label>
                  <div class="input-container select-wrapper">
                    <i class="fas fa-tag input-icon"></i>
                    <select
                      id="asunto"
                      name="asunto"
                      [(ngModel)]="formData.asunto"
                      required
                      class="form-control select-control"
                    >
                      <option value="Cotización de equipos">Cotización de equipos</option>
                      <option value="Consulta general">Consulta general</option>
                      <option value="Soporte técnico">Soporte técnico</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <i class="fas fa-chevron-down select-chevron"></i>
                  </div>
                </div>

                <!-- 5. Mensaje -->
                <div class="form-group">
                  <label for="mensaje" class="form-label">
                    Mensaje <span class="required-indicator">*</span>
                  </label>
                  <div class="input-container">
                    <i class="fas fa-comment-alt input-icon textarea-icon"></i>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      [(ngModel)]="formData.mensaje"
                      #mensajeModel="ngModel"
                      required
                      minlength="10"
                      rows="5"
                      placeholder="Describa los productos o servicios en los que tiene interés..."
                      class="form-control textarea-control"
                      [class.is-invalid]="mensajeModel.invalid && (mensajeModel.touched || contactForm.submitted)"
                    ></textarea>
                  </div>
                  @if (mensajeModel.invalid && (mensajeModel.touched || contactForm.submitted)) {
                    <div class="validation-message">
                      <i class="fas fa-info-circle"></i>
                      @if (mensajeModel.errors?.['required']) {
                        <span>El mensaje es obligatorio.</span>
                      }
                      @if (mensajeModel.errors?.['minlength']) {
                        <span>El mensaje debe contener al menos 10 caracteres.</span>
                      }
                    </div>
                  }
                </div>

                <!-- Submit Button -->
                <div class="form-actions">
                  <button
                    type="submit"
                    class="btn-submit"
                    [disabled]="isSubmitting"
                  >
                    @if (isSubmitting) {
                      <span class="spinner"></span>
                      <span>Enviando Mensaje...</span>
                    } @else {
                      <i class="fas fa-paper-plane"></i>
                      <span>Enviar Mensaje</span>
                    }
                  </button>
                </div>

                <div class="form-footer-note">
                  <i class="fas fa-shield-alt"></i>
                  <span>Tus datos están protegidos. Enviaremos tu consulta a ventas&#64; y gerencia&#64;corporacionaraya.com</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

    // Brand Palette Variables
    $color-navy: #1B3A5C;
    $color-blue: #2E86DE;
    $color-blue-hover: #1e6ec2;
    $color-gold: #C4963C;
    $color-dark: #0F172A;
    $color-gray: #6B7280;
    $color-light-gray: #94A3B8;
    $color-card-border: rgba(255, 255, 255, 0.1);
    $color-white: #FFFFFF;
    $color-whatsapp: #25D366;
    $color-whatsapp-hover: #1EBE5D;
    $color-success: #10B981;
    $color-error: #EF4444;

    :host {
      display: block;
      width: 100%;
    }

    .contact-section {
      width: 100%;
      min-height: 100vh;
      background: linear-gradient(135deg, $color-dark 0%, #162a42 50%, $color-navy 100%);
      color: $color-white;
      padding: 4rem 1rem;
      box-sizing: border-box;

      @media (min-width: 768px) {
        padding: 5rem 2rem;
      }

      @media (min-width: 1200px) {
        padding: 6rem 3rem;
      }
    }

    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    // Section Header
    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;

      .badge {
        display: inline-block;
        padding: 6px 16px;
        background: rgba(196, 150, 60, 0.15);
        border: 1px solid rgba(196, 150, 60, 0.4);
        color: $color-gold;
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        border-radius: 50px;
        margin-bottom: 1rem;
      }

      .section-title {
        color: $color-white;
        font-size: 2rem;
        font-weight: 800;
        line-height: 1.25;
        margin: 0 0 0.75rem 0;
        letter-spacing: -0.02em;

        @media (min-width: 768px) {
          font-size: 2.75rem;
        }
      }

      .gold-divider {
        width: 64px;
        height: 4px;
        background: $color-gold;
        border-radius: 2px;
        margin: 0 auto 1.25rem auto;
      }

      .section-subtitle {
        color: $color-light-gray;
        font-size: 1.1rem;
        max-width: 620px;
        margin: 0 auto;
        line-height: 1.6;

        @media (min-width: 768px) {
          font-size: 1.2rem;
        }
      }
    }

    // Two-Column Grid Layout (Mobile First)
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
      align-items: stretch;

      @media (min-width: 992px) {
        grid-template-columns: 1fr 1.15fr;
        gap: 3rem;
      }
    }

    // Shared Card Styles
    .info-card,
    .form-card {
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid $color-card-border;
      border-radius: 18px;
      padding: 1.75rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
      height: 100%;
      box-sizing: border-box;

      @media (min-width: 768px) {
        padding: 2.5rem;
      }
    }

    // Left Column: Contact Information
    .contact-info-column {
      .info-title {
        font-size: 1.6rem;
        font-weight: 700;
        color: $color-white;
        margin: 0 0 0.75rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;

        i {
          color: $color-gold;
          font-size: 1.35rem;
        }
      }

      .info-intro {
        color: $color-light-gray;
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 2rem;
      }

      .info-items-list {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        margin-bottom: 2rem;
      }

      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        transition: all 0.25s ease;

        &:hover {
          background: rgba(46, 134, 222, 0.08);
          border-color: rgba(46, 134, 222, 0.25);
          transform: translateX(4px);
        }

        .icon-wrapper {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(46, 134, 222, 0.15);
          border: 1px solid rgba(46, 134, 222, 0.3);
          color: $color-gold;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
        }

        .info-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex-grow: 1;

          .info-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: $color-gold;
            font-weight: 700;
          }

          .info-link {
            color: $color-white;
            text-decoration: none;
            font-size: 0.95rem;
            word-break: break-all;
            transition: color 0.2s ease;

            &:hover {
              color: $color-blue;
              text-decoration: underline;
            }
          }

          .info-text {
            color: $color-white;
            font-style: normal;
            font-size: 0.92rem;
            line-height: 1.45;
          }
        }
      }

      // WhatsApp Button
      .whatsapp-action {
        margin-bottom: 2rem;

        .whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 14px 20px;
          background: $color-whatsapp;
          color: $color-white;
          font-weight: 700;
          font-size: 1.05rem;
          border-radius: 10px;
          text-decoration: none;
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
          transition: all 0.3s ease;
          box-sizing: border-box;

          i {
            font-size: 1.35rem;
          }

          &:hover {
            background: $color-whatsapp-hover;
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(37, 211, 102, 0.45);
          }

          &:active {
            transform: translateY(0);
          }
        }
      }

      // Google Maps
      .map-wrapper {
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(0, 0, 0, 0.2);

        .map-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 10px 14px;
          background: rgba(27, 58, 92, 0.6);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.85rem;
          color: $color-light-gray;

          i {
            color: $color-gold;
          }
        }

        iframe {
          display: block;
          filter: contrast(95%) brightness(95%);
          transition: filter 0.3s ease;

          &:hover {
            filter: contrast(100%) brightness(100%);
          }
        }
      }
    }

    // Right Column: Contact Form
    .contact-form-column {
      .form-title {
        font-size: 1.6rem;
        font-weight: 700;
        color: $color-white;
        margin: 0 0 0.75rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;

        i {
          color: $color-blue;
          font-size: 1.3rem;
        }
      }

      .form-intro {
        color: $color-light-gray;
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 1.75rem;
      }

      // Status Alerts
      .status-alert {
        display: flex;
        gap: 1rem;
        padding: 1.25rem;
        border-radius: 12px;
        margin-bottom: 1.75rem;
        animation: fadeIn 0.4s ease-out;

        .alert-icon {
          font-size: 1.75rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .alert-body {
          flex-grow: 1;

          .alert-title {
            margin: 0 0 0.35rem 0;
            font-size: 1.1rem;
            font-weight: 700;
          }

          .alert-text {
            margin: 0 0 0.5rem 0;
            font-size: 0.92rem;
            line-height: 1.45;
          }

          .alert-subtext {
            margin: 0;
            font-size: 0.85rem;
            opacity: 0.9;

            a {
              color: inherit;
              font-weight: 600;
              text-decoration: underline;
            }
          }

          .btn-reset {
            margin-top: 0.75rem;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.35);
            color: $color-white;
            border-radius: 6px;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s ease;

            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }

        &.success-alert {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.45);
          color: #A7F3D0;

          .alert-icon {
            color: #34D399;
          }

          .alert-title {
            color: $color-white;
          }
        }

        &.error-alert {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.45);
          color: #FECACA;

          .alert-icon {
            color: #F87171;
          }

          .alert-title {
            color: $color-white;
          }
        }
      }

      // Form Elements
      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;

        .form-label {
          color: #E2E8F0;
          font-size: 0.92rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;

          .required-indicator {
            color: $color-gold;
            font-weight: 700;
          }

          .optional-indicator {
            color: $color-light-gray;
            font-size: 0.8rem;
            font-weight: 400;
          }
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;

          .input-icon {
            position: absolute;
            left: 14px;
            color: $color-light-gray;
            font-size: 0.95rem;
            pointer-events: none;
            transition: color 0.2s ease;

            &.textarea-icon {
              top: 16px;
            }
          }

          .form-control {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            color: $color-white;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            padding: 12px 16px 12px 42px;
            font-size: 0.95rem;
            font-family: inherit;
            line-height: 1.5;
            transition: all 0.25s ease;
            box-sizing: border-box;

            &::placeholder {
              color: rgba(255, 255, 255, 0.55);
            }

            &:focus {
              outline: none;
              border-color: $color-blue;
              background: rgba(255, 255, 255, 0.15);
              box-shadow: 0 0 0 3px rgba(46, 134, 222, 0.25);

              & ~ .input-icon,
              & ~ .select-chevron {
                color: $color-blue;
              }
            }

            &.is-invalid {
              border-color: $color-error;
              background: rgba(239, 68, 68, 0.08);

              &:focus {
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
              }
            }
          }

          .textarea-control {
            resize: vertical;
            min-height: 120px;
          }

          &.select-wrapper {
            position: relative;

            .select-control {
              appearance: none;
              -webkit-appearance: none;
              -moz-appearance: none;
              cursor: pointer;
              padding-right: 40px;

              option {
                background-color: $color-dark;
                color: $color-white;
                padding: 8px 12px;
              }
            }

            .select-chevron {
              position: absolute;
              right: 14px;
              color: $color-light-gray;
              font-size: 0.85rem;
              pointer-events: none;
              transition: color 0.2s ease;
            }
          }
        }

        .validation-message {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #FCA5A5;
          font-size: 0.82rem;
          margin-top: 0.4rem;

          i {
            font-size: 0.75rem;
          }
        }
      }

      // Submit Button
      .form-actions {
        margin-top: 0.5rem;

        .btn-submit {
          width: 100%;
          background-color: $color-blue;
          color: $color-white;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 14px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(46, 134, 222, 0.35);

          i {
            font-size: 1.05rem;
          }

          &:hover:not(:disabled) {
            background-color: $color-blue-hover;
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(46, 134, 222, 0.5);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }

          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
          }

          .spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: $color-white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
        }
      }

      .form-footer-note {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: $color-light-gray;
        font-size: 0.82rem;
        text-align: center;
        margin-top: 0.75rem;

        i {
          color: $color-gold;
        }
      }
    }

    // Keyframe Animations
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class ContactComponent {
  // Model data for the template-driven form
  formData: ContactFormData = {
    nombre: '',
    email: '',
    telefono: '',
    asunto: 'Cotización de equipos',
    mensaje: ''
  };

  // State flags
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  /**
   * Configuración de EmailJS (https://dashboard.emailjs.com/)
   * Instrucciones para producción:
   * 1. Crea una cuenta en https://www.emailjs.com/
   * 2. Agrega un Email Service (Gmail, Outlook, etc.) y obtén tu SERVICE_ID
   * 3. Crea una Plantilla de Correo (TEMPLATE_ID) con los parámetros:
   *    {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}
   *    Configura los destinatarios de la plantilla para enviar a:
   *    ventas@corporacionaraya.com y gerencia@corporacionaraya.com
   * 4. Obtén tu Public Key en Account > API Keys y sustitúyela abajo.
   */
  private readonly EMAILJS_SERVICE_ID = 'service_ib872ds';
  private readonly EMAILJS_TEMPLATE_ID = 'template_ckv845k';
  private readonly EMAILJS_PUBLIC_KEY = 'Gzee9y8kbnZXBHZ0r';

  /**
   * Handle form submission
   */
  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      // Mark all controls as touched so validation errors appear
      Object.keys(form.controls).forEach((field) => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';

    const templateParams = {
      from_name: this.formData.nombre,
      from_email: this.formData.email,
      phone: this.formData.telefono || 'No proporcionado',
      subject: this.formData.asunto,
      message: this.formData.mensaje,
      to_email_ventas: 'ventas@corporacionaraya.com',
      to_email_gerencia: 'gerencia@corporacionaraya.com'
    };

    try {
      // Attempt sending via EmailJS
      await emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        templateParams,
        this.EMAILJS_PUBLIC_KEY
      );

      this.submitSuccess = true;
      this.resetForm(form);
    } catch (error: any) {
      console.error('EmailJS error:', error);
      this.submitError = true;
      this.errorMessage =
        error?.text || 'Ocurrió un problema al enviar tu mensaje. Por favor intenta nuevamente o contáctanos directamente por WhatsApp.';
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Reset form and status
   */
  resetForm(form?: NgForm): void {
    if (form) {
      form.resetForm({
        asunto: 'Cotización de equipos'
      });
    }
    this.formData = {
      nombre: '',
      email: '',
      telefono: '',
      asunto: 'Cotización de equipos',
      mensaje: ''
    };
  }
}
