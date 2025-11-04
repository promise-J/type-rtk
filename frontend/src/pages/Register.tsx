import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";
import Input from "../components/elements/Input";
import Button from "../components/elements/Button";
import { useRegisterUserMutation } from "../redux/api/slices/authSlice";
import { ApiError, ApiSuccess } from "../types/api.type";
import toast from "react-hot-toast";
import { User } from "../types/user.type";

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res: ApiSuccess<User> = await register({
        username: name,
        email,
        password,
      }).unwrap();

      toast.success(res?.message, { position: "top-right" });
      setName("");
      setEmail("");
      setPassword("");
      navigate('/login')
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error.data.error, { position: "top-right" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <Input
            icon={<HiUser size={20} />}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Full Name"
          />

          {/* Email */}
          <Input
            icon={<HiMail size={20} />}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
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
          <Button>{isLoading ? "Loading... " : "Create Account"}</Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
