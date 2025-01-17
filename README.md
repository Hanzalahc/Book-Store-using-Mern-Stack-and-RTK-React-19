# Book Store using Mern Stack and RTK | React 19

Frontend
Description
This project is a Bookstore application built using the MUNSTACK architecture. The application allows users to browse books, add them to the cart, update cart quantities, and place orders. Users need to be logged in to access the checkout and order management features. The project emphasizes state management, API handling, and responsive design.

Features
Authentication:

Handled via Firebase (email/password login and Google Sign-In).
Users must log in to place orders or access the checkout page.
Cart Management:

Add books to the cart.
Update cart quantities or remove books.
Checkout and place orders.
Orders:

View order history on the user dashboard.
Custom Hooks:

useApiProvider: Provides general API descriptions and utilities for files.
useReduxHooks: Contains all store-related actions and selectors.
useApiSubmit: Handles API calls using Axios, interacting with a utility file httpActions.js.
Folder Structure Highlights
API Management:

API routes and methods are declared in the api.js file located in the api folder.
API calls are executed via utility methods for modular and reusable code.
Redux Toolkit:

Includes slices for:
Admin
Auth
Cart
These slices are used throughout the project for state management.
Technologies Used
React.js
Redux Toolkit
Firebase
Axios
Tailwind CSS
MUI (Material-UI)
React Router DOM
Chart.js
React Chart.js 2
React Hook Form (with validation)
React Hot Toast
React Icons
React Redux Persist
Swiper
