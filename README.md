# 🍔 Demo de App de Comidas

> Aplicación móvil de delivery de comida construida con React Native + Expo Router + TypeScript

<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
</div>

---

## ✨ Características

- 🏠 **Navegación por tabs** con Inicio, Ofertas, Favoritos y Cuenta
- 🔍 **Búsqueda avanzada** con filtros por categoría
- 🛒 **Carrito de compras** con persistencia local
- 💳 **Checkout completo** con métodos de pago
- 🔐 **Sistema de autenticación** con Formik + Yup
- 🎨 **Diseño minimalista premium** en azul y blanco
- 📸 **Imágenes reales** de productos
- 🏷️ **Sistema de ofertas** con descuentos visuales
- ⭐ **Ratings y reviews** de productos
- 📱 **Responsive** para mobile y web
- 🧪 **Tests automáticos** con Jest y React Native Testing Library
- 🔤 **Tipografía Inter** para una UI moderna

---

## 🛠️ Stack Tecnológico

| Tecnología                       | Uso                          |
| -------------------------------- | ---------------------------- |
| **React Native**                 | Framework UI multiplataforma |
| **Expo Router**                  | Navegación file-based        |
| **TypeScript**                   | Tipado estático              |
| **Zustand**                      | State management global      |
| **AsyncStorage**                 | Persistencia local           |
| **Formik + Yup**                 | Validación de formularios    |
| **Ionicons**                     | Sistema de íconos            |
| **Jest**                         | Framework de testing         |
| **React Native Testing Library** | Testing de componentes       |
| **Inter Font**                   | Tipografía moderna           |

---

## 📂 Estructura del Proyecto

```
delivery-app/
├── app/                          # Rutas y pantallas (Expo Router)
│   ├── (auth)/                   # Autenticación
│   │   └── login/
│   ├── (tabs)/                   # Navegación principal
│   │   ├── index.tsx            # Inicio
│   │   ├── offers/              # Ofertas
│   │   ├── favorites/           # Favoritos
│   │   └── account/             # Cuenta
│   ├── cart/                    # Carrito
│   ├── checkout/                # Checkout
│   ├── restaurant/[id]/         # Detalle del producto
│   └── search/                  # Búsqueda
├── components/                   # Componentes reutilizables
│   ├── food-card/
│   └── search-bar/
├── services/                     # Lógica de negocio
│   ├── constants/               # Theme, mock data
│   ├── hooks/                   # Custom hooks
│   ├── store/                   # Zustand stores
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utilidades
├── __tests__/                    # Tests automáticos
│   ├── components/              # Tests de componentes
│   └── store/                   # Tests de stores
└── assets/                       # Recursos estáticos
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Expo CLI

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio
cd delivery-app

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

### Scripts Disponibles

```bash
npm start          # Iniciar Expo Dev Server
npm run android    # Abrir en Android
npm run ios        # Abrir en iOS
npm run web        # Abrir en navegador
npm test           # Ejecutar tests
npm run test:watch # Ejecutar tests en modo watch
npm run test:coverage # Ejecutar tests con cobertura
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```typescript
colors = {
  primary: "#3A86FF", // Azul principal
  secondary: "#8338EC", // Violeta secundario
  background: "#FFFFFF", // Fondo base
  backgroundSoft: "#F5F7FB", // Fondo suave
  textPrimary: "#1E1E1E",
  textSecondary: "#6B7280",
};
```

### Espaciado

```typescript
spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};
```

### Componentes Visuales

