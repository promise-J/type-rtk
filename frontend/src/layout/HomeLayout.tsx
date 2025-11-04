  import { Outlet, Link } from "react-router-dom";
  import { useGetUserQuery } from "../redux/api/slices/authSlice";

  export default function HomeLayout() {
      // const { data: {data: userInfo} = {}, isLoading, error, refetch } = useGetUserQuery();
    
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">🛍 My Store</h1>

            <nav className="flex space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-10">
          <div className="max-w-6xl mx-auto px-6 py-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="font-medium text-gray-700">My Store</span>. All rights reserved.
          </div>
        </footer>
      </div>
    );
  }
