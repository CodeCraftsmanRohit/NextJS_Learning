"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Welcome back 👋");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Login to continue your journey 🚀
        </p>

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
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className={`w-full rounded-lg py-3 font-semibold text-white transition-all
            ${
              buttonDisabled || loading
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-400 hover:text-purple-300 underline transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
