import App from './App.jsx';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        childern : [
            {
                index : true,
                path: "/",
                element: <Home />
            }
        ]
      },
]

export default routes;