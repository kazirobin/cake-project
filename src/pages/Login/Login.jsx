import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import GoggleBTN from "@/root/Buttons/GoggleBTN";
import useAuth from "@/Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const { signinUser, resetPassword } = useAuth();
  const navigate = useNavigate();
  console.log(signinUser, "user info");

  // login handle logic
  const onSubmitHandle = (data) => {
    console.log("Login Data:", data);
    signinUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reset();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // forget password handle logic
  const handleFogetPass = (e) => {
    e.preventDefault();
    const email = watch("email");
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    resetPassword(email)
      .then(() => {
        toast.success(
          "Password reset email sent successfully! Please check your email",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
        );
        // reset();
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 font-sans">
      {/* Animated Background Orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-md"
      >
        <div className="rounded-[48px] border border-white/10 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-10 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 shadow-lg">
              <FiLock className="text-white" size={30} />
            </div>
            <h2 className="mb-2 text-4xl font-bold tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-400">Login to access your account</p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmitHandle)} className="space-y-6">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="mb-2 ml-1 block text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                Email Address
              </label>
              <div
                className={`relative flex items-center border bg-white/5 transition-all duration-300 ${errors.email ? "border-red-500/50" : "border-black/15 focus-within:border-blue-500/50"} group rounded-2xl px-4 py-3`}
              >
                <FiMail
                  className={`mr-3 transition-colors ${errors.email ? "text-red-400" : "text-gray-500 group-focus-within:text-blue-400"}`}
                  size={20}
                />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-transparent outline-none placeholder:text-gray-700"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message:
                        "Please enter a valid email address (e.g., name@example.com)",
                    },
                  })}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 ml-1 text-[10px] font-bold tracking-wider text-red-400 uppercase"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <div className="mb-2 ml-1 flex items-center justify-between">
                <label className="block text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                  Password
                </label>
                <button
                  onClick={handleFogetPass}
                  className="text-[10px] font-bold tracking-wider text-blue-400 uppercase transition-colors hover:text-blue-300"
                >
                  Forgot?
                </button>
              </div>
              <div
                className={`relative flex items-center border bg-white/5 transition-all duration-300 ${errors.password ? "border-red-500/50" : "border-black/15 focus-within:border-purple-500/50"} group rounded-2xl px-4 py-3`}
              >
                <FiLock
                  className={`mr-3 transition-colors ${errors.password ? "text-red-400" : "text-gray-500 group-focus-within:text-purple-400"}`}
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full outline-none placeholder:text-gray-700"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 cursor-pointer text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 ml-1 text-[10px] font-bold tracking-wider text-red-400 uppercase"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Remember Me */}
            <motion.div
              variants={itemVariants}
              className="ml-1 flex items-center gap-2"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-black/10 text-blue-600 focus:ring-0 focus:ring-offset-0"
                id="remember"
              />
              <label
                htmlFor="remember"
                className="cursor-pointer text-xs text-gray-500 select-none"
              >
                Keep me logged in
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group flex w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-bold text-white transition-all"
            >
              Sign In
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="my-8 flex items-center"
          >
            <div className="flex-1 border-t border-white/5"></div>
            <span className="px-4 text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">
              Social Login
            </span>
            <div className="flex-1 border-t border-white/5"></div>
          </motion.div>

          {/* Google Login */}
          {/* <motion.button
                        variants={itemVariants}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className="w-full bg-white border border-black/15 cursor-pointer font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
                    >
                        <FcGoogle size={22} />
                        <span className="text-sm">Continue with Google</span>
                    </motion.button> */}

          <GoggleBTN itemVariants={itemVariants} />

          <motion.p
            variants={itemVariants}
            className="mt-10 text-center text-sm text-gray-500"
          >
            New to UG Cakes Bazar?
            <Link
              to="/register"
              className="ml-2 font-bold text-blue-400 underline decoration-blue-500/30 underline-offset-4 transition-colors hover:text-blue-500 hover:decoration-blue-400"
            >
              Create Account
            </Link>
          </motion.p>
        </div>
      </motion.div>

      <ToastContainer />
    </div>
  );
};

export default Login;
