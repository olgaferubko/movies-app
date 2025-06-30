# Movies Shelf

## What is Movies Shelf?
Movies Shelf is a single-page web application for storing and browsing information about films. Users can view a list of movies, search by title or actor, sort alphabetically, add new movies, delete existing ones, and import bulk movie data from a text file. The app integrates with a JWT-protected REST API served from Docker.

## Key Features
- **Authentication**: Sign up / log in with email + password; JWT stored in `localStorage` and Redux-Persist
- **Movies List**   
  - Sort by title (A → Z / Z → A)  
  - Search by movie title or actor name  
- **Movie Details**:  
  - View ID, title, year, format (VHS / DVD / Blu-ray), list of actors  
  - Delete movie  
- **Add Movie**:  
  - Dynamic form with validation (Yup + React Hook Form)  
  - Formats limited to VHS, DVD, Blu-ray  
- **Import Movies**:  
  - Upload a `.txt` file in the sample format  
  - Auto-fix minor formatting issues  
  - Bulk import via `/movies/import` endpoint  
- **Persistent State**:  
  - Redux Toolkit + Redux Persist keeps auth token across reloads  
- **Notifications**:  
  - Success / error toasts with react-hot-toast  

## Tech Stack
- **Frontend**  
  - React + Vite  
  - React Router v6  
  - Redux Toolkit + Redux Persist  
  - React Hook Form + Yup for form validation  
  - react-hot-toast for notifications  
  - CSS Modules for styling  
- **Backend API**  
  - Docker image `webbylabhub/movies`  
  - JWT authentication (login → receive token → include in `Authorization` header)  
- **Deployment**  
  - Docker 

## Pages & Routes
- **`/login`** — Login form (restricted if already authenticated)  
- **`/register`** — Registration form (restricted if authenticated)  
- **`/movies`** — Main catalog (private)  
  - List of movies with search, sort
  - Buttons: Details, Delete  
- **`/movies/:id`** — (optional) Detail view modal or dedicated route  
- **Fallback** — `*` → 404 / Error page  

## How It Works
1. **Auth Flow**  
   - Register → `POST /users` → receive token  
   - Login → `POST /sessions` → receive token  
   - Token stored in `localStorage` and Redux state  
   - Protected routes redirect to `/login` if missing token  
2. **Movies API**  
   - Fetch list → `GET /movies?limit=10&offset=0&sort=title&order=ASC&search=…`  
   - Fetch detail → `GET /movies/:id`  
   - Add → `POST /movies` with JSON body  
   - Delete → `DELETE /movies/:id`  
   - Import → `POST /movies/import` with `multipart/form-data` file   

## Getting Started
```bash
# 1. Clone repo
git clone https://github.com/olgaferubko/movies-app.git
cd movies-app

# 2. Install dependencies
npm install

# 3. Configure environment
# edit '.env' in project by changing your api url:
VITE_API_URL=http://localhost:8000/api/v1

# 4. Run the api container on port 8000
docker run --name movies -p 8000:8000 webbylabhub/movies

# 5. Run the frontend container on port 3000 with your api url variable
docker run --name movies-frontend -p 3000:3000 -e VITE_API_URL=http://localhost:8000/api/v1 olgaferubko/movies-frontend
```

## Docker Hub & GitHub

GitHub repo: https://github.com/olgaferubko/movies-app

Docker Hub image: https://hub.docker.com/r/olgaferubko/movies-frontend


## About Me:
Hi! I'm Olga Ferubko, a Front-End Developer passionate about crafting intuitive and responsive user interfaces. I'm constantly leveling up my skills in JavaScript and React and enjoy writing clean, maintainable code.

Feel free to connect with me:

GitHub: https://github.com/olgaferubko

Email: ferubko.olga@gmail.com

LinkedIn: https://www.linkedin.com/in/olga-ferubko/