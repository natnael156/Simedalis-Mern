# Gospel Team Website

A full-stack web application for a gospel team ministry with admin and client sides.

## Features

### Client Side
- Home page with mission overview
- About page (Mission, Vision, Volunteerism)
- Donation page with bank info and screenshot upload
- Gallery to view ministry photos
- Announcements page
- Contact page

### Admin Side
- Dashboard with notifications
- Manage donations (verify/reject with notifications)
- Upload and manage gallery images
- Create and edit announcements
- User management with role permissions (admin/user)

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+ or v8.0+)

### Installation

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Create uploads directories:
```bash
mkdir -p uploads/donations uploads/gallery
```

4. Configure environment variables in `.env`:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=gospel_team
JWT_SECRET=your_secret_key_here
```

5. Create MySQL database:
```sql
CREATE DATABASE gospel_team;
```

6. Run backend (tables will be created automatically):
```bash
cd backend
npm start
```

7. Run frontend (in new terminal):
```bash
cd frontend
npm start
```

8. Create first admin user via MySQL or API:
```sql
-- After running the app once (tables created), you can manually insert an admin:
-- Password: admin123 (hashed)
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@gospelteam.org', '$2a$10$YourHashedPasswordHere', 'admin');
```

Or use the register API endpoint with role: 'admin'

## Tech Stack
- Frontend: React, React Router
- Backend: Node.js, Express
- Database: MySQL
- Authentication: JWT
- File Upload: Multer
