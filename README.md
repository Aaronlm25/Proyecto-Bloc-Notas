# 🗒️ Bloc de Notas

Aplicación web de bloc de notas, simple y funcional, construida con HTML, CSS y
JavaScript puro (sin frameworks). Permite crear, organizar y buscar notas, con
guardado automático en el navegador.

> Proyecto personal. Código organizado en módulos (almacenamiento, interfaz,
> datos y drag & drop) para mantenerlo limpio y fácil de extender.

## ✨ Características

- 🗒️ **Crear y eliminar notas** al instante.
- 💾 **Guardado automático** con `localStorage`: tus notas siguen ahí aunque cierres el navegador.
- 🎨 **Colores y temas personalizables.**
- 🔍 **Barra de búsqueda** para encontrar tus notas rápidamente.
- 🖱️ **Arrastrar y soltar** (drag & drop) para reorganizar las notas.

## 🛠️ Tecnologías

HTML · CSS · JavaScript (vanilla) · localStorage

## 🚀 Cómo usarlo

No requiere instalación. Tienes dos opciones:

**Opción 1 — Abrir directamente**

Abre el archivo `main/index.html` en tu navegador.

**Opción 2 — Clonar el repositorio**

```bash
git clone https://github.com/Aaronlm25/bloc-notas.git
cd bloc-notas
```

Luego abre `main/index.html` en tu navegador.

## 📁 Estructura del proyecto

```
.
├── README.md
└── main/
    ├── index.html        # Página principal
    └── assets/
        ├── css/
        │   ├── main.css  # Estilos de la aplicación
        │   └── reset.css # Normalización de estilos
        └── js/
            ├── app.js      # Punto de entrada / inicialización
            ├── ui.js       # Manejo de la interfaz
            ├── data.js     # Gestión de los datos de las notas
            ├── storage.js  # Guardado y carga con localStorage
            └── dragdrop.js # Arrastrar y soltar para reorganizar
```
