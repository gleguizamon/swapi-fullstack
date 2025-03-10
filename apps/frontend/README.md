# Frontend - Aplicación Next.js

## Descripción

Este proyecto es la interfaz de usuario desarrollada con [Next.js](https://nextjs.org).

## Tecnologías Principales

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)

## Estructura del Proyecto

- `app/` - Directorio principal de la aplicación (App Router de Next.js)
- `components/` - Componentes reutilizables de React
- `lib/` - Utilidades y funciones auxiliares
- `hooks/` - Custom hooks de React
- `public/` - Archivos estáticos accesibles públicamente

## Requisitos Previos

- Node.js (versión recomendada en `.nvmrc`)
- Yarn (gestor de paquetes)

## Instalación

Desde la raíz del monorepo, ejecute:

```bash
yarn install
```

O específicamente para el frontend:

```bash
cd apps/frontend
yarn install
```

## Ejecución en Desarrollo

```bash
# Desde la raíz del monorepo (ejecuta todas las aplicaciones)
yarn dev

# O específicamente para el frontend
cd apps/frontend
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) en su navegador para ver la aplicación.

## Compilación para Producción

```bash
# Desde la raíz del monorepo
yarn build

# O específicamente para el frontend
cd apps/frontend
yarn build
```

## Características Principales

- **App Router** - Utiliza el nuevo sistema de enrutamiento de Next.js
- **Optimización de Fuentes** - Implementa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar fuentes personalizadas
- **Integración con Backend** - Comunicación eficiente con la API de NestJS
- **Componentes Compartidos** - Utiliza componentes y tipos desde los paquetes compartidos del monorepo
