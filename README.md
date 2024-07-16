![Logo](docs/logo-light.svg)

This is a webapp that holds and presents images, for drawing reference. This repo holds the backend code/

See the [planning document](./PLANNING.md) for details about the project design and future plans, and the [front-end repo](https://github.com/DanielOaks/drawref-frontend) for the interface.

## Environment variables

[.env.sample](./.env.sample) includes descriptions of all the environment variables you can use to configure the backend. These environment variables also work on the docker image.

## Docker quick start

You can get the backend up and running quickly by using Docker:

```bash
# in some specific directory
curl -o .env https://raw.githubusercontent.com/DanielOaks/drawref-backend/release/.env.sample
vim .env
docker run -it --env-file .env -p 3300:3300 ghcr.io/danieloaks/drawref-backend:release
```

The `.env` file also includes sample docker calls you can use to set up the dependencies:

- Postgres
- Minio (or S3)

## Development

If you want to get started developing the app, you can use the below commands.

### Setup

Make sure to install the dependencies:

```bash
asdf install  # sets up the right version of nodejs
yarn install
```

### Development Server

Start the development server on http://localhost:3300

```bash
yarn dev
```

### Production

Build the application for production:

```bash
yarn build
```

Start production build:

```bash
yarn start
```

## Licensing

The software itself is distributed under the ISC license. The sample data (in the `/samples` folder) is distributed under different terms as described in [the LICENSE file](./LICENSE.md).
