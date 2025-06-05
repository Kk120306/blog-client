import App from './App.jsx';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [    
            {
                index: true,
                element: <Home />
            }, 
            {
                path: "/signin",
                element: <Signin />
            },
            {
                path: "/signup",
                element: <Signup />
            }
        ]
    },
];

export default routes;