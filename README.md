# Event-Manager
Aplicación web para la gestión de eventos con mapas interactivos y visualización de datos.

## Características Implementadas

### 1. Gestión de Eventos
- ✅ Creación de nuevos eventos
- ✅ Visualización de lista de eventos
- ✅ Formulario validado con Formik y Yup
- ✅ Modal para crear/editar eventos
- ✅ Notificaciones de éxito/error

### 2. Gestión de Estado
- ✅ Redux Toolkit para manejo de estado global
- ✅ Slices separados para eventos y UI
- ✅ Acciones tipadas con TypeScript
- ✅ Estado persistente entre componentes

### 3. Interfaz de Usuario
- ✅ Material-UI v5 para componentes
- ✅ Diseño responsivo
- ✅ Tema personalizado
- ✅ Iconos y elementos visuales
- ✅ Feedback visual para acciones

### 4. Validaciones
- ✅ Validación de formularios con Yup
- ✅ Mensajes de error personalizados
- ✅ Validación de fechas
- ✅ Validación de ubicaciones

### 5. Integración con Mapas
- ✅ Integración con Mapbox GL
- ✅ Selector de ubicación interactivo
- ✅ Visualización de eventos en el mapa
- ✅ Geocodificación de direcciones

## Tecnologías Utilizadas

- React 18.3.1
- TypeScript 4.9.5
- Redux Toolkit 1.9.7
- Material-UI 5.11.0
- Mapbox GL 2.15.0
- Formik 2.4.6
- Yup 1.4.0

## Configuración del Proyecto

1. **Instalación de dependencias**
```
npm install
```

2. **Variables de Entorno**
Crear un archivo `.env` en la raíz del proyecto:
```
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
```

3. **Iniciar el proyecto**
```
npm start
```

## Estructura del Proyecto

```
event-manager/
├── public/
├── src/
│ ├── components/ # Componentes React
│ ├── store/ # Configuración de Redux
│ │ ├── slices/ # Slices de Redux
│ └── index.ts # Store configuration
├── types/ # TypeScript interfaces
├── hooks/ # Custom hooks
├── pages/ # Componentes de página
└── App.tsx # Componente principal
```

## Autor

José Luis Arrioja - [GitHub](https://github.com/Lee-Stark-94)