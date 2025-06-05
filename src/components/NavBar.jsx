
const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">My App</div>
                <div className="space-x-4">
                    <a href="/" className="text-gray-300 hover:text-white">Home</a>
                    <a href="/about" className="text-gray-300 hover:text-white">About</a>
                    <a href="/posts" className="text-gray-300 hover:text-white">All Posts</a>
                    <a href="/signin" className="text-gray-300 hover:text-white">Sign in</a>
                    <a href="/signup" className="text-gray-300 hover:text-white">Sign up</a>
                    <a href="/signout" className="text-gray-300 hover:text-white">Sign out</a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;