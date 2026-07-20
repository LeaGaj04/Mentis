# Mentis | Plataforma Integral de Terapia Online

🔗 **[Ver Demo en Vivo (Vercel)](https://mentis-swart.vercel.app/)**

## Mentis - Página de Inicio V1.0

<img width="1892" height="866" alt="image" src="https://github.com/user-attachments/assets/8b8b898c-af14-49f4-8f13-880fba7e3709" />

## Mentis - Página de Inicio V1.1

<img width="1897" height="946" alt="image" src="https://github.com/user-attachments/assets/c6951b2f-be63-4e16-8768-189825291538" />


## Sobre el Proyecto

**Mentis** es una plataforma web Full-Stack moderna, empática y altamente estética, diseñada para facilitar el acceso a servicios de psicología clínica online. Construida sobre el ecosistema de Next.js, la aplicación ofrece una experiencia de usuario impecable y sin fricciones, respaldada por un sistema de backend robusto para la automatización de citas.

El proyecto se encuentra **100% funcional**, gestionando de forma segura el ciclo completo de reservas: desde la captura de datos en el cliente hasta el envío de correos transaccionales con datos y la generación de salas virtuales, todo procesado del lado del servidor (SSR) para garantizar rendimiento y seguridad para los usuarios.

---

## Funcionalidades Principales

* **Interfaz Minimalista y Responsiva:** Diseño UI/UX centrado en transmitir calma, utilizando una paleta de colores relajante (Tailwind CSS) y adaptada a cualquier dispositivo.
* **Sistema de Agendamiento Activo:** Flujo de reservas completo y validado para seleccionar horas disponibles y motivos de consulta.
* **Notificaciones Transaccionales:** Integración nativa con la API de **Resend** para enviar correos electrónicos de confirmación instantáneos con un diseño profesional.
* **Integración con Videollamadas:** Generación automática de enlaces únicos de **Google Meet** adjuntos en el correo de confirmación para cada paciente.
* **Backend Seguro:** Procesamiento de datos e integraciones de API protegidas mediante Next.js App Router API Routes, eliminando problemas de CORS y exposición de credenciales.

---

## Tecnologías Utilizadas

* **Framework:** Next.js (App Router)
* **Librería UI:** React
* **Estilos:** Tailwind CSS
* **Manejo de Correos:** Resend
* **Automatización:** Google Meet API / Google Workspace
* **Despliegue:** Vercel

---

## Cómo ejecutarlo localmente

**Pasos de instalación**
1. Clonar el repositorio y entrar a la carpeta:
Abre tu terminal y ejecuta estos comandos para descargar el código y entrar al directorio del proyecto:

   ```bash
   git clone https://github.com/LeaGaj04/Mentis.git
   cd Mentis
   
2. Instalar las dependencias:
Descarga todas las librerías necesarias (como Next.js, React, Resend y Tailwind):

   ```bash
   npm install

3. Configurar las variables de entorno:
Crea un archivo llamado .env.local en la carpeta raíz del proyecto (al mismo nivel que el package.json).
Abre ese archivo en tu editor de código y agrega tus credenciales privadas. Debería tener esta estructura:

   ```bash
   # Clave de Resend para el envío de correos transaccionales
   RESEND_API_KEY=tu_clave_secreta_de_resend_aqui

   # Credenciales de Google Workspace / Meet API
   GOOGLE_CLIENT_ID=tu_client_id_aqui
   GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
   GOOGLE_REFRESH_TOKEN=tu_refresh_token_aqui

4. Iniciar el servidor de desarrollo:
Una vez instaladas las dependencias y configuradas las credenciales, levanta el entorno de desarrollo ejecutando:

   ```bash
   npm run dev

5. Abrir la aplicación:
Abre tu navegador web y visita http://localhost:3000 para interactuar con la plataforma completamente funcional.

## Estructura del Proyecto

El proyecto sigue la arquitectura recomendada por Next.js (App Router), separando claramente el frontend de la logica del servidor.

   ```text
   ├── public/               # Archivos estaticos (imagenes locales, logos, iconos)
   ├── src/
   │   ├── app/              # Sistema de enrutamiento principal
   │   │   ├── agendar/      # Pagina de reserva y formulario (/agendar)
   │   │   │   └── page.tsx
   │   │   ├── api/          # Endpoints seguros del backend (Node.js)
   │   │   │   └── send/     # Controlador de Resend y Google Meet
   │   │   │       └── route.ts
   │   │   ├── globals.css   # Estilos globales y base de Tailwind CSS
   │   │   ├── layout.tsx    # Estructura maestra (Navbar, Footer, Metadatos)
   │   │   └── page.tsx      # Landing page principal (Inicio)
   │   │
   │   ├── components/       # Componentes visuales reutilizables
   │   │   ├── ui/           # Botones, inputs, modales, etc.
   │   │   ├── Footer.tsx
   │   │   └── Header.tsx
   │   │
   │   └── lib/              # Funciones de utilidad y clientes externos
   │       ├── google.ts     # Configuracion y auth de Google Workspace/Meet
   │       └── utils.ts      # Funciones auxiliares generales
   │
   ├── .env.local            # Variables de entorno secretas (ignorado en git)
   ├── next.config.ts        # Configuracion general de Next.js
   ├── package.json          # Dependencias y scripts de ejecucion
   └── tailwind.config.ts    # Configuracion del sistema de diseño
   ```

Esta estructura demuestra orden, separa bien las responsabilidades (UI, rutas y lógica de servidor/API).












