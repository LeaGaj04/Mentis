# Mentis | Plataforma Integral de Terapia Online

🔗 **[Ver Demo en Vivo (Vercel)](https://mentis-swart.vercel.app/)**

![Mentis - Página de Inicio]

<img width="1892" height="866" alt="image" src="https://github.com/user-attachments/assets/8b8b898c-af14-49f4-8f13-880fba7e3709" />

## Sobre el Proyecto

**Mentis** es una plataforma web Full-Stack moderna, empática y altamente estética, diseñada para facilitar el acceso a servicios de psicología clínica online. Construida sobre el ecosistema de Next.js, la aplicación ofrece una experiencia de usuario impecable y sin fricciones, respaldada por un sistema de backend robusto para la automatización de citas.

El proyecto se encuentra **100% funcional**, gestionando de forma segura el ciclo completo de reservas: desde la captura de datos en el cliente hasta el envío de correos transaccionales y la generación de salas virtuales, todo procesado del lado del servidor (SSR) para garantizar rendimiento y seguridad.

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

Sigue estos pasos para correr el proyecto en tu entorno de desarrollo:

1. **Clona el repositorio e instala las dependencias:**
   ```bash
   
   git clone [https://github.com/LeaGaj04/Mentis.git](https://github.com/LeaGaj04/Mentis.git)
   cd Mentis
   npm install
   
   Configura las variables de entorno:
   
   Crea un archivo .env.local en la raíz del proyecto y agrega tus credenciales privadas (Resend, Google, etc.):
      Fragmento de código
      RESEND_API_KEY=tu_api_key_de_resend
      # Añade el resto de tus variables de entorno aquí
   
   Inicia el servidor de desarrollo:
      Bash
      npm run dev
   
   Abre la aplicación:
   Navega a http://localhost:3000 en tu navegador para interactuar con la plataforma.
