# Web de Prueba con Handlebars y WebSocket

Este proyecto es una aplicación web de prueba que permite interactuar con una API mediante WebSockets y API REST. Se han implementado las siguientes tecnologías:

- **Express**: Para gestionar el servidor web.
- **Handlebars**: Como motor de plantillas para renderizar la interfaz.
- **Tailwind CSS**: Para el diseño y la apariencia de la aplicación.
- **WebSocket**: Para permitir interacción en tiempo real con los productos.

## Endpoints Principales

1. **Interacción en tiempo real con WebSocket:**  
   - URL: `http://localhost:8080/realTimeProducts`
   - Permite gestionar productos en tiempo real mediante WebSockets.

2. **Interacción mediante API REST:**  
   - URL: `http://localhost:8080/`
   - Permite la gestión de productos a través de peticiones API REST convencionales.

## Requisitos Previos

Para ejecutar este proyecto, es necesario contar con:
- **Node.js** instalado en el sistema.
- **npm** (Node Package Manager) para gestionar las dependencias.

## Instalación y Ejecución

1. Clonar el repositorio o descargar el código fuente.
2. Instalar las dependencias ejecutando el siguiente comando en la terminal:
   ```sh
   npm install
   ```
3. Una vez instaladas las dependencias, iniciar el servidor con:
   ```sh
   npm run start
   ```
4. Acceder a la aplicación desde el navegador en `http://localhost:8080/`.

---
Desarrollado como prueba para la interacción con una API utilizando WebSockets y Handlebars.

