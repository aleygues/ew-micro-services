# Micro services

You should navigate through the banches in the following order:

## `mono-app`

This is the base monolith app, launch it with `docker compose -f mono.docker-compose.yml up --build` and play with it!

You may launch Postman, import both the collection and environment files and run the queries to create a job offer and submit your resume (you should select a file like `artillery/data/cv1.txt`).

You may run artillery tests by going into `./artillery`, run `npm i` to get the dependencies and run `npx artillery run scenario.yml`. You can configure your screnario in this very last file.

## `micro-services`

This contains the 2 services (jobs and applications), launch it with `docker compose -f ms.docker-compose.yml up --build` and play with it! Use Postman and Artillery (results should be better).

Please note that the `app` folder becomes useless!

## `micro-services-rabbitmq`

This contains the 2 services with RabbitMQ for the comunication, launch it with `docker compose -f ms-rabbitmq.docker-compose.yml up --build` and play with it!

You can check the RabbitMQ website to see your messages going through!

## `micro-services-rabbitmq-nginx`

This contains the 2 services with RabbitMQ for the comunication and Nginx for the loadbalancing, launch it with `docker compose -f ms-rabbitmq-nginx.docker-compose.yml up --build --scale applications-app=3` and play with it!

Please note the new `--scale applications-app=3` option that will tell Docker to create 3 replacas of this service.

Please note that you may have to update the `ms-rabbitmq-nginx.docker-compose.yml` and `nginx/nginx.conf` files by replacing the `ew-micro-services` string by your root folder name (if you changed it).
