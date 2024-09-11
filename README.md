# Gesliga

## 1. Introducción

**Gesliga** es una aplicación web diseñada para la gestión integral de los derechos de pases de jugadores, transferencias, y sanciones en una liga de fútbol. Su objetivo principal es proporcionar una plataforma centralizada para gestionar la actividad administrativa de una liga, facilitando la transparencia, la eficiencia en la toma de decisiones y la comunicación entre los distintos actores involucrados (ligas, clubes, jugadores, y delegados).

### Objetivos del Proyecto
- Mejorar la gestión y el control de pases y transferencias de jugadores.
- Agilizar la aprobación y el registro de solicitudes de transferencias.
- Asegurar una comunicación eficiente y oportuna sobre sanciones y decisiones importantes.
- Proporcionar un historial detallado de campeonatos y eventos relevantes.

---

## 2. Arquitectura de la Aplicación

Gesliga está construida como una aplicación web basada en la arquitectura cliente-servidor. Los componentes principales incluyen:

- **Frontend**: Interfaz de usuario desarrollada en tecnologías web modernas (HTML, CSS, JavaScript, y React).
- **Backend**: API RESTful desarrollada en Node.js, que maneja la lógica de negocio y se comunica con la base de datos.
- **Base de Datos**: PostgreSQL para almacenar de manera segura toda la información relevante de la liga, los clubes, los jugadores y las sanciones.
- **Autenticación y Autorización**: Mecanismos de autenticación seguros utilizando tokens JWT, con permisos y roles definidos para cada tipo de usuario.

### Componentes Principales
- **Cliente**: Navegador web con aplicación SPA (Single Page Application) que consume la API REST.
- **Servidor**: Aplicación backend que expone endpoints para realizar operaciones CRUD sobre las entidades del sistema.
- **Base de Datos**: Almacenamiento relacional con PostgreSQL para todas las entidades de la aplicación.

---

## 3. Entidades y Modelo de Datos

### Entidades Principales
1. **League**: Representa a la liga de fútbol, incluyendo detalles como el nombre, la fundación, la ubicación, y la información de contacto.
2. **Club**: Detalla los clubes participantes en la liga, incluyendo su nombre, colores principales, delegado asociado, presidente, y enlaces a redes sociales.
3. **Player**: Almacena la información de los jugadores, como su nombre, fecha de nacimiento, nacionalidad, posición, y número de carnet.
4. **Pase**: Registra detalles sobre los movimientos de los jugadores, como contratos, fechas de inicio y fin, y la comisión del agente.
5. **Request**: Gestiona las solicitudes de transferencias o liberaciones que necesitan aprobación.
6. **Sanction**: Registra las sanciones aplicadas a jugadores o clubes, incluyendo detalles como el tipo, motivo, fecha de inicio y fin.
7. **User**: Maneja la información de los usuarios de la aplicación, incluyendo credenciales, rol y estado de la cuenta.
8. **Notification**: Envía notificaciones a los usuarios sobre eventos importantes, como sanciones o actualizaciones de solicitudes.
9. **ChampionHistory**: Registra el historial de campeones y subcampeones de la liga por temporada.
10. **BoardMember**: Almacena la información de los miembros del consejo de la liga.

### Relaciones entre Entidades
- Un **Club** puede tener muchos **Players**.
- Un **Player** puede tener muchos **Pases**.
- Una **Sanction** puede estar asociada a un **Player** o un **Club**.
- Un **User** puede recibir muchas **Notifications**.
- Una **League** tiene una historia de campeonatos registrada en **ChampionHistory**.

---

## 4. Roles de Usuario y Permisos

### Tipos de Roles
1. **Administrador**: Tiene permisos completos para gestionar la aplicación, incluyendo la creación y modificación de ligas, clubes, usuarios, y otras entidades.
2. **Delegado**: Puede gestionar su propio club, administrar jugadores y solicitar transferencias.
3. **Invitado**: Solo puede ver cierta información sin realizar modificaciones.

### Manejo de Permisos
- Los permisos son definidos en el backend de acuerdo al rol de usuario. Las rutas y acciones disponibles para cada rol se controlan mediante validaciones en el servidor.

---

## 5. Flujos de Trabajo

### Principales Flujos de Trabajo
1. **Gestión de Transferencias**: El delegado del club inicia una solicitud de transferencia; la liga revisa y aprueba o rechaza la solicitud.
2. **Gestión de Sanciones**: La liga emite una sanción a un jugador o club; se notifica a los usuarios afectados y se actualiza el estatus.
3. **Notificaciones**: Envío de notificaciones a los usuarios sobre cambios de estado en transferencias, sanciones, o cualquier evento relevante.

### Diagramas de Flujo
Incluir diagramas visuales para ilustrar los flujos de trabajo clave.

---

## 7. Requisitos Técnicos

### Tecnologías Utilizadas
- **Frontend**: React, HTML5, CSS3, JavaScript (ES6+).
- **Backend**: Node.js, Express.js.
- **Base de Datos**: PostgreSQL.
- **Autenticación**: JSON Web Tokens (JWT).

### Requisitos del Sistema
- **Servidor**: Mínimo 2 GB de RAM, procesador de 2 núcleos.
- **Software**: Node.js (v14+), PostgreSQL (v12+).

---

## 10. Contribución y Mejora

### Guía de Contribución
- Utilizar estilos de codificación consistentes (prettier para JavaScript, ESLint).
- Crear "pull requests" para todas las mejoras y correcciones de errores.
- Proporcionar documentación de cualquier nuevo código.

### Reportes de Errores y Solicitudes de Funciones
- Utilizar el sistema de issues en GitHub para reportar errores o solicitar nuevas funcionalidades.

---

## 11. Licencia y Derechos de Uso

- **Licencia**: Este proyecto está licenciado bajo la Licencia MIT.
- **Derechos de Uso**: Se permite la redistribución y uso en proyectos personales y comerciales, siempre que se incluya el aviso de copyright original.

---

## 12. Preguntas Frecuentes (FAQ)

1. **¿Cómo se crea una cuenta de usuario?**
   - Las cuentas de usuario solo pueden ser creadas por un administrador de la liga.

2. **¿Cómo puedo solicitar una transferencia?**
   - Los delegados pueden iniciar una solicitud de transferencia desde el panel de administración del club.

3. **¿Cómo se gestionan las sanciones?**
   - Las sanciones son emitidas por la liga y notificadas automáticamente a los usuarios afectados.

---

## 13. Contacto y Soporte

- **Soporte Técnico**: support@gesliga.com
- **Desarrolladores**: [Perfil de GitHub](https://github.com/gesliga)
- **Documentación Completa**: [Wiki del Proyecto](https://github.com/gesliga/wiki)
