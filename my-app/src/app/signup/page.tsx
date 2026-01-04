"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Account created 🎉");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Join us and start your journey 🚀
        </p>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Username</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="your_username"
            className="w-full rounded-lg bg-black/40 border border-gray-700 p-3 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full rounded-lg bg-black/40 border border-gray-700 p-3 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="••••••••"
            className="w-full rounded-lg bg-black/40 border border-gray-700 p-3 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full rounded-lg py-3 font-semibold text-white transition-all
            ${
              buttonDisabled || loading
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
            }`}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-400 hover:text-purple-300 underline transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
