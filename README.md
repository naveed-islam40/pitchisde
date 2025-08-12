# PitchSide V0.1

## Introduction

PitchSide is a comprehensive football platform designed to provide live scores, in-depth statistics, and real-time updates. This documentation serves as a guide for developers to understand, integrate, and extend the functionality of PitchSide effectively.

## Current Features

The following features are currently available in the application, focusing on viewing and exploring football data:

- **Player Details**: View comprehensive information about players, including their stats and career history.
- **League Details**: Access detailed information about leagues, including standings, participating teams, and schedules.
- **Fixture Details**: Explore match schedules, results, and related information for upcoming and past fixtures.
- **Team Details**: Get insights into teams, including rosters, performance statistics, and historical data.
- **Search Functionality**:
  - Search for leagues by name.
  - Search for teams by name.
- **Season Statistics**:
  - View league statistics across different seasons.
  - Access player statistics for specific seasons, showcasing their performance trends.

The current version of PitchSide is focused entirely on providing a rich, data-centric experience to users, enabling them to explore football information effortlessly.

## Tools and Technologies

The development of PitchSide leverages the following tools and technologies:

- **Framework**: [Next.js](https://nextjs.org/) - A React-based framework for building server-side rendered and static web applications.
- **Routing**: Built-in routing provided by Next.js.
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) - Simplifies state management with powerful tools and conventions.
- **API Integration**: [Axios](https://axios-http.com/) - A promise-based HTTP client for making API requests.
- **Data Fetching**: [React Query](https://tanstack.com/query/v5) - Handles server state and caching for data fetching.
- **UI Libraries**:
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for styling.
  - [Headless UI](https://headlessui.dev/) - Accessible UI primitives.
  - [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components for building modern web apps.
- **Charts and Visualization**: [Recharts](https://recharts.org/) and [Nivo](https://nivo.rocks/) - Libraries for creating data visualizations.
- **Date Handling**: [date-fns](https://date-fns.org/) and [Day.js](https://day.js.org/) - Libraries for manipulating and formatting dates.
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript.
- **Build Tool**: [pnpm](https://pnpm.io/) - A fast, disk space-efficient package manager.

## Folder Structure

The project is organized into the following folders to ensure scalability and maintainability:

- **public**: Handles static assets such as images and icons.
- **src**: Contains the main application logic and is structured as follows:
  - **assets**: Used for static assets imported directly into the application, such as images or SVGs.
  - **components**: Contains reusable components used throughout the app.
  - **contexts**: Provides contexts for various pages, such as league, team, and player contexts.
  - **features**: Implements a feature-based structure, where each feature (e.g., League, Player, Match Details, Standings) has its own folder containing relevant UI components and hooks from React Query.
  - **fonts**: Contains font exports managed via `next/fonts/google`.
  - **hooks**: Includes reusable general hooks for application logic.
  - **layouts**: Defines page-specific layouts, such as Team and League layouts.
  - **lib**: Contains general-purpose utility functions.
  - **services**: Manages all Axios API calls.
  - **utils**: Holds types, generics, constants, and the Axios instance for consistent API integration.
  - **styles**: Contains global styles for the application.
  - **pages**: Implements routing logic for the application. It also handles server-side data fetching, with components designed to manage this logic effectively.

This structure ensures clear separation of concerns, making it easier to develop, maintain, and scale the application.

## Features
