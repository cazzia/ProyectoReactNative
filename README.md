# Aplicación de Países - Prueba Técnica React Native

Esta es una aplicación móvil desarrollada en React Native que muestra información de países del mundo y permite visualizar contenido multimedia en streaming HLS. 

Desarrollada como parte de una prueba técnica para Frontend Developer React Native, cumpliendo con todos los requisitos técnicos y funcionales solicitados.

##  Características Implementadas

###  Pantalla de Listado de Países
- Búsqueda avanzada**: Filtra países por nombre o código en tiempo real
- **Filtro por continente**: Selector múltiple de continentes con todos los disponibles
- **Filtro por moneda**: Selector múltiple de monedas extraídas dinámicamente
- **Información mostrada en cada ítem**:
  - Nombre del país
  - Código del país (ISO)
  - Continente
  - Moneda (si está disponible)
  - Icono representativo
- **Funcionalidades adicionales**:
  - Pull-to-refresh para actualizar datos
  - Contador de resultados filtrados
  - Navegación fluida al detalle

### Pantalla de Detalle de País
- **Información básica completa**:
  - Código del país (ISO)
  - Nombre oficial
  - Moneda local
  - Continente
  - Idiomas oficiales
  - Capital
- **Reproductor de video HLS integrado**:
  - Controles personalizados (play/pause)
  - Barra de progreso interactiva
  - Indicador de tiempo actual/total
  - Soporte completo para streaming HLS
  - Video de demostración desde endpoints de hls.js
  - Diseño responsivo y adaptable

## 🛠️ Stack Tecnológico

- **React Native 0.81.5** con **TypeScript** completo
- **Expo Router 6.x** para navegación nativa
- **Apollo Client 4.x** para consumo de GraphQL
- **GraphQL**: API de países de Trevor Blades
- **NativeWind 4.x** para styling (Tailwind CSS para React Native)
- **Expo AV** para reproducción de video HLS nativo
- **React Native Video** como respaldo para streaming
- **Expo Vector Icons** para iconografía consistente

##  Requisitos del Sistema

- **Node.js** 20.19.4 o superior (recomendado)
- **npm** 10.x o **yarn** 1.22+
- **Expo CLI** actualizada
- **Dispositivo móvil** con Expo Go o **emulador Android/iOS**
- **Conexión a internet** para datos de países y streaming de video

##  Instalación y Ejecución

### 1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd technicalTest
   ```

### 2. **Instala las dependencias**:
   ```bash
   npm install
   ```

### 3. **Actualiza expo-router (si es necesario)**:
   ```bash
   npm install expo-router@~6.0.20
   ```

### 4. **Inicia el servidor de desarrollo**:
   ```bash
   npm start
   # o
   npx expo start
   ```

### 5. **Ejecuta en tu dispositivo**:

#### Opción A: Con Expo Go (Recomendado)
   - Instala **Expo Go** desde la App Store/Google Play
   - Escanea el código QR que aparece en la terminal
   - La app se cargará automáticamente

#### Opción B: Simuladores/Emuladores
   ```bash
   npm run ios     # Para iOS Simulator (requiere Xcode)
   npm run android # Para Android Emulator (requiere Android Studio)
   npm run web     # Para navegador web
   ```

#### Opción C: Durante desarrollo activo
   ```bash
   # Con la terminal de Expo abierta, presiona:
   i  # Abrir iOS Simulator
   a  # Abrir Android Emulator  
   w  # Abrir en navegador web
   r  # Recargar app
   ```

##  Estructura del Proyecto

```
├── app/                    # Rutas de la aplicación (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Pantalla principal de países
│   │   └── explore.tsx    # Pantalla de exploración
│   ├── country/           # Pantallas de detalle
│   │   └── [code].tsx     # Detalle dinámico por código de país
│   └── _layout.tsx        # Layout raíz con Apollo Provider
├── components/            # Componentes reutilizables
│   ├── CountryItem.tsx    # Item de país en la lista
│   ├── SearchBar.tsx      # Barra de búsqueda
│   ├── FilterSelector.tsx # Selector de filtros
│   └── HLSVideoPlayer.tsx # Reproductor de video HLS
├── lib/                   # Configuración de librerías
│   └── apollo.ts          # Cliente GraphQL y queries
├── types/                 # Definiciones TypeScript
│   └── index.ts           # Tipos de Country, Continent, etc.
└── constants/             # Constantes de la app
    └── theme.ts           # Configuración de temas
