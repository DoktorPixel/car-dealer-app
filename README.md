# Car Dealer App

## Overview

This application is an enhanced interface for searching vehicles by make and model year. Users can select a vehicle make and model year, then view available models on a separate page.

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DoktorPixel/car-dealer-app.git

   ```

2. Navigate to the project directory:

````bash

cd car-dealer-app

Install dependencies:

npm install

Run the application:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

    Select vehicle make and model year.
    Navigate to the results page after selecting parameters.
    Display vehicle models based on the selected parameters.
    User-friendly interface styled with Tailwind CSS.

## Architecture

The application is built using Next.js, React, and Tailwind CSS.

    Key components:
        pages/: contains the application pages, including the filter and results pages.
        components/: reusable UI components.
        services/: API interactions for fetching vehicle makes and models.

## Technologies Used

    Next.js: A React framework that provides server-side rendering and static generation.
    Tailwind CSS: A utility-first CSS framework for fast and flexible design.
    React Suspense: For managing loading states for data fetching and component loading.
