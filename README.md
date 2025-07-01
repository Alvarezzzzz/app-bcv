# 📌 Tecnologías Utilizadas

## Backend
- **Node.js** - Entorno de ejecución JavaScript  
- **Express** (v5.1.0) - Framework web para Node.js  
- **MySQL** - Sistema de gestión de bases de datos relacional  
  - **mysql2** (v3.14.1) - Controlador MySQL para Node.js  

## Frontend  
- **HTML5** - Estructura de la aplicación web  
- **CSS** - Estilos y diseño responsive  
- **JavaScript Vanilla** - Funcionalidad del lado del cliente  

## Dependencias Principales  
- **cors** (^2.8.5) - Middleware para habilitar CORS  
- **node-cron** (v4.2.0) - Programador de tareas  
- **playwright** (v1.53.2) - Biblioteca para automatización de navegadores (web scraping)  
- **zod** (^3.25.67) - Validación de esquemas TypeScript-first  

# 🚀 Pasos para Configurar el Proyecto

## 1. Clonar el repositorio
```bash
git clone https://github.com/Alvarezzzzz/app-bcv.git
cd app-bcv
```

---

## 2. Configurar la Base de Datos

- Debes tener **MySQL** instalado y corriendo.
- Ejecuta el script ubicado en:

```bash
/backend/file.sql
```

Este script:
- Crea la base de datos
- Crea la tabla necesaria
- Inserta algunos registros de tasas pasadas

---

## 3. Configurar y Ejecutar el Backend

### 📦 Instalar dependencias
Desde la carpeta `/backend`, ejecuta:

```bash
npm install
npx playwright install
```

### ⚙️ Configuración

Abre el archivo:

```bash
/backend/config.js
```

Allí puedes ajustar:

- Puerto en el que se levantará el backend
- Configuración de conexión a MySQL:
  - `host`
  - `user`
  - `password`
  - `database`
  - `port`

### ▶️ Ejecutar servidor

Una vez configurado, corre el backend con:

```bash
npm run start
```

---

## 4. Configurar y Ejecutar el Frontend

En el archivo:

```bash
/frontend/main.js
```

- En la línea 2, ajusta la **URL base del backend**, según la dirección donde se esté ejecutando.

Ejemplo:

```js
const API_BASE_URL = 'http://localhost:3000';
```

Luego, abre el archivo:

```bash
/frontend/index.html
```

**⚠️ Asegúrate de tener el backend corriendo antes de abrir el frontend**.

Puedes abrir el frontend directamente en el navegador.

## ✅ ¡Listo!
---

# 🧠 Decisiones de Diseño

## Backend

Se decidió utilizar **Express** como framework principal para el backend, ya que permite crear una **REST API** eficiente y ligera, lo cual facilita la separación clara entre la aplicación backend y frontend. Además, se aplicó el **patrón de arquitectura MVC** en la organización del backend, que proporciona una estructura clara, legible y organizada, separando responsabilidades como rutas, controladores, servicios y validaciones.

## Frontend

Para el frontend se optó por trabajar con **HTML**, **CSS** y **JavaScript Vanilla**, principalmente por la **simplicidad de desarrollo** (para ahorrar tiempo) y la naturaleza del proyecto. Dado que es una aplicación sencilla y que no está pensada para escalar en el futuro, esta decisión permite una implementación rápida y sin la complejidad de desarrollo de un framework.

---