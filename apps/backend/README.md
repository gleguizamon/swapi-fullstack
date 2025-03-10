# Backend - API NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

Este proyecto es la API backend desarrollada con [NestJS](https://nestjs.com/).

## Tecnologías Principales

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)

## Estructura del Proyecto

- `src/` - Código fuente de la aplicación
  - `films/` - Servicio de películas
  - `people/` - Servicio de personajes
  - `planets/` - Servicio de planetas
  - `starships/` - Servicio de naves
- `test/` - Pruebas unitarias y de integración

## Requisitos Previos

- Node.js (versión recomendada en `.nvmrc`)
- Yarn (gestor de paquetes)

## Instalación

Desde la raíz del monorepo, ejecute:

```bash
yarn install
```

O específicamente para el backend:

```bash
cd apps/backend
yarn install
```

## Ejecución en Desarrollo

```bash
# Desde la raíz del monorepo (ejecuta todas las aplicaciones)
yarn dev

# O específicamente para el backend
cd apps/backend
yarn start:dev
```

La API estará disponible en [http://localhost:3001](http://localhost:3001) por defecto.

## Compilación y Ejecución

```bash
# Modo desarrollo
yarn start

# Modo desarrollo con recarga automática
yarn start:dev

# Modo producción
yarn start:prod
```

## Pruebas

```bash
# Pruebas unitarias
yarn test

# Cobertura de pruebas
yarn test:cov
```

## Características Principales

- **Arquitectura Modular** - Organización del código en módulos reutilizables
- **Inyección de Dependencias** - Sistema robusto para gestionar dependencias
- **Decoradores** - Uso extensivo de decoradores para metadatos y comportamiento
- **Integración con Frontend** - API RESTful que se comunica con la aplicación Next.js
- **Tipos Compartidos** - Utiliza tipos desde el paquete `shared-types` del monorepo
