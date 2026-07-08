# CourseAppBackend

A backend-focused course marketplace app with basic CRUD operations from both user and admin perspectives. Built with Express, Mongoose, JWT, and dotenv.

## Tech Stack
- Express
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- dotenv

## Setup Instructions

1. Clone this repository to your local machine.
2. Open the folder in your code editor and run:
```bash
   npm install
```
3. Create a `.env` file in the root directory with the following:
   - MONGODB_CONNECTION_STRING=your_mongodb_connection_string
   - ADMIN_JWT_PASSKEY=your_admin_jwt_secret
   - USER_JWT_PASSKEY=your_user_jwt_secret

5. Start the server:
```bash
   node script.js
```
5. Test the routes using Postman, Insomnia, or Thunder Client.

## Features
- User and admin signup/signin
- Admins can create and update courses (delete functionality coming soon)
- Users can purchase courses (no payment gateway yet — purchases are free)
- Users can view their purchased courses

## API Endpoints

### User Routes
| Method | Route | Description |
|---|---|---|
| POST | `/shricourse/v1/user/signup` | Register a new user |
| POST | `/shricourse/v1/user/signin` | Login and receive a JWT |
| GET | `/shricourse/v1/user/mycourse` | View purchased courses (auth required) |
| POST | `/shricourse/v1/user/purchase` | Purchase a course (auth required) |

### Admin Routes
| Method | Route | Description |
|---|---|---|
| POST | `/shricourse/v1/admin/signup` | Register a new admin |
| POST | `/shricourse/v1/admin/signin` | Login and receive a JWT |
| POST | `/shricourse/v1/admin/createcourse` | Create a new course (auth required) |
| PUT | `/shricourse/v1/admin/editcourse` | Update an existing course (auth required) |

## ToDo more
- [ ] Delete course functionality
- [ ] Payment gateway integration
- [ ] Input validation
