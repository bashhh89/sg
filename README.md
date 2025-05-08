# AI Efficiency Scorecard

## Project Overview

The AI Efficiency Scorecard is an interactive assessment tool that helps organizations evaluate their AI maturity level and receive personalized recommendations.

## ⚠️ Important Setup Instructions ⚠️

This project has a nested directory structure. Make sure you are in the correct directory before running commands.

### Correct Directory Structure:

```
E:\final\             <- Root project folder (outer final)
└── final\            <- Actual Next.js application (inner final)
    ├── app\
    ├── components\
    ├── package.json  <- This is where the npm/pnpm scripts are defined
    └── ...
```

### Setup Steps:

1. Navigate to the inner "final" directory:
   ```bash
   cd final
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm run dev
   ```

4. The application will be available at:
   ```
   http://localhost:3003
   ```

## Key Features

- Industry-specific AI maturity assessment
- Comprehensive question flow across multiple phases
- AI-powered report generation
- Auto-complete testing functionality
- Collapsible Q&A history for result review

## Available Scripts

Inside the inner "final" directory:

- `pnpm run dev` - Starts the development server on port 3003
- `pnpm run build` - Builds the application for production
- `pnpm run start` - Runs the built application in production mode
- `pnpm run lint` - Runs ESLint to check for code quality issues

## Project Documents

- `project-overview.md` - Non-technical overview of the project
- `progress.md` - Detailed progress report with completed features and next steps

## Troubleshooting

If you encounter issues with running scripts, make sure:
1. You are in the inner "final" directory
2. You have all dependencies installed
3. You are using the correct package manager (pnpm)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
