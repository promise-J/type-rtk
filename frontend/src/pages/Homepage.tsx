import React, { useEffect } from "react";
import { useGetUserQuery, useLazyGetUserQuery } from "../redux/api/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
  // const { data: {data: userInfo} = {}, isLoading, error, refetch } = useGetUserQuery();
  const [triggerUser, {data: {data: userInfo} = {}, isLoading, error}] = useLazyGetUserQuery()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await triggerUser(); // This returns a promise you can unwrap if needed
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
  
    fetchUser();
  }, [triggerUser]); // include triggerUser in dependencies
  

  // Handle logout
  const handleLogout = () => {
    // ✅ Remove token from localStorage (or cookies)
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return <div className="text-center text-lg mt-10">Loading user info...</div>;
  }

  if (error) {
    console.error("Error fetching user:", error);
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load user info.
      </div>
    );
  }


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-3xl font-semibold mb-4">👋 Welcome back {userInfo?.username}!</h1>

      {userInfo ? (
        <div className="border p-4 rounded-md bg-gray-50">
          <p><strong>Name:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>ID:</strong> {userInfo._id}</p>
        </div>
      ) : (
        <p>No user info available.</p>
      )}

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Homepage;
