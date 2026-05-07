# Security Cameras - Sistema de Monitoreo

Sistema de gestión y monitoreo de cámaras de seguridad con frontend en React + Vite y backend en Django + Django REST Framework.

---

## Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Arquitectura del Frontend](#arquitectura-del-frontend)
3. [Arquitectura del Backend](#arquitectura-del-backend)
4. [Diagrama de Flujo del Sistema](#diagrama-de-flujo-del-sistema)
5. [Flujos del Sistema](#flujos-del-sistema)
6. [Funciones por Flujo](#funciones-por-flujo)
7. [Stack Tecnológico](#stack-tecnológico)

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Navegador)                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    FRONTEND (React + Vite)                 │  │
│  │                                                           │  │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │  │
│  │  │  Login  │  │Dashboard │  │CameraList│  │  Scanner  │  │  │
│  │  │  Page   │  │  Page    │  │Component │  │ Component │  │  │
│  │  └────┬────┘  └────┬─────┘  └──────────┘  └───────────┘  │  │
│  │       │            │                                       │  │
│  │  ┌────▼────────────▼─────┐                                │  │
│  │  │   React Router (v7)   │                                │  │
│  │  └───────────────────────┘                                │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  UI: Material-UI (MUI) + react-hook-form            │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────┬────────────────────────────────┘  │
│                             │ HTTP/JSON                          │
│                             ▼                                    │
└─────────────────────────────────────────────────────────────────┘
                             │
                    localhost:8000 / localhost:5173
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      BACKEND (Django 5.2)                       │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Django REST Framework                   │  │
│  │                                                           │  │
│  │  ┌──────────────┐         ┌──────────────────────────┐   │  │
│  │  │ authuser App │         │    cameras App           │   │  │
│  │  │              │         │                          │   │  │
│  │  │ • login_view │         │ • Brands                 │   │  │
│  │  │ •register_vw│         │ • CameraModel            │   │  │
│  │  │ • serializers│         │ • CameraConfiguration    │   │  │
│  │  │ • JWT tokens │         │ • Camera                 │   │  │
│  │  └──────────────┘         │ • Storage                │   │  │
│  │                           └──────────────────────────┘   │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Autenticación: SimpleJWT (access + refresh tokens) │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────┬────────────────────────────────┘  │
│                             │                                   │
│                    ┌────────▼────────┐                          │
│                    │   db.sqlite3    │                          │
│                    │   (SQLite DB)   │                          │
│                    └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Arquitectura del Frontend

### Estructura de Directorios

```
frontend/
├── src/
│   ├── main.jsx                    # Punto de entrada, monta React
│   ├── App.jsx                     # Layout principal con <Outlet />
│   ├── App.css                     # Estilos globales
│   ├── index.css                   # CSS base
│   │
│   ├── router/
│   │   └── router.jsx              # Configuración de rutas (createBrowserRouter)
│   │
│   ├── pages/
│   │   ├── Login.jsx               # Página de autenticación
│   │   └── Dashboard.jsx           # Panel principal (home)
│   │
│   ├── components/
│   │   ├── Header.jsx              # Barra superior (dark mode, perfil)
│   │   ├── Navbar.jsx              # Sidebar de navegación (colapsable)
│   │   ├── ProfileMenu.jsx         # Menú desplegable de perfil
│   │   ├── CameraList.jsx          # Carrusel de cámaras con preview
│   │   ├── CameraScanner.jsx       # Escáner de cámaras en red
│   │   │
│   │   ├── Login/
│   │   │   ├── StartSession.jsx    # Contenedor Login/Registro con tabs
│   │   │   ├── styles/
│   │   │   │   └── styles.js       # Objetos de estilo reutilizables
│   │   │   └── UserLogin/
│   │   │       ├── LoginSession.jsx     # Formulario de inicio de sesión
│   │   │       └── RegisterSession.jsx  # Formulario de registro
│   │
│   └── assets/
│
├── public/                         # Archivos estáticos
├── index.html                      # HTML base
├── vite.config.js                  # Configuración de Vite
├── eslint.config.js                # Configuración de ESLint
├── package.json                    # Dependencias
└── .gitignore
```

### Componentes y Responsabilidades

| Componente | Ubicación | Responsabilidad |
|---|---|---|
| `main.jsx` | `src/main.jsx` | Punto de entrada. Inicializa `React.StrictMode` y monta `RouterProvider` |
| `App.jsx` | `src/App.jsx` | Layout raíz con `Header` fijo y `<Outlet />` para renderizar rutas hijas |
| `router.jsx` | `src/router/router.jsx` | Define rutas: `/` → redirect a `/login`, `/login`, `/home` |
| `Login.jsx` | `src/pages/Login.jsx` | Página wrapper que renderiza `StartSession` centrado en pantalla |
| `Dashboard.jsx` | `src/pages/Dashboard.jsx` | Panel principal con `Header`, `CameraScanner` y `CameraList` |
| `StartSession.jsx` | `components/Login/StartSession.jsx` | Gestiona tabs Login/Registro, renderiza formulario según `mode` |
| `LoginSession.jsx` | `components/Login/UserLogin/LoginSession.jsx` | Formulario login con `react-hook-form`, valida email/password, llama API `/auth/login/` |
| `RegisterSession.jsx` | `components/Login/UserLogin/RegisterSession.jsx` | Formulario registro con 6 campos, valida en frontend y backend, muestra modal de éxito |
| `Header.jsx` | `components/Header.jsx` | Barra superior con toggle dark mode y botón de perfil |
| `ProfileMenu.jsx` | `components/ProfileMenu.jsx` | Dropdown con email, link a perfil y botón logout |
| `Navbar.jsx` | `components/Navbar.jsx` | Sidebar colapsable con iconos y navegación (Home, About, Services, Contact) |
| `CameraScanner.jsx` | `components/CameraScanner.jsx` | Botón de escaneo con animación radar, simula búsqueda con `setTimeout` |
| `CameraList.jsx` | `components/CameraList.jsx` | Carrusel horizontal de cámaras con preview video, scroll, y botón "Ver en vivo" |

---

## Arquitectura del Backend

### Estructura de Directorios

```
logical/                          # Proyecto Django
├── manage.py                     # CLI de Django
├── db.sqlite3                    # Base de datos SQLite
├── requirements.txt              # Dependencias Python
├── venv/                         # Entorno virtual
│
├── logical/                      # Configuración del proyecto
│   ├── __init__.py
│   ├── settings.py               # Settings: apps, middleware, DB, CORS, JWT
│   ├── urls.py                   # Rutas principales del API
│   ├── wsgi.py                   # Servidor WSGI
│   └── asgi.py                   # Servidor ASGI
│
├── authuser/                     # App de autenticación
│   ├── __init__.py
│   ├── views.py                  # login_user_view, register_user_view
│   ├── serializers.py            # RegisterSerializer con validaciones
│   ├── models.py                 # (vacío - modelos en cameras)
│   ├── utils.py                  # generate_token(), create_user()
│   ├── admin.py
│   └── tests.py
│
└── cameras/                      # App de cámaras
    ├── __init__.py
    ├── models.py                 # Users, Brands, CameraModel, CameraConfiguration, Camera, Storage
    ├── views.py                  # (vistas comentadas - dashboard)
    ├── admin.py
    └── tests.py
```

### Modelos de Base de Datos

```
┌─────────────────────┐
│       Users         │  ← AbstractUser
├─────────────────────┤
│ id (PK)             │
│ username (unique)   │
│ name                │
│ email (unique)      │
│ phone               │
│ password (hashed)   │
│ is_authorized       │
│ is_active           │
└─────────────────────┘
         │
         │  (no relación directa, usuarios acceden a todo)
         │
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────────┐
│      Brands         │────▶│   CameraModel       │────▶│ CameraConfiguration     │
├─────────────────────┤     ├─────────────────────┤     ├─────────────────────────┤
│ id (PK)             │  1:N│ id (PK)             │ 1:1 │ id (PK)                 │
│ name (unique)       │     │ brand (FK→Brands)   │     │ camera_model (FK→Model) │
│ slug (unique)       │     │ name                │     │ max_resolution          │
│ description         │     │ part_number         │     │ compression             │
│ logo                │     │ description         │     │ max_fps                 │
└─────────────────────┘     │ datasheet           │     │ bitrate_kbps            │
                            │ image               │     │ protocol, ports, etc.   │
                            └─────────────────────┘     │ rtsp_main_stream        │
                                        │               │ rtsp_sub_stream         │
                                        │ 1:N           └─────────────────────────┘
                                        ▼
                            ┌─────────────────────┐
                            │      Camera         │  ← Instancia instalada
                            ├─────────────────────┤
                            │ id (PK)             │
                            │ camera_model (FK)   │
                            │ type_camera         │
                            │ name                │
                            │ ip_address          │
                            │ username/password   │
                            │ location            │
                            │ zone                │
                            │ description         │
                            └─────────────────────┘

┌─────────────────────┐
│     Storage         │
├─────────────────────┤
│ id (PK)             │
│ camera_slot (FK)    │
│ sd_card_slot        │
│ max_sd_capacity_gb  │
└─────────────────────┘
```

### Endpoints del API

| Método | Endpoint | Función | Descripción |
|---|---|---|---|
| `POST` | `/auth/login/` | `login_user_view` | Autenticar usuario con email + password |
| `POST` | `/auth/register/` | `register_user_view` | Crear nuevo usuario |
| `POST` | `/auth/token/refresh/` | `TokenRefreshView` | Renovar token de acceso |

---

## Diagrama de Flujo del Sistema

### Flujo General

```
                              ┌─────────────┐
                              │   / (root)   │
                              └──────┬──────┘
                                     │ redirect
                                     ▼
                              ┌─────────────┐
                              │  /login     │
                              └──────┬──────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                                ▼
            ┌───────────────┐                ┌───────────────┐
            │  Modo LOGIN   │                │  Modo REGISTRO │
            └───────┬───────┘                └───────┬───────┘
                    │                                │
                    ▼                                ▼
            POST /auth/login/                POST /auth/register/
                    │                                │
            ┌───────┼───────┐                ┌───────┼───────┐
            ▼               ▼                ▼               ▼
       ┌─────────┐    ┌──────────┐     ┌──────────┐   ┌──────────┐
       │ Success │    │  Error   │     │ Success  │   │  Error   │
       └────┬────┘    └────┬─────┘     └────┬─────┘   └────┬─────┘
            │              │                │               │
            ▼              ▼                ▼               ▼
    Guardar tokens     Mostrar error    Mostrar modal   Mostrar errores
    en localStorage                     de éxito        de validación
            │              │                │               │
            │              │                ▼               │
            │              │          Ir a /login           │
            │              │                                │
            ▼              │                                │
    Navigate /home ◄───────┘                                │
            │                                               │
            ▼                                               │
    ┌───────────────────┐                                   │
    │    /home          │                                   │
    │  (Dashboard)      │                                   │
    ├───────────────────┤                                   │
    │ • Header          │                                   │
    │ • CameraScanner   │                                   │
    │ • CameraList      │                                   │
    └───────────────────┘                                   │
            │                                               │
            ├──► Escanear cámaras (simulado)                │
            │       │                                       │
            │       ▼                                       │
            │  Resultado: success/no-cameras/error          │
            │                                               │
            ├──► Ver lista de cámaras                       │
            │       │                                       │
            │       ├──► Scroll horizontal                  │
            │       │                                       │
            │       └──► Click "Ver en vivo"                │
            │               │                               │
            │               ▼                               │
            │       Navigate /live/:cameraId                │
            │               │                               │
            │               ▼                               │
            │       (Ruta no implementada aún)              │
            │                                               │
            └──► Profile Menu                               │
                    │                                       │
                    ├──► /profile (pendiente)               │
                    │                                       │
                    └──► Logout (simulado)                  │
                                                            │
                                                            │
    ┌───────────────────────────────────────────────────────┘
    │
    ▼
┌──────────────────────┐
│  Token Refresh       │
│  POST /auth/token/   │
│  /refresh/           │
└──────────────────────┘
```

---

## Flujos del Sistema

### 1. Flujo de Autenticación (Login)

```
┌──────────────────────────────────────────────────────────────┐
│  LOGIN                                                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Usuario ingresa a la app → redirigido a /login           │
│  2. StartSession.jsx muestra tab "Iniciar sesión"            │
│  3. LoginSession.jsx renderiza formulario (email, password)  │
│  4. react-hook-form valida en cliente:                       │
│     • email requerido y formato válido                       │
│     • password requerida, mínimo 6 caracteres                │
│  5. onSubmit → POST http://localhost:8000/auth/login/        │
│     Body: { email, password }                                │
│                                                              │
│  BACKEND (login_user_view):                                  │
│  6. Recibe email y password                                  │
│  7. Valida que ambos campos existan → 400 si faltan          │
│  8. Busca usuario por email en Users.objects.get()           │
│     → 401 si no existe                                       │
│  9. Verifica is_authorized → 403 si es False                 │
│  10. Verifica is_active → 403 si es False                    │
│  11. Verifica password con check_password() → 401 si falla   │
│  12. Genera JWT tokens (access + refresh) via generate_token │
│  13. Retorna 200 con tokens y datos de usuario               │
│                                                              │
│  FRONTEND:                                                   │
│  14. Guarda en localStorage: access, refresh, user           │
│  15. navigate("/home") → Dashboard                           │
│                                                              │
│  ERRORES POSIBLES:                                           │
│  • 400: "Email and password are required"                    │
│  • 401: "Credenciales incorrectas"                           │
│  • 403: "Cuenta no autorizada" / "Cuenta inactiva"           │
│  • Red: "Error de red. Verifica tu conexión."                │
└──────────────────────────────────────────────────────────────┘
```

### 2. Flujo de Registro

```
┌──────────────────────────────────────────────────────────────┐
│  REGISTRO                                                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Usuario hace click en "Registrarse" (tab)                │
│  2. RegisterSession.jsx muestra formulario 6 campos:         │
│     • Nombre completo                                        │
│     • Nombre de usuario                                      │
│     • Correo electrónico                                     │
│     • Teléfono (10 dígitos)                                  │
│     • Contraseña (mín 6 chars)                               │
│     • Confirmar contraseña                                   │
│                                                              │
│  3. Validación cliente (react-hook-form):                    │
│     • Todos los campos requeridos                            │
│     • email: formato válido                                  │
│     • phone: patrón /^\d{10}$/                               │
│     • password: mín 6 caracteres                             │
│     • confirm_password: debe coincidir con password          │
│                                                              │
│  4. onSubmit → POST http://localhost:8000/auth/register/     │
│     Body: { name, username, email, phone, password,          │
│             confirm_password }                               │
│                                                              │
│  BACKEND (register_user_view):                               │
│  5. RegisterSerializer valida datos:                         │
│     • validate_email(): formato + unicidad                   │
│     • validate_phone(): unicidad                             │
│     • validate_username(): unicidad                          │
│     • validate(): passwords coinciden, mín 6 chars           │
│  6. create() → llama create_user() en utils.py               │
│  7. create_user(): hashea password con make_password()       │
│     y crea Users.objects.create()                            │
│  8. Genera JWT tokens para el nuevo usuario                  │
│  9. Retorna 201 con user data y tokens                       │
│                                                              │
│  FRONTEND:                                                   │
│  10. Guarda tokens en localStorage                           │
│  11. Muestra modal "Cuenta creada"                           │
│  12. Al confirmar → cambia a modo login                      │
│                                                              │
│  ERRORES POSIBLES:                                           │
│  • 400: Campo específico (email existe, phone existe, etc.)  │
│  • 400: "Las contraseñas no coinciden"                       │
│  • 400: "Mínimo 6 caracteres"                                │
│  • Red: "Error de red. Verifica tu conexión."                │
└──────────────────────────────────────────────────────────────┘
```

### 3. Flujo del Dashboard (Home)

```
┌──────────────────────────────────────────────────────────────┐
│  DASHBOARD (/home)                                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Componentes renderizados:                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Header                                                  │  │
│  │ • Toggle dark mode (placeholder)                        │  │
│  │ • Botón perfil → abre ProfileMenu                       │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ CameraScanner                                           │  │
│  │ • Botón "Buscar cámaras cercanas"                       │  │
│  │ • Al click: setIsScanning(true)                         │  │
│  │ • setTimeout 2800ms simula escaneo                      │  │
│  │ • Resultado aleatorio:                                  │  │
│  │   - >0.7: "success" (cámaras encontradas)              │  │
│  │   - >0.3: "no-cameras" (ninguna encontrada)            │  │
│  │   - <=0.3: "error" (error de red)                      │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ CameraList                                              │  │
│  │ • 5 cámaras hardcodeadas con estado y preview           │  │
│  │ • Carrusel horizontal con scroll suave                  │  │
│  │ • Botones scroll izquierda/derecha                      │  │
│  │ • Cada tarjeta muestra:                                 │  │
│  │   - Preview video (si connected) o mensaje desconectado │  │
│  │   - Nombre, tipo, estado (verde/rojo), lastSeen         │  │
│  │   - Botón "Ver en vivo" o "No disponible"               │  │
│  │ • handleViewLive() → navigate(/live/:cameraId)          │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### 4. Flujo de Perfil y Logout

```
┌──────────────────────────────────────────────────────────────┐
│  PERFIL / LOGOUT                                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Click en icono AccountCircle (Header)                    │
│  2. setMenuOpen(true) → renderiza ProfileMenu                │
│  3. ProfileMenu muestra:                                     │
│     • Email del usuario (hardcodeado: dann@example.com)      │
│     • Link "Ver perfil" → /profile (pendiente)               │
│     • Botón "Cerrar sesión" → handleLogout()                 │
│  4. handleLogout():                                          │
│     • console.log('Cerrando sesión...')                      │
│     • onClose() → cierra menú                                │
│     • TODO: localStorage.removeItem('token')                 │
│              window.location.href = '/login'                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Funciones por Flujo

### Flujo Login

| Función | Archivo | Línea | Descripción |
|---|---|---|---|
| `onSubmit(data)` | `LoginSession.jsx` | 44 | Envía POST al backend con email/password, guarda tokens, navega a /home |
| `login_user_view(request)` | `authuser/views.py` | 18 | View DRF que valida credenciales y retorna JWT tokens |
| `generate_token(user)` | `authuser/utils.py` | 8 | Crea refresh y access tokens con SimpleJWT |
| `handleSubmit(onSubmit)` | `react-hook-form` | - | Wrapper que valida el formulario antes de submit |

### Flujo Registro

| Función | Archivo | Línea | Descripción |
|---|---|---|---|
| `onSubmit(data)` | `RegisterSession.jsx` | 38 | Envía POST con 6 campos, guarda tokens, muestra modal |
| `handleConfirm()` | `RegisterSession.jsx` | 82 | Cierra modal y cambia a modo login |
| `register_user_view(request)` | `authuser/views.py` | 56 | View DRF que usa RegisterSerializer para crear usuario |
| `RegisterSerializer.validate_email()` | `authuser/serializers.py` | 16 | Valida formato y unicidad de email |
| `RegisterSerializer.validate_phone()` | `authuser/serializers.py` | 27 | Valida unicidad de teléfono |
| `RegisterSerializer.validate_username()` | `authuser/serializers.py` | 36 | Valida unicidad de username |
| `RegisterSerializer.validate()` | `authuser/serializers.py` | 41 | Valida coincidencia de passwords y longitud mínima |
| `RegisterSerializer.create()` | `authuser/serializers.py` | 52 | Remueve confirm_password y llama create_user() |
| `create_user()` | `authuser/utils.py` | 17 | Crea usuario con password hasheada en la BD |

### Flujo Dashboard

| Función | Archivo | Línea | Descripción |
|---|---|---|---|
| `handleScan()` | `CameraScanner.jsx` | 10 | Simula escaneo con setTimeout, genera resultado aleatorio |
| `scroll(direction)` | `CameraList.jsx` | 60 | Desplaza el carrusel 320px en la dirección indicada |
| `handleViewLive(cameraId)` | `CameraList.jsx` | 56 | Navega a `/live/:cameraId` (ruta no implementada) |

### Flujo Perfil

| Función | Archivo | Línea | Descripción |
|---|---|---|---|
| `handleLogout()` | `ProfileMenu.jsx` | 7 | Simula logout (pendiente implementación real) |

---

## Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19.2.0 | Librería UI |
| Vite | 7.3.1 | Bundler y dev server |
| react-router-dom | 7.13.0 | Enrutamiento |
| @mui/material | 7.3.7 | Componentes UI |
| @mui/icons-material | 7.3.7 | Iconos |
| react-hook-form | 7.71.2 | Gestión de formularios |
| Babel React Compiler | 1.0.0 | Optimización de renders |

### Backend

| Tecnología | Versión | Propósito |
|---|---|---|
| Django | 5.2.11 | Framework web |
| Django REST Framework | - | API REST |
| djangorestframework-simplejwt | - | Autenticación JWT |
| django-cors-headers | - | CORS para frontend |
| django-phonenumber-field | - | Campo teléfono validado |
| SQLite | - | Base de datos |

---

## Comunicación Frontend ↔ Backend

```
Frontend (localhost:5173)                    Backend (localhost:8000)
        │                                              │
        │  POST /auth/login/                           │
        │  { email, password } ──────────────────────▶ │  login_user_view()
        │                                              │  Busca usuario
        │                                              │  Verifica credenciales
        │                                              │  Genera JWT
        │  200 { message, tokens, user } ◀─────────── │
        │  Guarda en localStorage                      │
        │                                              │
        │  POST /auth/register/                        │
        │  { name, username, email,                    │
        │    phone, password,                          │
        │    confirm_password } ─────────────────────▶ │  register_user_view()
        │                                              │  RegisterSerializer valida
        │                                              │  create_user() crea usuario
        │                                              │  Genera JWT
        │  201 { message, user, tokens } ◀─────────── │
        │                                              │
        │  POST /auth/token/refresh/                   │
        │  { refresh } ──────────────────────────────▶ │  TokenRefreshView
        │  { access } ◀────────────────────────────── │
```
