# Task Manager Web App
---

## Features

### User Authentication
- User registration with email verification
- Login system secured with JWT
- Role-based access (Admin and Regular Users)
- Passwords securely hashed using bcrypt

### Task Categorization & Filtering
- Categorize tasks into user-defined categories
- Sort/filter tasks by:
  - Priority
  - Due Date
  - Status (Completed / Pending)

### 🔎 Search & Filter
- Search tasks by keywords
- Filter by category, due date, or priority

---

## 🧪 Technologies Used

### 🔧 Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

### Frontend
- React.js
- React Router
- Axios for API calls

---

### Task Management Interface
![Tasks Screenshot](.client/public/ss.png)

---

## To run locally, mongoDB, react setup is needed and .env setups accordingly

```
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```
## For frontend

```
npm i
npm run dev
```
# For Backend
```
npm i
nodemon app.js
```
