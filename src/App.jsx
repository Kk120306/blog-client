import './App.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import { Toaster } from "sonner";
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';

function App() {

    return (
        <div className="min-h-screen flex flex-col">
            <AuthProvider>
                <NavBar />
                <main className="flex-grow">
                    <Outlet />
                </main>
            </AuthProvider>
            <Footer />
            <Toaster position="top-center" theme='dark' richColors />

        </div>
    )
}

export default App
