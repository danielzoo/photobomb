# photobomb - social media application

photo sharing has never been easier. [visit me](https://photobombapp.me)

## hosting

deployed frontend onto vercel

- images resized on upload with serverless function
- cloudflare used as CDN for image caching, aws requests can get pricy 😬. pages will also load faster so thats a plus.

### my first confrontation with aws!

deployed api onto AWS ec2 micro instance

- did not need/use managed database service for redis/postgresql, installed them on machine instead.
- configured nginx to prevent unauthorized access and for possible future load balancing or microservice architecture.
- images saved in s3 bucket
- send login emails with ses
