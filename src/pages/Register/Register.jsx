import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion"; // Motion import
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import GoggleBTN from "@/root/Buttons/GoggleBTN";
import useAuth from "@/Hooks/useAuth";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  // console.log(createUser, 'user info');

  // register handle logic
  const onSubmitHandle = (data) => {
    console.log("Form Data:", data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        if (result.user) {
          updateUserProfile(data.fullName, "")
            .then(() => {
              console.log("Profile updated successfully");
              toast.success("Registration successful", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
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
        }
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Ambient Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-md"
      >
        <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <h2 className="mb-2 text-4xl font-bold tracking-tight">Sign Up</h2>
            <p className="font-medium text-gray-400">
              Create your RFG Solution account
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmitHandle)} className="space-y-6">
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <div
                className={`relative flex items-center border-b transition-all duration-300 ${errors.fullName ? "border-red-500" : "border-black/15 focus-within:border-purple-500"} group py-2`}
              >
                <FiUser
                  className={`mr-3 transition-colors ${errors.fullName ? "text-red-500" : "text-gray-500 group-focus-within:text-purple-500"}`}
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full text-lg outline-none placeholder:text-gray-600"
                  {...register("fullName", { required: "What is your name?" })}
                />
              </div>
              <AnimatePresence>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs text-red-400"
                  >
                    {errors.fullName.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <div
                className={`relative flex items-center border-b transition-all duration-300 ${errors.email ? "border-red-500" : "border-black/15 focus-within:border-purple-500"} group py-2`}
              >
                <FiMail
                  className={`mr-3 transition-colors ${errors.email ? "text-red-500" : "text-gray-500 group-focus-within:text-purple-500"}`}
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full text-lg outline-none placeholder:text-gray-600"
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
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs text-red-400"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <div
                className={`relative flex items-center border-b transition-all duration-300 ${errors.password ? "border-red-500" : "border-black/15 focus-within:border-purple-500"} group py-2`}
              >
                <FiLock
                  className={`mr-3 transition-colors ${errors.password ? "text-red-500" : "text-gray-500 group-focus-within:text-purple-500"}`}
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full text-lg outline-none placeholder:text-gray-600"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Use at least 6 characters",
                    },
                  })}
                />
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-gray-500 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </motion.button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs text-red-400"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              // whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group flex w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 font-bold text-white shadow-lg shadow-purple-500/20 transition-all"
            >
              Get Started
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-2" />
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="my-8 flex items-center"
          >
            <div className="flex-1 border-t border-black/15"></div>
            <span className="px-4 text-xs font-bold tracking-widest text-gray-600 uppercase">
              Or
            </span>
            <div className="flex-1 border-t border-black/15"></div>
          </motion.div>

          {/* Google Login */}
          {/* <motion.button
                        variants={itemVariants}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => console.log("Google Auth")}
                        className="w-full bg-white border border-black/15 text-black font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
                    >
                        <FcGoogle size={24} />
                        Continue with Google
                    </motion.button> */}

          <GoggleBTN itemVariants={itemVariants} />

          <motion.p
            variants={itemVariants}
            className="mt-8 text-center text-sm font-medium text-gray-500"
          >
            Already a member?
            <a
              href="/login"
              className="ml-2 text-blue-500 underline decoration-blue-500 underline-offset-4 transition-all hover:text-blue-400"
            >
              Log In
            </a>
          </motion.p>
        </div>
      </motion.div>

      {/* toast container */}
      <ToastContainer />
    </div>
  );
};

export default Register;
