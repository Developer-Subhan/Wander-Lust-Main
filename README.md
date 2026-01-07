🏡 Airbnb Clone – Full-Stack Web Application

This is a full-stack Airbnb-style web application where users can create, search, filter, and manage property listings. The project is built with the MVC architecture and implements all major features of a modern rental platform.

✨ Features

🔐 User Authentication (Register, Login, Secure Sessions)

🏘️ Listings Management

Create, update, and delete property listings with title, description, price, category, images, and location

🔍 Search & Filters

Full-text search for listings

Category & price-based filters

💬 Reviews System (add, edit, delete reviews)

🌍 Interactive Map Integration (view property locations)

⚡ Flash Messages & Error Handling

🚫 Custom 404 & Error Pages

📐 MVC Architecture for clean and maintainable code

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript, Bootstrap, EJS

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: Passport.js

Templating Engine: EJS + EJS-Mate

Other Tools: Method-Override, Express-Session, Connect-Flash

📂 Project Structure ┣ 📂 controllers # MVC controllers for handling logic ┣ 📂 init # Initialization scripts (e.g., seed data, DB setup) ┣ 📂 models # Mongoose schemas (Listings, Reviews, Users) ┣ 📂 public # Static assets (CSS, JS, images) ┣ 📂 routes # Express routes for listings, reviews, users ┣ 📂 utils # Utility/helper functions ┣ 📂 views # EJS templates (layouts, listings, reviews, errors) ┣ .env # Environment variables ┣ .gitignore ┣ app.js # Main server entry point ┣ cloudConfig.js # Cloudinary / storage configuration ┣ middleware.js # Custom middleware functions ┣ schema.js # Joi validation schemas ┣ package.json ┣ package-lock.json ┗ LICENSE

🚀 Getting Started

Clone the repository:

git clone https://github.com/Developer-Mirza/Wander-Lust.git cd airbnb-clone

Install dependencies:

npm install

Set up .env file with:

CLOUD_NAME = Your cloud name CLOUD_API_KEY = Your cloud apikey CLOUD_API_SECRET = Your cloud api secret

ATLASDB_URL= Your atlas db url

SECRET= Your secret

Run the project:

npm start

Open in browser: http://localhost:8080

👉 This project demonstrates search, filters, CRUD operations, authentication, and full MVC structure, making it a complete practice clone of Airbnb.
