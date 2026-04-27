# Vegan Recipe Planner

Vegan Recipe Planner is a fullstack web application where users can save vegan recipes and organize them into meal plans.

## System overview

This application is made for users who want to manage vegan recipes and meal planning in one place.  
The frontend is built with React and Vite.  
The backend is built with Express.js.  
The database is MongoDB Atlas with Mongoose.  
Users can create, view, update, and delete recipes, and also add recipes to meal plans.

## Problem statement

This app helps users save vegan recipes and plan meals for different days.

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

- Create recipes
- View recipes
- Edit recipes
- Delete recipes
- Search recipes by title or meal type
- Add recipes to meal plans
- View meal plans
- Delete meal plans

## Project structure

```bash
Fullstack-lab/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── package.json
└── README.md
```

## Database design

The application uses 3 collections:

- `users`
- `recipes`
- `mealplans`

### Relationships

- `recipe.createdBy` references `users._id`
- `mealPlan.userId` references `users._id`
- `mealPlan.recipeId` references `recipes._id`

## API routes

### Recipes

- `GET /api/recipes`
- `POST /api/recipes`
- `PUT /api/recipes/:id`
- `DELETE /api/recipes/:id`

### Meal plans

- `GET /api/mealplans`
- `POST /api/mealplans`
- `DELETE /api/mealplans/:id`

## Environment variables

Create a `.env` file inside the `backend` folder and add:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

## Installation

### 1. Clone the project

```bash
git clone https://github.com/bit-besart/Fullstack-lab.git
cd Fullstack-lab
```

### 2. Install dependencies

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Start the project

Go back to the root folder and run:

```bash
npm run dev
```

## Design discussion

I chose to make this app because I sometimes have a hard time planning what to eat, so I wanted a simple way to save recipes and organize meals.

## Reflection

One challenge in the project was showing related recipe and user data in meal plans.  
At first, only ObjectIds were returned from the backend.  
I solved this by using Mongoose `populate()`, which made it possible to show the correct recipe titles and user names in the frontend.

## Author

Besart