```

##  Reproductor de Video HLS

El reproductor incluye:
- **Controles personalizados** con botón play/pause
- **Barra de progreso** interactiva
- **Indicadores de tiempo** (actual/total)
- **Pantalla completa** (soporte nativo)
- **Estado de carga** con indicadores visuales

URL de prueba HLS utilizada:
```
https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
```

## API GraphQL

### Consultas principales:

1. **Obtener todos los países**:
   ```graphql
   query GetCountries {
     countries {
       code
       name
       continent { code name }
       currency
       languages { code name }
       capital
     }
   }
   ```

2. **Obtener país específico**:
   ```graphql
   query GetCountry($code: ID!) {
     country(code: $code) {
       code
       name
       continent { code name }
       currency
       languages { code name }
       capital
     }
   }
   ```

## Get a fresh project (instrucciones originales)

When you're ready, run:

##  Diseño y UX

- **Diseño responsivo** adaptado a diferentes tamaños de pantalla
- **Tema consistente** con colores y tipografías unificados
- **Animaciones suaves** en transiciones y interacciones
- **Estados de carga** informativos
- **Manejo de errores** elegante
- **Navegación intuitiva** con retroalimentación visual

## Configuración Adicional

### NativeWind (Tailwind CSS)
- Configurado para styling eficiente
- Clases de utilidad disponibles
- Soporte para temas claros y oscuros

### Apollo Client
- Cache optimizado
- Manejo de estados de carga y error
- Queries reactivas

##  Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run ios` - Ejecuta en iOS
- `npm run android` - Ejecuta en Android  
- `npm run web` - Ejecuta en navegador
- `npm run lint` - Ejecuta el linter

## Características Técnicas Destacadas

Esta aplicación fue desarrollada como parte de una prueba técnica, demostrando:

-  **Arquitectura escalable** y mantenible
-  **TypeScript completo** con tipado estricto
-  **Componentización** eficiente y reutilizable  
-  **Gestión de estado** con Apollo Client
-  **Navegación nativa** con Expo Router
-  **Streaming de video** HLS funcional
-  **Filtros avanzados** múltiples y reactivos
-  **UI/UX moderna** con NativeWind
-  **Manejo robusto** de errores y estados de carga
-  **Optimización** para performance móvil

## 📋 Lista de Verificación de Requisitos

###  Requisitos Técnicos Cumplidos:
-  React Native con TypeScript
-  GraphQL para consumo de API  
-  Sistema de navegación entre pantallas
-  Componente de reproducción de video HLS
-  UI Components Framework (NativeWind)

###  Funcionalidades Implementadas:

**Pantalla de Listado:**
-  Barra de búsqueda por nombre
-  Filtro por continente (dropdown/selector)
-  Filtro por moneda (currency)
-  Items muestran: nombre, código, continente, imagen/icono

**Pantalla de Detalle:**
-  Código del país
-  Nombre del país  
-  Moneda (currency)
-  Continente
-  Idiomas
-  Capital
-  Reproductor de video HLS con controles básicos (play/pause, progreso)

###  APIs Utilizadas:
-  Countries API GraphQL: https://countries.trevorblades.com
-  Video HLS de demos de hls.js

##  Entrega Completa

-  **Repositorio en GitHub** con código fuente completo
-  **Instrucciones claras** para ejecutar el proyecto
-  **Documentación detallada** del desarrollo
-  **Calidad de código** priorizando arquitectura sólida
-  **Funcionalidades core** completamente implementadas

---

Aplicación desarrollada cumpliendo todos los requisitos de la prueba técnica para **Frontend Developer React Native**.

**Tecnologías core utilizadas:**
- React Native + TypeScript 
- GraphQL con Apollo Client   
- Expo Router Navigation 
- HLS Video Streaming 
- NativeWind/TailwindCSS 
-  Integración completa de GraphQL
-  Reproductor de video HLS funcional
-  UI/UX moderna y responsiva
-  Manejo de estados y errores
-  Código TypeScript tipado
-  Componentes reutilizables
-  Navegación fluida
