# Dave Smith Design Portfolio

A professional portfolio website built with Node.js and Express, showcasing design work and projects across multiple versions.

## Overview

This repository contains three portfolio versions:
- **Main Portfolio** (`/`) - Primary portfolio implementation
- **Portfolio v2** (`/v2`) - Second iteration with enhanced features
- **Portfolio v3** (`/v3`) - Latest version with modern improvements

This is a full-stack portfolio application featuring dynamic content rendering, calendar integration, and scheduled tasks management. The site is optimized for performance and includes automated cron jobs for data synchronization.

## Portfolio Versions

### Main Portfolio (/)
- Core portfolio functionality
- Base implementation

### Portfolio v2 (/v2)
- Enhanced features and improvements
- [Details to be documented after review]

### Portfolio v3 (/v3)
- Latest iteration
- [Details to be documented after review]

## Tech Stack

- **Backend**: Node.js with Express
- **Templating**: EJS
- **Deployment**: Heroku (via Procfile)
- **Build**: Visual Studio Project

## Project Structure

```
├── JS/
│   ├── config/          # Configuration settings
│   ├── routes/          # Route handlers and API endpoints
│   │   ├── cronjobs.js     # Scheduled tasks
│   │   ├── fogCalendar.js  # Calendar functionality
│   │   └── renderRoutes.js # Page rendering logic
├── views/               # EJS templates
│   ├── layout*.ejs      # Layout templates
│   ├── partials/        # Reusable template components
│   └── srcpages/        # Page content
├── server.js            # Main application entry point
└── package.json         # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with required environment variables

### Running Locally

```bash
npm start
```

The application will start on the configured port.

## Features

- Dynamic portfolio page rendering
- Calendar integration (`fogCalendar.js`)
- Automated scheduled tasks via cron jobs
- Responsive design with EJS templating
- Mobile-friendly layouts

## Deployment

This project is configured for Heroku deployment. The [Procfile](Procfile) specifies the entry point.

To deploy:
```bash
git push heroku main
```

## License

© 2024 Dave Smith Design. All rights reserved.

