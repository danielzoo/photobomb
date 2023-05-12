# Photobomb


### What is it?
An online gallery to discover and share art with friends, created using TypeScript, Express, Next.js, Redis, and PostgreSQL

<img width="640" alt="Screenshot 2023-05-12 at 1 00 46 AM" src="https://github.com/danielrhzhu/photobomb/assets/86289451/ba90dd22-6ebf-417d-a0df-dfc30849e495">
<img width="640" alt="Screenshot 2023-05-12 at 12 58 49 AM" src="https://github.com/danielrhzhu/photobomb/assets/86289451/4de6ad44-6550-4d55-aba8-9cd85295697b">
  
### Key Features:
+ Infinite scrolling feed powered by lazy loading pagination for users, built using Next.js
+ A passwordless authentication solution built using Redis that will send a temporary login link through email (AWS SES). Google SSO is also supported through OAuth2.
+ Asynchronously replicating photos at different sizes (resolutions).  The UI is a alot faster, since it will dynamically select the best copy for the user's device.
+ Next.js frontend with Express REST API. Comments, likes, photo metadata stored in PostgreSQL database.

### Features in progress:
+ Building a recommendation system for personalized feeds, for a more engaging user experience
+ High Avalability: Breaking up the monolith backend into microservices and deploying them on Kubernetes, allowing for horizontal scaling and near-zero downtime deploy times.
+ Building "Invite your friends" feature into the app.
