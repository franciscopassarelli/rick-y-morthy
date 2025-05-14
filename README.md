# 🧪 Rick & Morty Microfrontend App

Este proyecto implementa una arquitectura de **microfrontends** utilizando React, TailwindCSS y TypeScript. Consume la [API pública de Rick & Morty](https://rickandmortyapi.com/) para mostrar información sobre personajes, episodios y ubicaciones.

## 🚀 Tecnologías utilizadas

- ⚛️ [React 18+](https://reactjs.org/)
- 💅 [TailwindCSS](https://tailwindcss.com/)
- 🟦 [TypeScript](https://www.typescriptlang.org/)
- 📦 Webpack 5 + Module Federation (para microfrontends)
- 🧪 [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- 🧼 ESLint + Prettier + Husky (linting y formateo automático)

---

## 📁 Estructura del Proyecto

Este repositorio contiene **dos microfrontends independientes**:

1. `mf-personajes`: Listado de personajes de Rick & Morty.
2. `mf-detalles`: Detalle de episodios o ubicaciones asociadas.

Cada microfrontend se encuentra en su carpeta respectiva y puede ser desplegado de forma independiente.

---

## 🛠️ Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/franciscopassarelli/rick-y-morthy.git
cd rick-microfrontend-app

# Entrar a cada microfrontend
cd mf-personajes
npm install
npm run dev

# En otro terminal
cd mf-detalles
npm install
npm run dev
