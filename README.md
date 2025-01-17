# Book Store using Mern Stack, Firebase and RTK | React 19

Frontend
--------

### Features

1.  **User Authentication**: Handled by Firebase, ensuring secure user login and registration.
    
2.  **State Management**: Managed with Redux Toolkit, enabling efficient state handling.
    
3.  **Styling**: Tailwind CSS is used for responsive and modern styling.
    
4.  **Core Functionality**:
    
    *   Display a collection of books fetched from the backend.
        
    *   Add books to a cart with functionality to update or remove items.
        
    *   Access the checkout process (only for logged-in users).
        
    *   View order history on the user dashboard or orders page.
        

### Technologies Used

*   **React Router DOM**: For navigation and routing.
    
*   **Redux Toolkit**: To manage application state efficiently.
    
*   **Redux Persist**: To persist state across sessions.
    
*   **Axios**: For API calls.
    
*   **Firebase**: For authentication.
    
*   **Chart.js** and **React Chart.js 2**: To visualize data in charts.
    
*   **React Hook Form**: For form handling and validations.
    
*   **MUI (Material-UI)**: For reusable components.
    
*   **Swiper**: For interactive carousels.
    
*   **React Icons**: For a variety of icons.
    
*   **React Hot Toast**: For notification toasts.
    

### Custom Hooks

1.  **useProvideAPI**: A utility hook that provides general API details and configurations used across the application.
    
2.  **useRedux**: Centralized hook to access Redux stores and actions.
    
3.  **useAPISubmit**: Handles API calls via Axios, utilizing httpactions.js for utility functions.
    

### API and Redux

*   API routes and methods are declared in the api.js file within the API folder.
    
*   The Redux Toolkit manages the application's slices, including:
    
    *   **Admin Slice**: Admin-specific state management.
        
    *   **Auth Slice**: Handles user authentication state.
        
    *   **Card Slice**: Manages cart-related operations.
Backend
-------

### Description

The backend of the **Bookstore Application** is built using **Node.js** with the **Express.js** framework and utilizes **Mongoose** for interacting with the MongoDB database. It is designed to handle API requests, manage data persistence, and ensure secure communication between the client and server.

### Technologies Used

*   **Express.js**: Backend framework for handling routes and middleware.
    
*   **Mongoose**: ORM for interacting with MongoDB.
    
*   **bcrypt**: For hashing sensitive data.
    
*   **Cloudinary**: For handling file uploads and media storage.
    
*   **cookie-parser**: For managing cookies in requests.
    
*   **CORS**: For enabling cross-origin requests.
    
*   **dotenv**: For managing environment variables.
    
*   **Joi**: For input validation.
    
*   **jsonwebtoken**: For generating and verifying tokens.
    
*   **multer**: For file uploads.
    

### Folder Structure Highlights

#### Utility Files

*   **API Error**: Custom error handling for consistent API responses.
    
*   **AsyncHandler**: Wrapper to simplify handling of asynchronous operations.
    
*   **Cloudinary**: Helper functions for managing file uploads to Cloudinary.
    
*   **GenerateTokens**: Functions for generating JSON Web Tokens (JWT).
    

#### Middleware

*   **isAuth**: Middleware to authenticate requests using JWT.
    
*   **MulterFile**: Middleware for handling file uploads using **Multer**.
    

#### Models

*   **Book**: Schema for managing book-related data.
    
*   **Gallery**: Schema for managing media in the application.
    
*   **Order**: Schema for managing order details.
    
*   **User**: Schema for admin user data, as regular user authentication is handled via **Firebase**.
    

### Key Features

*   **Authentication**:
    
    *   JWT-based authentication for admin users.
        
    *   Regular users are authenticated via Firebase.
        
*   **File Management**:
    
    *   Images and media files are uploaded to **Cloudinary** using **Multer**.
        
*   **Data Management**:
    
    *   CRUD operations for books, orders, and gallery.
        
    *   Admin-only features for managing data.

Installation Guide
------------------

### 1\. Clone or Download the Repository

*   bashCopyEditgit clone https://github.com/your-repo/bookstore.git
    
*   Alternatively, you can download the repository as a ZIP file and extract it.
    

### 2\. Project Structure

The repository contains two main directories:

*   **Client**: The front-end React application.
    
*   **Server**: The back-end Node.js application.
    

### 3\. Environment Setup

You need to create .env files for both the **client** and **server** projects. Follow these steps:

#### **Client (Front-End)**:

1.  Navigate to the client directory.
    
2.  Create a .env file.
    
3.  Add the Firebase configuration provided by Google Firebase. Once you create a Firebase project, you will receive the necessary credentials to paste here.
    

#### **Server (Back-End)**:

1.  Navigate to the server directory.
    
2.  Create a .env file.
    
3.  Add the following variables to the .env file:
    
    *   CLOUDINARY\_URL: Your Cloudinary API URL.
        
    *   JWT\_SECRET: A strong secret key for JSON Web Tokens (you can generate it using crypto.randomBytes or provide your own).
        
    *   ACCESS\_EXPIRY: Token expiration time for access tokens (e.g., 15m).
        
    *   REFRESH\_EXPIRY: Token expiration time for refresh tokens (e.g., 7d).
        
    *   PORT: The port number the server should run on (e.g., 5000).
        
    *   MONGO\_URI: Your MongoDB connection string.
        
    *   CORS\_ORIGIN: The URL of the client application (e.g., http://localhost:3000).
        

### 4\. Install Dependencies

Open two terminal windows and navigate into the client and server directories respectively. Then, run the following commands:

#### For the Client:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopyEditcd client  npm install   `

#### For the Server:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopyEditcd server  npm install   `

If you don’t have npm installed, download and install the **Node.js LTS version** first.

### 5\. Running the Application

Once dependencies are installed, use the following commands to start the project in development mode:

#### For the Client:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopyEditnpm run dev   `

#### For the Server:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopyEditnpm run dev   `

### 6\. Verify the Application

*   If everything is configured correctly, the front-end should run on http://localhost:3000, and the back-end should run on the port you specified (default: http://localhost:5000).
    
*   Visit the client URL to interact with the Bookstore application.


