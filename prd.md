# Link Management App - PRD

## Overview
A simple and efficient web application to manage and categorize user links, providing easy navigation, search, and visual previews.

## Tech Stack
- **Frontend**: Next.js
- **Database**: SQLite

## Features

### 1. Link Categorization
- Users can categorize links into specific categories.
- If a category is not assigned, the link will automatically be placed into a **Miscellaneous** category.

### 2. Category Management
- Users can **create**, **edit**, and **delete** categories.
- Each category can have a custom name.
- Categories will be displayed in a **navigation sidebar** on the left.

### 3. Add Link
- Users can add new links and assign them to a category.
- If no category is selected, the link is added to **Miscellaneous**.
- On link addition, metadata such as:
  - **Title**
  - **Thumbnail Image**
  - **Description**
  will be fetched automatically from the URL.

### 4. Metadata and Thumbnail Display
- Links will be shown with their thumbnail, title, and description.
- User can toggle between:
  - **Grid View** (cards with thumbnails)
  - **List View** (simplified list format)

### 5. Navigation Sidebar
- Categories will be shown as a list on the **left sidebar**.
- Clicking a category will filter and display links belonging to that category.

### 6. Search Functionality
- A **search bar** will be provided at the top.
- Users can search links by:
  - Title
  - Description
  - URL

## User Stories
- As a user, I want to **create categories** so I can organize my links better.
- As a user, I want to **add a link** easily and see its thumbnail and description.
- As a user, I want the app to **default links to Miscellaneous** if no category is selected.
- As a user, I want to **switch between list view and grid view** depending on my preference.
- As a user, I want a **sidebar** where I can **quickly jump to a category**.
- As a user, I want to **search links** quickly to find what I need.

## Database Structure (Draft)

### Tables:

**Category**
| Field        | Type         | Description                  |
| ------------ | ------------ | ----------------------------- |
| id           | INTEGER (PK) | Auto-incremented ID           |
| name         | TEXT         | Name of the category          |

**Link**
| Field        | Type          | Description                  |
| ------------ | ------------- | ----------------------------- |
| id           | INTEGER (PK)  | Auto-incremented ID           |
| url          | TEXT          | Link URL                     |
| title        | TEXT          | Title fetched from metadata  |
| description  | TEXT          | Description fetched from metadata |
| thumbnail    | TEXT          | Thumbnail URL fetched from metadata |
| categoryId   | INTEGER (FK)  | References Category(id)      |

