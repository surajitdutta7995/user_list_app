# MERN CRUD Demo

A simple MERN (MongoDB, Express.js, React.js, Node.js) stack application demonstrating basic CRUD operations without authentication.

## Features

- **Create**: Add new users with name, email, age, and city
- **Read**: View all users in a responsive grid layout
- **Update**: Edit existing user information
- **Delete**: Remove users with confirmation

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling

### Frontend
- **React.js** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with responsive design

## Project Structure

```
mern-crud-demo/
├── server.js              # Express server and API routes
├── package.json           # Server dependencies
├── .env                   # Environment variables
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styling
│   │   └── ...
│   └── package.json      # Client dependencies
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user by ID |
| DELETE | `/api/users/:id` | Delete user by ID |
| GET | `/api/health` | Health check |

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Database Setup

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Database will be created automatically

**Option B: MongoDB Atlas**
- Create a free account at [MongoDB Atlas](https://cloud.mongodb.com/)
- Create a cluster and get connection string
- Update the `.env` file with your connection string

### 3. Environment Configuration

The `.env` file is already configured for local development:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_crud_demo
```

For MongoDB Atlas, update the `MONGODB_URI`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern_crud_demo
```

### 4. Running the Application

**Development Mode (Both servers):**

Terminal 1 - Start the backend server:
```bash
npm run dev
```

Terminal 2 - Start the React frontend:
```bash
npm run client
```

**Or run them separately:**

Backend only:
```bash
npm start
# or
npm run server
```

Frontend only:
```bash
cd client
npm start
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000 (shows available endpoints)

## Usage

1. **Add Users**: Fill out the form with name, email, age, and city
2. **View Users**: All users are displayed in cards with their information
3. **Edit Users**: Click the "Edit" button on any user card to modify their data
4. **Delete Users**: Click the "Delete" button and confirm to remove a user

## API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Get all users
curl http://localhost:5000/api/users

# Create a new user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":25,"city":"New York"}'

# Update a user (replace USER_ID with actual ID)
curl -X PUT http://localhost:5000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"John Smith","email":"john.smith@example.com","age":26,"city":"Boston"}'

# Delete a user (replace USER_ID with actual ID)
curl -X DELETE http://localhost:5000/api/users/USER_ID
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running (local) or connection string is correct (Atlas)
   - Check network connectivity for Atlas

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill existing processes on ports 3000 or 5000

3. **CORS Errors**
   - Ensure both frontend and backend are running
   - Check that axios requests are pointing to correct backend URL

4. **npm Install Errors**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again
   - Check Node.js version compatibility

## Learning Objectives

This project demonstrates:
- RESTful API design
- MongoDB database operations
- React state management
- HTTP requests with Axios
- Form handling and validation
- Responsive CSS design
- Error handling
- Full-stack JavaScript development

## Next Steps

To extend this project, consider adding:
- User authentication and authorization
- Data validation and sanitization
- Pagination for large datasets
- Search and filtering functionality
- Image upload capability
- Unit and integration tests
- Deployment to cloud platforms

## License

MIT License - Feel free to use this project for learning and development purposes.