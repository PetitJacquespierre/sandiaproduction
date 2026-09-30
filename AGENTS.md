# 🍉 AGENTS.md — GUÍA OPERATIVA & DIRECTRICES TÉCNICAS (SANDÍA PRODUCTION)

> **Archivo maestro para agentes de IA y desarrolladores de Grow Studio Agency.**  
> Define el alcance comercial, responsabilidades técnicas y directrices de mantenimiento mensual para la plataforma web de **Sandía Production**.

---

## 🏢 1. IDENTIDAD DEL PROYECTO & ALIANZA COMERCIAL
* **Cliente / Marca:** Sandía Production (Dehivi Gonzalez — V-16.314.604-1).
* **Desarrollador & Aliado Tecnológico:** Grow Studio Agency (`https://growstudioweb.vercel.app/`).
* **Tipo de Plataforma:** Portal Web Dinámico de Eventos Deportivos, Coberturas Audiovisuales y Calendario Runner Nacional (PWA).
* **Repositorio GitHub:** `https://github.com/PetitJacquespierre/SandiaProduction.git` (Rama `main`).
* **Hosting / Despliegue:** Vercel (Despliegue continuo con cada commit a `main`).
* **Dominio Oficial:** `https://www.sandiaproduction.com/` (Custodiado por Grow Studio).

---

## 💰 2. CONDICIONES ECONÓMICAS & ESTADO DE CUENTA
Documentado oficialmente en la Cotización `COT-001-Sandia-Sep2026` y Recibo `REC-1042`:

1. **Desarrollo Inicial de la Plataforma (Tarifa Alianza Estratégica):**
   * **Costo Total:** **$200.00 USD** (Valor regular: $350 USD).
   * **Abono Inicial Recibido:** **$50.00 USD** (Pagado en Bs. a tasa BCV el 10/09/2026 — Recibo `REC-1042`).
   * **Saldo Pendiente de Desarrollo:** **$150.00 USD**.

2. **Plan de Mantenimiento & Gestión Operativa Mensual:**
   * **Tarifa Mensual Alianza:** **$20.00 USD / mes** (Valor regular: $50 USD/mes).
   * **Cortesía de Inicio:** **1er mes 100% bonificado ($0)**.
   * **Fecha de facturación:** Mensual recurrente acordada tras la entrega de la Fase 1.

3. **Renovación Anual de Infraestructura (A partir del Año 2):**
   * **Costo Anual:** **$35.00 USD / año** (Cubre renovación de dominio `.com`, certificados SSL y red CDN de alta velocidad).

---

## ⚡ 3. DIFERENCIA CLAVE: MANTENIMIENTO WEB DE EVENTOS VS. SAAS
Cualquier agente que trabaje en este proyecto debe entender la naturaleza del servicio:

* **NO es un SaaS tradicional:** Un SaaS (ej. los menús digitales para restaurantes) vende una licencia de software estandarizada con cobro por uso/local y soporte de carritos/pedidos automáticos.
* **ES un Portal de Gestión Operativa y Contenido Vivo:** Sandía Production requiere una alianza activa donde Grow Studio actúa como su **departamento técnico y de marketing digital externo**. El valor no está en "alojar archivos", sino en la continua actualización y blindaje de cada carrera.

---

## 🛠️ 4. LOS 5 PILARES DEL MANTENIMIENTO MENSUAL ($20/MES)
Todo mantenimiento mensual realizado por Grow Studio debe cumplir y registrar estos 5 pilares:

### Pilar 1: Montaje de Eventos Propios de Sandía Production
* Creación y adaptación de landings específicas (ej. `paraguanahorror.html`, `coffeerun.html`).
* Creación y conexión de formularios inteligentes con base de datos (Google Sheets / Firebase) y alertas directas por correo electrónico o WhatsApp.
* **Sin costo adicional de desarrollo** para eventos propios de Sandía.

### Pilar 2: Actualización Semanal del Cronograma "RunFree"
* Carga de la rutina deportiva semanal de la comunidad oficial (Martes a Domingo) desde los flyers enviados por el cliente.
* Actualización de distancias, horarios, lugares de encuentro y eventos destacados de fondo.

### Pilar 3: Mantenimiento del Calendario Runner Nacional
* Inclusión y actualización periódica de 2 a 3 eventos de relevancia nacional/regional (ej. *Gatorade Caracas Rock*, *Nike Run Caracas*, etc.) para mantener a Sandía como el directorio de referencia de carreras.

### Pilar 4: Soporte Continuo, Seguridad & CDN
* Monitoreo de disponibilidad 24/7 (Zero Downtime).
* Mantenimiento de certificados SSL y custodia del dominio `.com`.
* Respaldos periódicos de bases de datos y scripts de Apps Script / Firebase.

### Pilar 5: Auditoría Técnica Preventiva Mensual (Sello de Calidad Grow Studio)
Tal como se implementó en el informe `AUD-2026-09`, cada mes se debe auditar:
1. **Blindaje Anti-Bot & Honeypot:** Mantener activos campos trampa invisibles (`_gotcha`) en los formularios para evitar registros basura o ataques spam.
2. **Rendimiento Móvil & Carga Rápida:** Optimización de peso de imágenes, compresión de flyers, posters de videos y lazy loading (`loading="lazy"`) para apertura instantánea en conexiones 3G/4G móviles.
3. **Auditoría de Enlaces & Embudo de Conversión:** Verificar que no existan botones huérfanos (`#`) y que todas las rutas de WhatsApp, Instagram y pago funcionen sin fugas.
4. **Sincronización BCV en Tiempo Real:** Validar que la API de la Tasa Oficial del Banco Central de Venezuela responda correctamente para cálculos automáticos en Bolívares.

---

## 📌 5. REGLAS PARA MODIFICAR ESTE REPOSITORIO
1. **Minúsculas estrictas en archivos:** Todo archivo en `/img/` debe guardarse con extensión y nombre en minúsculas (ej. `runfreelogo.png`, jamás `.PNG`) para compatibilidad total con servidores Linux/Vercel.
2. **Prioridad Sandía en Carruseles:** Los eventos organizados por Sandía Production deben figurar siempre de primer lugar antes que cualquier evento foráneo o aliado.
3. **Despliegues:** Cada cambio sustancial se commitea a Git en `main` para que Vercel actualice la producción de inmediato.