- Cards con sombras sutiles
- Bordes redondeados (8-16px)
- Íconos en variante `-outline`
- Tipografía **Inter** con pesos 400-700
- Headers y footer con color azul suave (#EFF4FF)

---

## 📱 Pantallas Principales

### 🏠 Inicio

Listado de productos por categoría con búsqueda y carrito

### 🔍 Búsqueda

Filtros avanzados por categoría y texto

### 🛒 Carrito

Gestión de productos con cantidades y subtotales

### 💳 Checkout

Confirmación de pedido con métodos de pago

### 👤 Cuenta

Autenticación y perfil de usuario

---

## 🗂️ State Management

### Zustand Stores

#### **Auth Store** (`auth-store.ts`)

```typescript
- user: User | null
- isAuthenticated: boolean
- login(email, password)
- logout()
```

#### **Cart Store** (`cart-store.ts`)

```typescript
- items: CartItem[]
- addItem(item)
- removeItem(id)
- updateQuantity(id, quantity)
- clearCart()
- getTotal()
```

---

## 🔒 Autenticación

Sistema de login con validación usando **Formik + Yup**:

- ✅ Email válido requerido
- ✅ Contraseña mínima de 6 caracteres
- ✅ Persistencia de sesión con AsyncStorage
- ✅ Mock de autenticación (listo para backend real)

---

## 📊 Datos Mock

35 productos en 7 categorías:

- 🍔 Hamburguesas
- 🍣 Sushi
- 🍕 Pizzas
- 🍝 Pastas
- 🥗 Vegetariano
- 🇵🇪 Comida Peruana
- ⭐ Lo más pedido

Cada producto incluye:

- Nombre, precio, restaurante
- Tiempo de entrega estimado
- Rating y descripción
- Imágenes de alta calidad
- Sistema de ofertas con descuentos

---

## 🌐 Multi-plataforma

La app funciona en:

- ✅ **iOS** (nativo)
- ✅ **Android** (nativo)
- ✅ **Web** (navegador)

Con código 100% compartido entre plataformas.

---

## 📝 Arquitectura

### Principios de Diseño

- 📁 **File-based routing** con Expo Router
- 🎨 **StyleSheet** centralizado (sin inline styles)
- 🔄 **Componentes reutilizables**
- 📦 **Feature-based structure**
- 🎯 **TypeScript estricto** (sin `any`)
- 🎨 **Theme centralizado** en `theme.ts`

### Patrones Implementados

- Custom hooks para lógica compartida
- Zustand para state global
- AsyncStorage para persistencia
- Formik + Yup para formularios
- Type-safe navigation con Expo Router

---

## 🧪 Testing

La aplicación incluye tests automáticos completos usando **Jest** y **React Native Testing Library**.

### Cobertura de Tests

- ✅ **Cart Store**: Tests para `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `getTotal`, `getTotalItems`
- ✅ **Auth Store**: Tests para `login`, `logout`, `loadUser`, `setUser` con validaciones
- ✅ **FoodCard Component**: Tests de renderizado, navegación y botón de agregar al carrito
- ✅ **SearchBar Component**: Tests de renderizado, eventos y comportamiento

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Modo watch (re-ejecuta al cambiar archivos)
npm run test:watch

# Con cobertura de código
npm run test:coverage
```

### Estructura de Tests

```
__tests__/
├── components/
│   ├── food-card.test.tsx
│   └── search-bar.test.tsx
└── store/
    ├── cart-store.test.ts
    └── auth-store.test.ts
```

**Total: 44 tests pasando** ✅

---

## 🔧 Configuración

### Theme Personalizado

Edita `services/constants/theme.ts` para cambiar colores, espaciado y radios.

### Mock Data

Modifica `services/constants/mock-data.ts` para agregar/editar productos.

### Imágenes

Coloca imágenes propias en `assets/images/food/` y actualiza las URLs en mock data.

### Configuración de Tests

Los mocks y configuración de Jest están en:

- `jest.config.js` - Configuración principal
- `jest.setup.js` - Mocks globales (expo-router, AsyncStorage, react-native)

---

## 📄 Licencia

Este es un proyecto demo educativo.

---

## 👥 Autor

**Christian Papa**

Desarrollado como demo de aplicación de delivery moderna con React Native.

---

## 🤝 Contribuciones

Este es un proyecto de demostración. Para mejoras o sugerencias, abre un issue.
