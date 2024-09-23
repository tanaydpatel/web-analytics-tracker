# Project Overview

This project focuses on the onboarding flow of integrating a customized "analytics" script that can track user behavior on a web platform.

## Live demo

- Go to: [web-analytics-custom-integration.vercel.app](https://web-analytics-custom-integration.vercel.app/)
- Redirect to dashboard
- Enter `tanay` as trackingId
- Open demo [tracking page](https://web-analytics-custom-integration.vercel.app/tracking-page.html)
- Go back to dashboard and see the live events populate in events table.
- You can also copy the personalized script totrack your own page with your own `trackingId`.

## How to setup

- Run `pnpm i`
- Update the `.env` file with `DATABASE_URL`
- Run `pnpm run db:generate`
- Run `pnpm run dev`

### Custom Analytics Script

The custom analytics script is coupled with a tracking ID which is associated with a customer account. For every user, it assigns a `userId` and stores it in `localStorage`. The script tracks the following events:

- Initialize
- Click
- Page view
- Form submission
- Email

All these events are stored in the database with a unique ID for each event. Later, all these events can be fetched for a specific tracking ID, providing a list of all the logs and metadata with timestamps for detailed analytics.

### Completed Features

#### Part 1:

- Implemented Figma mocks with Next.js App Router
- Implemented the sidebar view
- Made the table in the Event Testing view update in real-time as events come in (used polling)
- Added syntax highlighting to the code snippet preview
- Responsive design

#### Part 2:

- Tracking events
- Script initialization
  - Track page view
  - Track email entered
  - Track click on page element

When emitting the events to the backend, the following metadata is included:

- Details relevant to the event (e.g., element ID)
- Visitor ID

\*Note: You will need to determine how to uniquely identify the page visitor so that multiple events sent by the same user can be grouped together later on.

### Tech Stack

- Typescript
- Next.js App Router
  - Front End
  - Serverless Backend
- Vercel (hosting)
- Tailwind CSS
- PostgreSQL backend
- Prisma
