# Emacommerce

Ecommerce realizado como aplicación distribuida con NestJS y TypeScript

## Diagrama

![Diagrama](https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/byl9xo7p9xesg3fyurbf)

## Description

Se ha usado Arquitectura Hexagonal + Vertical Slicing para el diseño de la aplicación.
<br/>
Las tecnologías usadas para este proyecto son: NestJS como Framework, TypeScript y Node como entorno de ejecución.
<br/>
Se ha usado Arquitectura de Microservicios para el desarrollo de la aplicación.
<br/>
Para la mensajería se ha usado RabbitMQ, Nats, Kafka, MQTT y gRPC.
<br/>
Para la base de datos se ha usado DynamoDB, SQLite, MySQL y MariaDB.
<br/>
Para el despliegue se ha usado Docker y Kubernetes.
<br/>
Para el monitoreo se ha usado Prometheus y Grafana.
<br/>
Se ha usado Keycloak como autenticación y autorización.
<br/>
Se ha hecho uso de Ingress Controllers para el balanceo de carga.
<br/>
Se ha usado Linkerd como servicio de enlace para la comunicación entre los microservicios.
<br/>
Se ha usado OWASP ZAP para la inspección de seguridad.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
