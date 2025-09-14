# Compare Phones: The AI-Powered Smartphone Comparison Platform

This is a Next.js application built in Firebase Studio. It serves as a comprehensive platform for users to search, compare, and discover mobile phones, with a powerful, AI-driven admin panel for content management.

## Table of Contents

1.  [Core Features](#1-core-features)
2.  [Technology Stack](#2-technology-stack)
3.  [Getting Started](#3-getting-started)
4.  [Frontend Page Overview](#4-frontend-page-overview)
    -   [Homepage (`/`)](#homepage--)
    -   [Search Page (`/search`)](#search-page--search)
    -   [Phone Details Page (`/[brand]/[model]`)](#phone-details-page--brandmodel)
    -   [Comparison Pages (`/compare` & `/compare/[slug]`)](#comparison-pages--compare---compareslug)
    -   [Brand Listing Page (`/brands`)](#brand-listing-page--brands)
    -   [Category Pages (`/category/[slug]`)](#category-pages--categoryslug)
    -   [Static Content Pages (`/news`, `/guides`, `/deals`)](#static-content-pages--news--guides--deals)
    -   [User Authentication & Profile (`/login`, `/profile`)](#user-authentication--profile--login--profile)
5.  [Admin Panel (`/admin`)](#5-admin-panel--admin)

---

## 1. Core Features

-   **Homepage**: A dynamic landing page featuring various sections like Trending Phones, Latest Launches, Quick Compare, News, and Blog posts.
-   **Advanced Search**: Users can search for phones and apply a wide array of filters, including price, brand, RAM, storage, battery, and more.
-   **Side-by-Side Comparison**: A sticky comparison bar allows users to add up to four phones and view their specifications in a detailed, side-by-side table. Comparison URLs are shareable.
-   **Detailed Phone Pages**: Every phone has a dedicated page with a comprehensive breakdown of over 100+ specs, organized into collapsible categories.
-   **User Accounts & Wishlist**: Users can sign in with Google (Firebase Auth) to manage their profile and save phones to a personal wishlist.
-   **AI-Powered Admin Panel**: A sophisticated back-end for managing all site content, featuring AI tools to generate phone specs, news articles, and homepage content.

## 2. Technology Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
-   **Generative AI**: [Google Genkit](https://firebase.google.com/docs/genkit)
-   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
-   **Database (for user data)**: [Firestore](https://firebase.google.com/docs/firestore)
-   **Deployment**: Firebase App Hosting

## 3. Getting Started

To run the project locally, follow these steps:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Set up environment variables**:
    Create a `.env` file in the root of the project and add your Firebase project configuration keys.

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## 4. Frontend Page Overview

This section details the purpose and functionality of each user-facing page.

### Homepage (`/`)

The main entry point of the application. It's designed to be engaging and provide multiple paths for discovery.
- **Hero Section**: Introduces the site's value proposition.
- **Search Bar**: Allows for quick searches.
- **Dynamic Content Sections**: Features numerous carousels and grids for:
  - Trending, Latest, Flagship, Gaming, and other phone categories.
  - Quick Compare tool.
  - Popular and Trending comparisons.
  - "Browse by Specs" category links.
  - Content modules for News, Blog, Events, and Leaks.

### Search Page (`/search`)

A powerful search and filtering interface.
- **Functionality**: Users can perform a text-based search or use the extensive filtering sidebar to narrow down results based on dozens of specifications like brand, price range, RAM, battery capacity, and more.
- **Results**: Phones matching the criteria are displayed in a grid of `PhoneCard` components.
- **Contextual**: The page can be pre-filtered by navigating from other parts of the site (e.g., clicking a brand on the `/brands` page).

### Phone Details Page (`/[brand]/[model]`)

This page provides an exhaustive overview of a single phone.
- **Layout**: A three-column layout featuring a sticky image carousel and purchase options on the left, and detailed specs on the right.
- **Content**:
  - Image gallery and key specs overview.
  - Embedded YouTube video review.
  - A comprehensive specification table, organized into collapsible accordions (Network, Display, Camera, etc.).
  - A simulated user reviews and ratings section.

### Comparison Pages (`/compare` & `/compare/[slug]`)

The core comparison experience.
- **`/compare`**: The default view, which shows any phones the user has added to their comparison list from other pages.
- **`/compare/[slug]`**: A shareable URL that loads a specific set of phones for comparison.
- **Functionality**: Displays up to four phones side-by-side. The main view is a large table where each row corresponds to a specific technical spec, making it easy to see differences at a glance.

### Brand Listing Page (`/brands`)

An alphabetical directory of all phone manufacturers.
- **Layout**: A grid of cards, each representing a brand. Many feature the brand's logo.
- **Functionality**: Clicking a brand card navigates the user to the `/search` page, pre-filtered for that specific brand.

### Category Pages (`/category/[slug]`)

These pages list the top phones for a specific "best of" category.
- **Examples**: `/category/best-camera-phones`, `/category/best-battery-phones`.
- **Functionality**: Displays a grid of phones that are pre-sorted and filtered to match the category's theme.

### Static Content Pages (`/news`, `/guides`, `/deals`)

These pages provide additional content to engage users.
- **`/news`**: Placeholder for the latest industry news.
- **`/guides`**: Placeholder for buying guides and tips.
- **`/deals`**: A page simulating the display of discounted phones.

### User Authentication & Profile (`/login`, `/profile`)

- **`/login`**: A simple page allowing users to sign in with their Google account via Firebase Authentication.
- **`/profile`**: Once logged in, users can view their profile information and see all the phones they have added to their **wishlist**.

## 5. Admin Panel (`/admin`)

The application includes a comprehensive, password-protected admin panel for site management. For a complete guide on its features and functionality, please refer to its dedicated README file:

-   **[Admin Panel README](./src/app/admin/README.md)**
