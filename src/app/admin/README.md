# MobilePhonesPro Admin Panel

Welcome to the MobilePhonesPro Admin Panel. This is the central hub for managing all content, data, and settings for the main website. This guide provides a comprehensive overview of each section.

## Table of Contents

1.  [Dashboard (`/admin`)](#1-dashboard-admin)
2.  [Manage Phones (`/admin/phones`)](#2-manage-phones-adminphones)
3.  [AI Spec Generator (`/admin/generate-spec`)](#3-ai-spec-generator-admingenerate-spec)
4.  [Homepage Content Automation (`/admin/content-automation`)](#4-homepage-content-automation-admincontent-automation)
5.  [Blog & Guides (`/admin/blog`)](#5-blog--guides-adminblog)
6.  [News Articles (`/admin/news`)](#6-news-articles-adminnews)
7.  [Events (`/admin/events`)](#7-events-adminevents)
8.  [Leaks & Rumors (`/admin/leaks`)](#8-leaks--rumors-adminleaks)
9.  [SEO Management (`/admin/seo`)](#9-seo-management-adminseo)

---

### 1. Dashboard (`/admin`)

The dashboard is the main landing page after logging in. It provides a high-level overview and quick access to common tasks.

-   **Statistics Cards**: At the top, you'll find key metrics:
    -   **Total Phones**: The total number of phones in the database.
    -   **Published Articles**: The total count of published blog posts and news articles.
    -   **AI Generations**: A counter for AI content generation usage.
-   **Quick Actions**: A list of buttons for the most frequent tasks, allowing you to jump directly into:
    -   Adding a new phone.
    -   Generating news articles with AI.
    -   Writing a new blog post.
    -   Automating homepage content.
-   **Recent Activity**: A simulated feed showing the latest actions performed in the admin panel, such as user sign-ups, AI content generation, and spec updates.

### 2. Manage Phones (`/admin/phones`)

This section is for managing the core phone catalog.

-   **Phones Table**: A comprehensive table lists every phone in the database with the following columns:
    -   `Image`: A thumbnail of the phone.
    -   `Brand` & `Model`: The manufacturer and model name.
    -   `Price`: The retail price.
    -   `Category`: The phone's form factor (e.g., Bar, Foldable).
    -   `Tags`: Automatically generated badges for key features (e.g., Flagship, Gaming, Big Battery).
-   **Actions**:
    -   **Add New Phone**: A button at the top to create a new phone entry. (Note: Currently leads to a placeholder edit page).
    -   **Edit**: An "Edit" option in the dropdown for each phone, which takes you to the **Edit Phone** page.

#### Edit Phone Page (`/admin/phones/edit/[id]`)

This page allows you to modify every single specification for a selected phone.

-   **Form Fields**: The form is divided into collapsible sections for easy navigation:
    -   **Basic Information**: Edit core details like Brand, Model, Price, and Image URLs.
    -   **Full Specifications**: A comprehensive set of accordions, categorized by spec type (Network, Display, Camera, etc.), containing input fields for every detail.
-   **Saving**: The "Save Changes" button simulates updating the phone data. In a real application, this would save the changes to the database.

### 3. AI Spec Generator (`/admin/generate-spec`)

A powerful tool to automatically generate detailed phone specifications using AI.

-   **Input**: Simply enter the **Brand Name** and **Model Name** of a phone.
-   **Generation**: Click "Generate Specifications". The AI will fetch and populate over 100+ data points for the phone. This process may take a moment.
-   **Output**: The generated specs are displayed in organized, collapsible accordion sections.
-   **Saving**: A "Save to Database" button appears after generation. This is a placeholder for a future database integration.

### 4. Homepage Content Automation (`/admin/content-automation`)

This page allows you to use AI to generate content for various dynamic sections of the main homepage.

-   **Content Sections**: The page is divided into cards, each corresponding to a specific section on the homepage (e.g., Trending Phones, Latest Launches, Upcoming Events, Blog Posts).
-   **AI Generation**: Each card has a "Generate" button. Clicking it invokes an AI flow tailored to that specific section.
-   **Staging & Review**: The generated content appears in a "View Generated Content" accordion. This acts as a staging area, allowing you to review the AI's output before it goes live.
-   **Publishing**: A "Publish" button appears next to generated content. *This is currently a simulation.* In a full implementation, this would update the live data that the homepage displays.

### 5. Blog & Guides (`/admin/blog`)

This is a placeholder page for managing long-form content like blog posts and guides.

-   **Functionality**: It includes a "New Post" button and a placeholder area for a list of all posts.
-   **Future Use**: This page would be built out to include a rich text editor for writing articles, managing publication dates, authors, and categories.

### 6. News Articles (`/admin/news`)

A complete workflow for creating news content with AI assistance.

-   **AI Generation**:
    -   Click **"Generate with AI"** to have the AI create a list of draft news articles, including a headline, category badge, image URL, and the full article content in Markdown.
-   **Staging and Review**:
    -   The generated articles appear in a **"Staged Articles for Review"** section.
    -   Each staged article has an **"Edit"** button.
-   **Editing (`/admin/news/edit/[id]`)**:
    -   Clicking "Edit" takes you to a dedicated editor page where you can modify the `Title`, `Badge`, `Image URL`, and the full `Content` of the article in a textarea.
-   **Publishing**:
    -   Back on the main news page, the **"Publish X Articles"** button simulates publishing the staged content, making it live on the site.

### 7. Events (`/admin/events`)

This is a placeholder page intended for managing the "Upcoming Events" calendar.

-   **Functionality**: Includes a "New Event" button and a placeholder list.
-   **Future Use**: This would be developed to allow manual creation and editing of event details like date, title, and description.

### 8. Leaks & Rumors (`/admin/leaks`)

This is a placeholder page for managing content for the "Leaks & Rumors" section.

-   **Functionality**: Includes a "New Leak" button and a placeholder list.
-   **Future Use**: This page would allow you to add and manage short, timely updates on upcoming phones and industry news.

### 9. SEO Management (`/admin/seo`)

A centralized dashboard for controlling the Search Engine Optimization (SEO) metadata for all major pages and page templates.

-   **Templates**: The page is organized into accordion sections for each page type:
    -   Homepage
    -   Phone Page (template for all individual phone details pages)
    -   Comparison Page (template)
    -   Brands Page
    -   News, Guides, Events, and Leaks pages.
-   **Editable Fields**: For each template, you can edit the:
    -   **SEO Title**: The text that appears in the browser tab and search engine results.
    -   **Meta Description**: The short summary that appears under the title in search results.
-   **Sitemap**: Includes a button to simulate the regeneration of the `/sitemap.xml` file, which is crucial for search engine crawlers.