# Gesliga

## 1. Introducción

**Gesliga** es una aplicación web diseñada para la gestión integral de los derechos de pases de jugadores, transferencias, y sanciones en una liga de fútbol. El sistema proporciona una plataforma centralizada para administrar las operaciones y comunicaciones necesarias, ayudando a mejorar la transparencia, eficiencia y organización en las ligas de fútbol.

### Objetivos del Proyecto

- **Optimizar la gestión de pases y transferencias**: Facilitar la creación, aprobación, y seguimiento de solicitudes de transferencias de jugadores.
- **Centralizar la administración de sanciones**: Simplificar el proceso de aplicación y notificación de sanciones a jugadores y clubes.
- **Mejorar la comunicación**: Enviar notificaciones en tiempo real a los delegados de clubes, jugadores, y otros miembros importantes de la liga.
- **Documentar el historial de campeonatos**: Mantener un registro preciso de los campeonatos ganados y los eventos relevantes de la liga.

---

## 2. Arquitectura de la Aplicación

La arquitectura de **Gesliga** sigue el modelo cliente-servidor y está compuesta por los siguientes componentes principales:

- **Frontend**: Construido como una Single Page Application (SPA) utilizando **React** para proporcionar una experiencia de usuario interactiva y receptiva.
- **Backend**: Una API RESTful desarrollada en **Node.js** con **Express.js**, que maneja la lógica de negocio y la comunicación con la base de datos.
- **Base de Datos**: Utiliza **PostgreSQL** para almacenar de forma segura y eficiente toda la información relevante de la liga, clubes, jugadores, solicitudes, sanciones, entre otros.
- **Autenticación y Autorización**: Implementa autenticación segura mediante **JSON Web Tokens (JWT)** y gestiona permisos basados en roles definidos para cada tipo de usuario.

### Componentes Principales

- **Cliente (Frontend)**: Se conecta al backend para consumir la API REST. Utiliza tecnologías modernas como HTML5, CSS3, y JavaScript (ES6+) para renderizar la interfaz de usuario.
- **Servidor (Backend)**: Expone endpoints para realizar operaciones CRUD sobre las entidades del sistema, maneja la lógica de negocios, y gestiona la autenticación y la autorización.
- **Base de Datos**: El modelo de datos relacional en **PostgreSQL** incluye todas las entidades definidas para la gestión de la liga.
  
### Diagrama de Arquitectura

Un diagrama de la arquitectura del sistema puede ayudar a visualizar cómo interactúan estos componentes. [Incluir diagrama de arquitectura aquí]

---

## 3. Entidades y Modelo de Datos

### Entidades Principales

1. **League**: Información detallada de la liga, como nombre, fundación, ubicación, y contacto.
2. **Club**: Representa a los clubes de la liga, incluyendo nombre, colores, delegado asociado, presidente, y enlaces a redes sociales.
3. **Player**: Detalles sobre los jugadores, incluyendo nombre, fecha de nacimiento, nacionalidad, posición, número de carnet, etc.
4. **Pase**: Documenta los movimientos de jugadores entre clubes, con detalles sobre contratos, fechas y comisiones de agentes.
5. **Request**: Gestiona las solicitudes de transferencias o liberaciones de jugadores que requieren aprobación de la liga.
6. **Sanction**: Registra las sanciones aplicadas a jugadores o clubes, incluyendo el tipo, motivo, fechas, y estado de la sanción.
7. **User**: Almacena la información de usuarios que interactúan con la aplicación, como credenciales de inicio de sesión, rol y estado de la cuenta.
8. **Notification**: Gestiona las notificaciones enviadas a los usuarios para mantenerlos informados sobre eventos importantes.
9. **ChampionHistory**: Mantiene un registro del historial de campeones y subcampeones de la liga por temporada.
10. **BoardMember**: Almacena información sobre los miembros del consejo de administración de la liga, como nombre, cargo, fecha de inicio, etc.

### Relaciones entre Entidades

- Un **Club** puede tener múltiples **Players** asociados.
- Un **Player** puede tener múltiples **Pases** a lo largo del tiempo.
- Una **Sanction** puede estar vinculada a un **Player** o un **Club**.
- Un **User** puede recibir múltiples **Notifications**.
- Una **League** puede tener múltiples registros en **ChampionHistory**.

#### Modelo de Datos Relacional

El diagrama de entidad-relación (ERD) para la base de datos muestra cómo se interconectan todas las entidades en **Gesliga**. [Incluir ERD aquí]

---

## 4. Roles de Usuario y Permisos

### Tipos de Roles

1. **Administrador**
   - Permisos completos para gestionar la aplicación, como crear, editar y eliminar ligas, clubes, jugadores, usuarios, y gestionar sanciones.
   - Acceso a todas las funcionalidades del sistema sin restricciones.

2. **Delegado**
   - Puede gestionar los detalles de su propio club, como la información de jugadores y la solicitud de transferencias.
   - Acceso limitado a información de otros clubes y funciones de administración de la liga.

3. **Invitado**
   - Puede ver información pública, como los detalles de la liga, clubes, jugadores y resultados de campeonatos.
   - No puede realizar modificaciones o acceder a datos sensibles.

### Gestión de Permisos

La autorización se gestiona a nivel de backend utilizando middleware para validar el rol del usuario en cada solicitud. Los permisos se aplican a nivel de ruta y función para asegurar que solo los usuarios con los roles adecuados puedan acceder o modificar datos específicos.

---

## 5. Flujos de Trabajo

### Principales Flujos de Trabajo

1. **Gestión de Transferencias**
   - El delegado del club crea una solicitud de transferencia para un jugador.
   - La liga revisa la solicitud, pudiendo aprobarla o rechazarla.
   - Las decisiones se registran y las notificaciones se envían a los usuarios relevantes.

2. **Gestión de Sanciones**
   - La liga emite una sanción para un jugador o club.
   - La sanción es registrada en el sistema, y se envían notificaciones automáticas a los usuarios afectados.
   - El sistema actualiza el estado de las sanciones y permite el seguimiento.

3. **Notificaciones**
   - Notificaciones automáticas se generan y envían a los usuarios cuando ocurren eventos importantes (como aprobaciones de transferencias, aplicación de sanciones, cambios de estado).
   - Los usuarios pueden ver sus notificaciones en su panel de control.

#### Diagramas de Flujo

Se pueden agregar diagramas de flujo detallados para cada uno de estos procesos para ilustrar los pasos clave. [Incluir diagramas de flujo aquí]

---

## 7. Requisitos Técnicos

### Tecnologías Utilizadas

- **Frontend**: 
  - **React**: Framework JavaScript para construir interfaces de usuario.
  - **HTML5**: Estructuración del contenido de la web.
  - **CSS3**: Diseño y presentación visual.
  - **JavaScript (ES6+)**: Lógica de cliente y manipulación del DOM.

- **Backend**:
  - **Node.js**: Entorno de ejecución JavaScript del servidor.
  - **Express.js**: Framework para construir APIs RESTful en Node.js.
  
- **Base de Datos**:
  - **PostgreSQL**: Sistema de gestión de bases de datos relacional.

- **Autenticación**:
  - **JSON Web Tokens (JWT)**: Para la autenticación segura y gestión de sesiones.

### Requisitos del Sistema

- **Servidor**:
  - Mínimo: 2 GB de RAM, Procesador de 2 núcleos.
  - Recomendado: 4 GB de RAM, Procesador de 4 núcleos.

- **Software Necesario**:
  - **Node.js** (v14+)
  - **PostgreSQL** (v12+)
