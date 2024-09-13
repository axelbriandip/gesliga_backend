# Documentación del Backend de Gesliga

## Introducción

**Gesliga** es una aplicación web diseñada para gestionar los derechos de pases de jugadores en una liga de fútbol. El backend de la aplicación maneja la lógica de negocio, la gestión de datos y las interacciones entre los usuarios y la base de datos. Este documento proporciona una visión general del diseño y funcionamiento del backend, así como detalles técnicos sobre su implementación.

## Arquitectura de la Aplicación

La arquitectura del backend de Gesliga está basada en una estructura de microservicios, con los siguientes componentes clave:

- **Servidor de Aplicaciones**: Maneja las solicitudes de los clientes, ejecuta la lógica de negocio y se comunica con la base de datos.
- **Base de Datos**: Almacena toda la información relacionada con ligas, clubes, jugadores, sanciones, y más. Utiliza un sistema de gestión de bases de datos relacional (PostgreSQL).
- **API**: Proporciona endpoints para interactuar con la aplicación, permitiendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las entidades del sistema.
- **Servicios de Autenticación**: Gestiona la autenticación y autorización de usuarios, asegurando que solo los usuarios con los permisos adecuados puedan acceder a ciertas funcionalidades.

## Entidades y sus Relaciones

### League

- **id**: Identificador único
- **full_name**: Nombre completo de la liga
- **short_name**: Nombre abreviado de la liga
- **foundation_date**: Fecha de fundación
- **description**: Descripción de la liga
- **address**: Dirección
- **city**: Ciudad
- **state**: Estado
- **country**: País
- **phone_number**: Número de teléfono
- **email_address**: Correo electrónico
- **link_instagram**: Enlace al perfil de Instagram
- **link_facebook**: Enlace al perfil de Facebook
- **link_whatsapp**: Enlace a WhatsApp
- **link_website**: Enlace al sitio web
- **primary_color**: Color principal
- **secondary_color**: Color secundario
- **status**: Estado

### Club

- **id**: Identificador único
- **full_name**: Nombre completo del club
- **short_name**: Nombre abreviado del club
- **abb_name**: Nombre abreviado en tres letras
- **primary_color**: Color principal
- **secondary_color**: Color secundario
- **president_name**: Nombre del presidente
- **president_contact**: Información de contacto del presidente
- **history**: Historia del club
- **link_instagram**: Enlace al perfil de Instagram
- **link_facebook**: Enlace al perfil de Facebook
- **link_website**: Enlace al sitio web
- **status**: Estado
- **league_id**: Identificador de la liga (FK a League)
- **delegate_id**: Identificador del delegado (FK a User)

### Player

- **id**: Identificador único
- **first_name**: Primer nombre
- **last_name**: Apellido
- **date_of_birth**: Fecha de nacimiento
- **nationality**: Nacionalidad
- **position**: Posición en el campo
- **preferred_foot**: Pie dominante
- **gender**: Género
- **birth_state**: Estado de nacimiento
- **contact_number**: Número de contacto
- **dni**: Documento Nacional de Identidad
- **license_number**: Número de carnet
- **status**: Estado
- **pass_id**: Identificador del pase (FK a Pass)

### Pass

- **id**: Identificador único
- **start_date**: Fecha de inicio
- **end_date**: Fecha de finalización
- **status**: Estado
- **club_id**: Identificador del club (FK a Club)

### Request

- **id**: Identificador único
- **request_type**: Tipo de solicitud (Transferencia, Liberación)
- **request_status**: Estado de la solicitud
- **created_at**: Fecha de creación
- **notes**: Notas adicionales
- **status**: Estado
- **created_by**: Identificador del creador (FK a User)
- **player_id**: Identificador del jugador (FK a Player)
- **origin_club_id**: Identificador del club de origen (FK a Club)
- **destination_club_id**: Identificador del club de destino (FK a Club)

### Sanction

