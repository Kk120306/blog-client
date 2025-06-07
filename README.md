# blog-client

A React-based frontend client for the blogging platform, designed to interact seamlessly with the blogAPI backend.

* **Backend Repository**: *(https://github.com/Kk120306/blogAPI)*
* **Live Demo**: *(https://bloginsights-kk120306.netlify.app/)*

## Features

* Responsive and user-friendly interface for browsing and managing blog posts
* User authentication with login and registration forms
* Uses JWT tokens stored in **HTTP-only cookies** for secure authentication with the backend
* Fetches and displays blog data from the REST API backend
* Supports creating, editing, and deleting blog posts (authenticated/admin users only)

## Technologies Used

* React.js with hooks and context API
* Axios for HTTP requests
* React Router for client-side routing
* TailwindCSS
* JWT-based authentication via cookies

## Setup and Installation

1. **Clone the repository**:

```bash
git clone https://github.com/Kk120306/blog-client.git
cd blog-client
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create a `.env` file in the root directory and add the backend API URL**:

```env
REACT_APP_API_URL=http://localhost:3000/api/v1
```

4. **Start the development server**:

```bash
npm start
```

5. **Open your browser and navigate to `http://localhost:3000`**

## Notes

* Ensure the backend API (`blogAPI`) is running and accessible at the URL specified in `REACT_APP_API_URL`.
* The app relies on the backend to handle authentication via JWT and cookies.
* Modify the API URL as needed for your deployment environment.
