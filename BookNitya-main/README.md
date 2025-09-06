# Book Store Application

This is a MERN stack Book Store application with a React frontend and an Express/MongoDB backend.

## Prerequisites

- Node.js (v16 or later recommended)
- npm
- MongoDB Atlas account or local MongoDB instance

## Setup and Running

### Backend

1. Navigate to the `server` directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory (already provided) with the following variables:

```
PORT=5002
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection URI.

4. Start the backend server:

```bash
npm run dev
```

The backend server will start on port 5002.

### Frontend

1. Navigate to the `client` directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

The frontend will start and proxy API requests to the backend server.

## Features

- View list of books with search functionality.
- Add new books.
- Edit existing books.
- Delete books.

## Notes

- The backend server runs on port 5002 to avoid port conflicts.
- The frontend uses Vite and React Router for routing.
- Edit and Delete buttons are available on each book card in the Books page.

## Manual Testing

- Start backend and frontend servers as described above.
- Use the UI to add, edit, delete, and search books.
- Verify changes are reflected immediately.

## Troubleshooting

- If you encounter port conflicts, ensure no other process is using port 5002.
- Check MongoDB connection string and network access.
- For any issues, check the terminal logs for errors.
