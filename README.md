# Vegan Recipe Planner

Vegan Recipe Planner is a fullstack web application where users can save vegan recipes and organize them into meal plans. The purpose of the app is to make it easier to keep recipes and meal planning in one place instead of doing everything manually.

## System overview

This application is made for users who want to manage vegan recipes together with nutrition-related information and meal planning.  
The frontend is built with React and Vite.  
The backend is built with Express.js.  
The database is MongoDB Atlas and is connected through Mongoose.  
Users can create, read, update, and delete recipes, and they can also add recipes to meal plans.  
The application also includes search, loading states, error handling, and auto-refresh [file:1066].

## Problem statement

This app helps users save vegan recipes and quickly plan meals for different days.

## Tech stack

- React
- Vite
- Express.js
- Node.js
- MongoDB Atlas
- Mongoose
- CSS
- concurrently

## Features

- Create new vegan recipes
- View all recipes in a structured list
- Edit recipes
- Delete recipes with confirmation
- Search recipes by title or meal type
- Add recipes to meal plans
- View meal plans
- Delete meal plans
- Show loading and error states in the UI
- Auto-refresh data with `setInterval`

## Project structure

```bash
Fullstack-lab/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── package.json
└── README.md
```

## Database design

The application uses 3 collections:

- `users`
- `recipes`
- `mealplans`

### Relationships

- `recipe.createdBy` → references `users._id`
- `mealPlan.userId` → references `users._id`
- `mealPlan.recipeId` → references `recipes._id`

### Example custom fields

The recipe collection includes domain-specific fields such as:

- `proteinGrams`
- `proteinSource`
- `caloriesPerServing`
- `mealType`

These fields make the application more specific to vegan nutrition and meal planning [file:1071].

## API routes

### Recipes

- `GET /api/recipes` → get all recipes
- `POST /api/recipes` → create a recipe
- `PUT /api/recipes/:id` → update a recipe
- `DELETE /api/recipes/:id` → delete a recipe

### Meal plans

- `GET /api/mealplans` → get all meal plans
- `POST /api/mealplans` → create a meal plan
- `DELETE /api/mealplans/:id` → delete a meal plan

## Example request body

### POST `/api/recipes`

```json
{
  "title": "Tofu Power Bowl",
  "mealType": "lunch",
  "caloriesPerServing": 540,
  "proteinGrams": 32,
  "proteinSource": "tofu",
  "ingredients": ["tofu", "rice", "broccoli", "soy sauce"],
  "instructions": "Cook the rice, fry the tofu, steam the broccoli, and combine everything in a bowl.",
  "createdBy": "YOUR_USER_ID"
}
```

### POST `/api/mealplans`

```json
{
  "userId": "YOUR_USER_ID",
  "recipeId": "YOUR_RECIPE_ID",
  "plannedDate": "2026-04-27",
  "mealType": "lunch"
}
```

## Environment variables

Create a `.env` file inside the `backend` folder and add:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

The backend reads `process.env.MONGO_URI` when connecting to MongoDB Atlas [file:1066].

## Installation

### 1. Clone the project

```bash
git clone https://github.com/bit-besart/Fullstack-lab.git
cd Fullstack-lab
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 5. Add environment variables

Create a `.env` file inside the `backend` folder and add your MongoDB Atlas connection string.

### 6. Start the project

Go back to the root folder and run:

```bash
npm run dev
```

The root `package.json` uses `concurrently` so both frontend and backend can start with one command [file:1060].

## Available scripts

### Root

```bash
npm run dev
```

Starts both frontend and backend together using `concurrently` [file:1060].

### Backend

```bash
npm run dev
```

Starts the Express server with Node.js [file:1065].

## Notes

- Secrets are stored in `.env` and should never be committed to Git.
- MongoDB Atlas is used as the cloud database.
- The backend follows the Router → Controller → Model pattern.
- The frontend is split into multiple components with different responsibilities [file:1066].

## Design decisions

I chose to make a vegan recipe planner because I often have a hard time deciding what to eat, so this app helps me organize recipes and meal plans in one place.

## Reflection

One challenge in the project was working with relationships between meal plans, recipes, and users.  
At first, the related recipe title and user name did not show correctly in the frontend because the backend returned only ObjectIds.  
I solved this by using Mongoose `populate()` so the related data could be shown properly in the UI.  
This helped me understand better how references work between MongoDB collections in a fullstack project [file:1070][file:1074].

## Running the app

After starting the project:

- the frontend runs with Vite
- the backend runs on port 5000 by default
- the backend connects to MongoDB Atlas using the connection string from `.env` [file:1066]

## Author

Besart 