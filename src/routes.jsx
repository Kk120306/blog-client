import App from './App.jsx';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import About from './components/About.jsx';
import Posts from './components/Posts.jsx';
import PostFace from './components/PostFace.jsx';
import CreatePost from './components/CreatePost.jsx';
import PostEditor from './components/PostEditor.jsx';

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
            },
            {
                path : "/about",
                element: <About />
            }, 
            {
                path : "/posts",
                element: <Posts />
            },
            {
                path : "/posts/:id",
                element: <PostFace />
            },
            {
                path : "/posts/:id/edit",
                element: <PostEditor />
            },
            {
                path: "/create",
                element: <CreatePost />
            },
            
        ]
    },
];

export default routes;