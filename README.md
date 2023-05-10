# Photobomb

### What is it?

An online gallery to discover and share art with friends, created using TypeScript, Express, Next.js, Redis, and PostgreSQL

### Key Features:
+ Infinite scrolling feed powered by lazy loading pagination for users, built using Next.js
+ A passwordless authentication solution built using Redis that will send a temporary login link through email (AWS SES). Google SSO is also supported through OAuth2.
+ Asynchronously replicating photos at different sizes (resolutions).  The UI is a alot faster, since it will dynamically select the best copy for the user's device.
+ Next.js frontend with Express REST API. Comments, likes, photo metadata stored in PostgreSQL database.

### Features in progress:
+ Building a recommendation system for personalized feeds, for a more engaging user experience
+ High Avalability: Breaking up the monolith backend into microservices and deploying them on Kubernetes, allowing for horizontal scaling and near-zero downtime deploy times.
+ Building "Invite your friends" feature into the app.
