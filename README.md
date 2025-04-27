# Link Management App

A modern web application built with Next.js for managing and organizing web links with automatic metadata extraction, categorization, and search capabilities.

## Features

- 🔍 **Smart Link Management**: Automatically fetches metadata (title, description, thumbnail) from URLs
- 📂 **Category Organization**: Create and manage categories to organize links
- 🎯 **Flexible Views**: Toggle between grid and list views
- 🔎 **Search Functionality**: Search through links by title, description, or URL
- ⚡ **Real-time Updates**: Instant updates when adding or modifying links
- 📱 **Responsive Design**: Works seamlessly across devices

## Tech Stack

- **Frontend**: Next.js 15.3
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **Icons**: React Icons

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd link-manager-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
link-manager-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── categories/    # Category-related endpoints
│   │   └── links/         # Link-related endpoints
│   ├── contexts/          # React contexts
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Main page component
├── prisma/                # Prisma configuration and schemas
│   ├── schema.prisma     # Database schema
│   └── dev.db           # SQLite database file
└── public/               # Static assets
```

## Database Schema

### Category
- `id`: INTEGER (Primary Key)
- `name`: TEXT

### Link
- `id`: INTEGER (Primary Key)
- `url`: TEXT
- `title`: TEXT
- `description`: TEXT
- `thumbnail`: TEXT
- `categoryId`: INTEGER (Foreign Key)
- `createdAt`: DATETIME
- `updatedAt`: DATETIME

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Development Notes

- All new links without a category are automatically added to "Miscellaneous"
- Metadata fetching is automatic when adding new links
- Categories are sorted alphabetically
- The application uses SQLite for simplicity, but can be adapted for other databases

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
