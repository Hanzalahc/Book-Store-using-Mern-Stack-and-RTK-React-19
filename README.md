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
 
