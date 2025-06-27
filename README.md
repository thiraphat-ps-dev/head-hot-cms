# Head Hot CMS - Payload CMS Project

This is a modern headless CMS built with Payload CMS, TypeScript, and MongoDB. It provides a powerful admin interface and flexible content management capabilities.

## Technology Stack

- **Payload CMS**: Modern headless CMS framework
- **TypeScript**: Type-safe development
- **MongoDB**: Document database for content storage
- **Next.js**: React framework for the admin interface
- **React**: UI library

## Quick Start

### Prerequisites

- Node.js 20.18.1 or higher
- MongoDB (local or cloud instance)
- npm or pnpm

### Local Development

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Configure your MongoDB connection in `.env`:

   ```env
   MONGODB_URI=mongodb://127.0.0.1/head-hot-cms
   ```

3. Install dependencies and start development server:

   ```bash
   npm install
   npm run dev
   ```

4. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

5. Follow the on-screen instructions to create your first admin user and start building your content management system.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run payload` - Access Payload CLI commands

## Project Structure

```
src/
├── app/           # Next.js app directory
├── collections/   # Payload collections (content models)
├── payload.config.ts  # Payload configuration
└── payload-types.ts   # Generated TypeScript types
```

## Features

- **Admin Dashboard**: Built-in admin interface for content management
- **TypeScript Support**: Full type safety throughout the project
- **MongoDB Integration**: Scalable document database
- **REST & GraphQL APIs**: Auto-generated APIs for your content
- **Authentication**: Built-in user management and authentication
- **Media Management**: File upload and management capabilities
- **Rich Text Editor**: Lexical-based rich text editing

## Development Guidelines

- Follow TypeScript best practices
- Use Payload's collection configurations for content modeling
- Implement proper validation for all content fields
- Use built-in authentication and authorization
- Follow security best practices for database connections

## Docker Support (Optional)

For local development with Docker:

```bash
docker-compose up -d
```

To do so, follow these steps:

- Modify the `MONGODB_URI` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URI` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
