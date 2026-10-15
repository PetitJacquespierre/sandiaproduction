# 🌐 ROTARY EXPOMAR / PARAGUANÁ — DOSSIER MAESTRO & PLAN DE PROYECTO WEB

> **Documento Estratégico y Técnico para el Desarrollo del Portal Oficial:** `rotaryexpomar.org`  
> **Elaborado por:** Grow Studio Agency  
> **Fecha de creación:** Octubre 2026  
> **Objetivo:** Propuesta comercial, lineamientos de marca Rotary International y arquitectura de software para el Rotary Club de Paraguaná (Punto Fijo, Falcón).

---

## 💼 1. ANÁLISIS DE NEGOCIO: ¿TIENEN DINERO PARA PAGAR?

### ¿Quiénes conforman un Rotary Club?
Aunque Rotary es una organización de beneficencia y ayuda humanitaria, **sus socios no son voluntarios sin recursos**. Históricamente y por estatutos mundiales, los clubes rotarios están integrados por:
* Empresarios locales, comerciantes y contratistas.
* Médicos reconocidos, directores de clínicas y laboratorios.
* Abogados, agentes aduanales y profesionales de alto nivel en Punto Fijo (Sambil, Las Virtudes, Zona Franca).

### ¿Cómo manejan sus finanzas?
Rotary opera bajo dos cuentas/fondos separados:
1. **Fondo de Servicio (Social):** Dinero de donaciones destinado estrictamente a vacunas, sillas de ruedas y obras comunitarias.
2. **Fondo Administrativo / Operativo:** Financiado por las **cuotas mensuales/anuales de los propios socios** y los remanentes de eventos benéficos. De este fondo pagan eventos, alquileres, insumos institucionales y **servicios tecnológicos y de publicidad**.

> **Conclusión Financiera:** Un presupuesto de **$350 a $450 USD** para un sitio web y **$35 USD/mes** de mantenimiento es un monto sumamente accesible para una junta directiva de 15 a 30 socios profesionales, sobre todo cuando se les demuestra que la página web les permitirá **recaudar miles de dólares en donaciones internacionales (Zelle/PayPal)** que hoy no pueden recibir por falta de una pasarela.

---

## 🏛️ 2. MARCO LEGAL & DIRECTRICES DE MARCA ROTARY INTERNATIONAL

Rotary International otorga **total autonomía operativa y de diseño** a cada club local, siempre y cuando se respeten los estándares del **Rotary Brand Center**:

### A. Uso del Logotipo y Marca
* **Rueda Rotaria Oficial:** Debe acompañarse siempre del nombre del club local (`Rotary Club Paraguaná` o `Rotary Expomar`). No se debe usar la rueda aislada sin identificación del club en la cabecera principal.
* **Proporciones y Zona de Seguridad:** No deformar, rotar ni alterar los 24 dientes ni los 6 rayos de la rueda.

### B. Paleta de Colores Corporativa Oficial (Exacta de Rotary)
| Color | Nombre Oficial | HEX | Uso Recomendado |
| :--- | :--- | :--- | :--- |
| 🔵 | **Rotary Royal Blue** | `#00246C` | Color primario, barras de navegación, títulos institucionales. |
| 🟡 | **Rotary Gold** | `#FFC72C` | Color secundario, botones de acción (CTA), bordes de honor. |
| 🔴 | **End Polio Cranberry** | `#D91E2B` | Exclusivo para llamados de vacunación y campaña *End Polio Now*. |
| 🔷 | **Azure Blue** | `#005DAA` | Fondos interactivos, enlaces y estados hover. |
| ⚪ | **Blanco Puro** | `#FFFFFF` | Fondos de lectura limpia y contraste en modo oscuro/claro. |
| ⚫ | **Navy Profundo** | `#071329` | Fondo oscuro moderno para modo nocturno deportivo. |

