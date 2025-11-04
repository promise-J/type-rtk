import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMail, HiLockClosed } from "react-icons/hi";
import Input from "../components/elements/Input";
import Button from "../components/elements/Button";
import toast from "react-hot-toast";
import { useLazyGetUserQuery, useLoginUserMutation } from "../redux/api/slices/authSlice";
import { ApiError, ApiSuccess } from "../types/api.type";

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, {isLoading}] = useLoginUserMutation()
  const [triggerUser] = useLazyGetUserQuery()

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res: ApiSuccess<string> = await loginUser({ email, password }).unwrap();
        const token = res?.data
        localStorage.setItem('token', token)
        await triggerUser().unwrap();
        if(res){
            toast.success(res?.message, { position: 'top-right' });
            navigate('/')
        }
    } catch (error) {
        const err = error as ApiError;
        toast.error(err.data.error || 'Login failed', { position: 'top-right' });
    }
//     Alert({
//     title: "Are you sure",
//     text: "You want to proceed?",
//     icon: "warning",
//     cancelButtonText: "Cancel",
//     confirmButtonText: "Proceed",
//     onCancel: () => console.log("Cancelled"),
//     onConfirm: () => console.log("Proceeded"),
//     showCancelButton: true
//   });
    // TODO: call your API here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
            <Input
            icon={<HiMail size={20} />}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          {/* Password */}
            <Input
            icon={<HiLockClosed size={20} />}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />

          {/* Submit Button */}
         <Button>{isLoading ? "Loading..." : "Login"}</Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
