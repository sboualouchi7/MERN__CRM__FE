# Lead Management CRM - Frontend

This is the frontend part of a simple CRM system for lead management. The application allows Employers to create and manage Managers and Leads, while Managers can update only the leads assigned to them.

## Features

- Authentication for Employers and Managers
- Role-based access control
- Dashboard with lead statistics (for Employers)
- Manager management (for Employers)
- Lead management (different capabilities based on role)

## Tech Stack

- React 18
- React Router v6
- Axios for API communication
- JWT for authentication

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd lead-management-crm-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:
```
REACT_APP_API_URL=http://localhost:5000/api
```
(Adjust the URL if your backend is running on a different port)

4. Start the development server
```bash
npm start
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

### Employer Journey
1. Login as an Employer
2. View the dashboard with lead statistics
3. Create and manage Managers
4. Create and manage Leads, assigning them to Managers

### Manager Journey
1. Login as a Manager
2. View and update Leads assigned to you
3. Add notes to Leads
4. Change Lead status

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components for different routes
- `src/context/` - Context providers (Authentication)
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions and API client

## API Integration

The frontend integrates with the backend through RESTful API endpoints using Axios. All authenticated requests include the JWT token in the Authorization header.