### C. Tipografías Autorizadas
* **Títulos y Cabeceras:** `Montserrat`, `Oswald` o `Open Sans Condensed` (Impacto visual y seriedad institucional).
* **Cuerpo de Texto:** `Open Sans`, `Poppins` o `Roboto` (Legibilidad óptima en móviles).

---

## 🎯 3. PERFIL DEL CLIENTE & CONTACTOS CLAVE (PUNTO FIJO)

* **Organización:** Rotary Club Paraguaná Punto Fijo / Rotary Expomar (Distrito 4380 de Venezuela).
* **Líder / Contacto Directo:** **Francisco Madrid** (y su esposa, figuras activas en la directiva y comité del club).
* **Hitos del Club en Octubre / Noviembre:**
  * **24 de Octubre:** *Día Mundial de la Lucha Contra la Polio* (Jornada anual masiva de vacunación e inmunización en centros comerciales de Paraguaná como **Sambil Paraguaná** y **C.C. Las Virtudes**).
  * **Noviembre:** *Carrera Caminata 5K End Polio Now* (Evento deportivo de cierre benéfico anual con aliados como Gold's Stars Gym).
* **Obras Sociales Continuas en Paraguaná:**
  * Banco de Leche Materna y apoyo materno-infantil en ambulatorios de Falcón.
  * Dotación de sillas de ruedas, andaderas y bastones a adultos mayores.
  * Jornadas médicas pediátricas y despistaje en escuelas rurales de Paraguaná.

---

## 🛠️ 4. ESTRUCTURA Y ARQUITECTURA DEL SITIO WEB (`rotaryexpomar.org`)

### Dominio Oficial Sugerido
* **Dominio:** `rotaryexpomar.org` (o `rotaryparaguana.org`).
* **Costo de Adquisición:** **~$8.50 USD / año** (Renovación aprox. $11.20 USD).
* **Hosting / CDN:** Vercel / Cloudflare (Cero costo de alojamiento mensual, velocidad ultra rápida SSL incluida).

### Arquitectura de Secciones (One-Page Modular + Landing de Eventos):

```
rotaryexpomar.org/
├── 1. HERO INSTITUCIONAL
│   ├── Video/Banner de impacto humanitario (médicos, niños, runners, voluntariado)
│   ├── Slogan oficial: "Dar de Sí antes de Pensar en Sí"
│   └── Botones CTA: [Hacer una Donación] y [Conocer Nuestros Proyectos]
│
├── 2. NUESTRO CLUB & JUNTA DIRECTIVA
│   ├── Carta del Presidente (Francisco Madrid) y reseña histórica en Paraguaná
│   ├── Miembros del Club (foto corporativa de los rotarios de Punto Fijo)
│   └── Conexión distrital con el Distrito 4380 de Venezuela
│
├── 3. PROGRAMAS & OBRAS SOCIALES (GALERÍA DE IMPACTO)
│   ├── Vacunación Infantil (Jornadas Sambil y Las Virtudes)
│   ├── Banco de Sillas de Ruedas y Apoyo Ortopédico
│   ├── Salud Materno-Infantil y Lactancia
│   └── Ayuda humanitaria y donaciones en comunidades vulnerables
│
├── 4. CAMPAÑA EMBLEMÁTICA: END POLIO NOW (5K RUNNER)
│   ├── Módulo interactivo con el contador de la carrera benéfica anual
│   ├── Explicación del destino de los fondos recaudados
│   └── Enlace directo a inscripción / dorsal
│
├── 5. MÓDULO INTELIGENTE DE RECAUDACIÓN Y DONACIONES
│   ├── Cuentas Nacionales: Pago Móvil / Bancaribe / Banco del Tesoro / Banesco
│   ├── Canales Internacionales: Zelle, PayPal, Binance Pay, Transferencias
│   └── Formulario de confirmación de comprobante directo al WhatsApp de tesorería
│
├── 6. DIRECTORIO DE BENEFATORES & EMPRESAS ALIADAS
│   ├── Vitrina corporativa anual de empresas de Punto Fijo (Sambil, Las Virtudes, etc.)
│   └── Botón: "Convierta a su empresa en Benefactor Rotario"
│
└── 7. CONTACTO & SEDE
    ├── Horarios y lugar de reuniones semanales
    ├── Redes sociales oficiales (@rotaryclubparaguanapf)
    └── Formulario directo para solicitudes de ayuda comunitaria
```

---

## 💰 5. ESQUEMA DE PRECIOS & CONDICIONES COMERCIALES (GROW STUDIO)

### Propuesta Económica:
* **Desarrollo Integral de la Plataforma:** **$350.00 – $450.00 USD**  
  *(Pago en 2 partes: 50% anticipo al iniciar, 50% contra entrega y publicación)*.
* **Dominio Institucional (`.org`):** **$15.00 USD / año** (o gestionado por ellos).
* **Plan de Mantenimiento Mensual:** **$35.00 USD / mes**  
  *(Cubre: carga mensual de fotos de cada jornada médica, actualización de noticias, blindaje de seguridad, monitoreo de donaciones y soporte continuo).*

---

## 📋 6. ESTRATEGIA COMERCIAL: CÓMO ABORDAR A FRANCISCO MADRID

### Situación 1: Si Kermit NO logra la aprobación de la página de la carrera
Esperas que transcurra el evento y abordas a Francisco de manera consultiva:
> *"Hola Francisco, un gusto saludarte. Vi el despliegue de la 5K en Las Virtudes y el gran esfuerzo que hicieron. Estuve notando que un club con tanta trayectoria en Falcón aún no cuenta con un portal web propio y dependen de Google Forms y redes sociales.*  
>  
> *En **Grow Studio** desarrollamos plataformas web institucionales. Tenemos preparado el proyecto para que **Rotary Expomar** cuente con su portal oficial en `rotaryexpomar.org`: una web de nivel internacional donde benefactores en el exterior puedan donar por Zelle o tarjeta, las empresas de Paraguaná tengan su vitrina fija y puedan gestionar todas sus carreras y cenas benéficas anuales sin intermediarios. Me gustaría mostrarte una maqueta de 10 minutos sin compromiso."*

### Situación 2: Si Kermit SÍ hace la carrera con nuestra plataforma
Le dices a Kermit:
> *"Kermit, Francisco quedó encantado con el sistema de la 5K. Ahora es el momento de venderles la web oficial del club. Tú te encargas de la cobertura anual de fotos/video y nosotros del software. Cobramos $400 USD y nos queda un cliente corporativo fijo para los dos."*

---

## 🕵️ 7. CHECKLIST PARA LA RECOPILACIÓN SILENCIOSA DE INFORMACIÓN

Para cuando iniciemos el nuevo proyecto, recolectaremos de sus redes (`@rotaryclubparaguanapf`):
- [ ] Fotos en alta resolución de las jornadas en Sambil Paraguaná.
- [ ] Fotos de la entrega de sillas de ruedas e insumos médicos.
- [ ] Nombres y cargos de la junta directiva actual 2026-2027.
- [ ] Datos de las cuentas bancarias que usan actualmente para donaciones.
- [ ] Logos de los patrocinantes que los apoyan habitualmente (clínicas, comercios).
- [ ] Testimonios y frases institucionales de Francisco Madrid y los líderes del club.

---

## 🚀 8. INSTRUCCIONES PARA MUDAR ESTE PROYECTO
1. Crea tu nueva carpeta de trabajo para este proyecto (ej: `Rotary Expomar Web`).
2. Copia este archivo `ROTARY_PROYECTO_MASTER.md` a la raíz de la nueva carpeta.
3. Abre el nuevo workspace en Antigravity y dile al asistente:  
   *"Lee el archivo ROTARY_PROYECTO_MASTER.md y comencemos la recopilación silenciosa de fotos y la maqueta base del portal institucional"*.
