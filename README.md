# Proyecto SWAPI Full Stack (Nest/NextJS)

Este proyecto utiliza Turborepo como herramienta de gestión de monorepo, permitiendo una organización eficiente de múltiples aplicaciones y paquetes compartidos.

## Descripción General

Este monorepo está estructurado para facilitar el desarrollo de una aplicación completa con frontend y backend, compartiendo configuraciones y tipos entre los diferentes componentes del proyecto.

## Estructura del Proyecto

### Aplicaciones y Paquetes

- `apps/frontend`: Aplicación frontend desarrollada con [Next.js](https://nextjs.org/)
- `apps/backend`: API backend desarrollada con [NestJS](https://nestjs.com/)
- `packages/shared-types`: Tipos TypeScript compartidos entre aplicaciones
- `packages/eslint-config`: Configuraciones de ESLint compartidas
- `packages/typescript-config`: Configuraciones de TypeScript compartidas

Todo el código del proyecto está desarrollado en [TypeScript](https://www.typescriptlang.org/) para garantizar la consistencia y seguridad de tipos.

### Herramientas Integradas

Este proyecto incluye las siguientes herramientas configuradas y listas para usar:

- [TypeScript](https://www.typescriptlang.org/) para verificación estática de tipos
- [ESLint](https://eslint.org/) para linting de código
- [Prettier](https://prettier.io) para formateo de código

## Comandos Principales

### Instalación

```bash
yarn install
```

### Compilación

Para compilar todas las aplicaciones y paquetes, ejecute:

```bash
yarn build
```

### Desarrollo

Para ejecutar todas las aplicaciones en modo desarrollo:

```bash
yarn dev
```