- **id**: Identificador único
- **type**: Tipo de sanción
- **target**: Objetivo de la sanción
- **reason**: Razón
- **description**: Descripción
- **issue_date**: Fecha de emisión
- **start_date**: Fecha de inicio
- **end_date**: Fecha de finalización
- **sanction_status**: Estado de la sanción
- **amount**: Importe
- **severity**: Severidad
- **status**: Estado
- **player_id**: Identificador del jugador (FK a Player)
- **club_id**: Identificador del club (FK a Club)

### Notification

- **id**: Identificador único
- **title**: Título
- **message**: Mensaje
- **type**: Tipo
- **created_at**: Fecha de creación
- **status**: Estado
- **user_id**: Identificador del usuario (FK a User)

### Champion

- **id**: Identificador único
- **title**: Título
- **season**: Temporada
- **description**: Descripción
- **award_date**: Fecha de otorgamiento
- **goals_champion**: Goleador del campeonato
- **goals_runner_up**: Goleador del subcampeonato
- **penalties_champion**: Penalizaciones del campeón
- **penalties_runner_up**: Penalizaciones del subcampeón
- **scorers_champion**: Goleadores del campeón
- **scorers_runner_up**: Goleadores del subcampeón
- **status**: Estado
- **champion_club_id**: Identificador del club campeón (FK a Club)
- **runner_up_club_id**: Identificador del club subcampeón (FK a Club)

### User

- **id**: Identificador único
- **username**: Nombre de usuario
- **password**: Contraseña (almacenada en formato hash)
- **email**: Correo electrónico
- **first_name**: Primer nombre
- **last_name**: Apellido
- **role**: Rol del usuario
- **created_at**: Fecha de creación
- **updated_at**: Fecha de actualización
- **last_login**: Fecha del último inicio de sesión
- **phone_number**: Número de teléfono
- **status**: Estado

## Relaciones entre Entidades

- **League** tiene una relación de uno a muchos con **Club**. Cada club pertenece a una liga.
- **Club** tiene una relación de uno a muchos con **Player** a través de **Pass**. Un jugador puede estar asociado a un club mediante un pase.
- **Club** también tiene una relación de uno a muchos con **Sanction**. Una sanción puede ser aplicada a un club.
- **Player** tiene una relación de uno a uno con **Pass**. Cada pase está asociado a un único jugador.
- **Player** y **Club** están relacionados a través de **Request**. Las solicitudes de transferencia o liberación están asociadas a jugadores y clubes.
- **Sanction** puede estar asociada a un **Player** o a un **Club**. Las sanciones pueden ser aplicadas a jugadores o clubes.
- **Notification** está asociada a un **User**. Las notificaciones son enviadas a los usuarios.
- **Champion** tiene relaciones de muchos a uno con **Club** para el club campeón y el subcampeón.

## Roles de Usuarios y Permisos

- **Administrador**: Tiene acceso completo para gestionar todas las entidades del sistema, incluyendo la creación, modificación y eliminación de ligas, clubes, jugadores y usuarios.
- **Delegado**: Puede gestionar su propio club, incluyendo la administración de jugadores y la solicitud de transferencias.
- **Invitado**: Solo puede visualizar información pública sin realizar modificaciones.

## Flujo de Trabajo

1. **Autenticación y Autorización**: Los usuarios inician sesión y se autentican. Basado en su rol, se determinan los permisos disponibles.
2. **Gestión de Entidades**:
   - **Administradores** pueden crear, modificar o eliminar ligas, clubes y usuarios.
   - **Delegados** gestionan jugadores y envían solicitudes de transferencia o liberación.
3. **Solicitudes de Pase**: Los delegados envían solicitudes de pase para jugadores, que deben ser aprobadas o rechazadas por el Administrador.
4. **Sanciones**: Los administradores pueden emitir sanciones a jugadores o clubes.
5. **Notificaciones**: Se envían notificaciones a los usuarios para informar sobre eventos importantes.

## Tecnologías Utilizadas

- **Lenguaje de Programación**: JavaScript (Node.js)
- **Framework**: Express.js
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT (JSON Web Tokens), Bearer Tokens
- **Herramientas de Desarrollo**:
  - **Visual Studio Code**: Editor de código fuente con soporte para JavaScript y herramientas integradas de depuración.
  - **Postman**: Herramienta para probar APIs.
