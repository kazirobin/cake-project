import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import GoggleBTN from '@/root/Buttons/GoggleBTN';
import useAuth from '@/Hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const { signinUser, resetPassword } = useAuth();
    const navigate = useNavigate();
    console.log(signinUser, 'user info');

    // login handle logic
    const onSubmitHandle = (data) => {
        console.log("Login Data:", data);
        signinUser(data.email, data.password)
            .then(result => {
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
                navigate('/');
            })
            .catch(error => {
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
                toast.success("Password reset email sent successfully! Please check your email", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // reset();
            })
            .catch(error => {
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
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Animated Background Orbs */}
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md z-10"
            >
                <div className=" backdrop-blur-3xl border border-white/10 p-10 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                            <FiLock className="text-white" size={30} />
                        </div>
                        <h2 className="text-4xl font-bold mb-2 tracking-tight">Welcome Back</h2>
                        <p className="text-gray-400">Login to access your account</p>
                    </motion.div>

                    <form onSubmit={handleSubmit(onSubmitHandle)} className="space-y-6">

                        {/* Email Field */}
                        <motion.div variants={itemVariants}>
                            <label className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold ml-1 mb-2 block">Email Address</label>
                            <div className={`relative flex items-center transition-all duration-300 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-black/15 focus-within:border-blue-500/50'} rounded-2xl px-4 py-3 group`}>
                                <FiMail className={`mr-3 transition-colors ${errors.email ? 'text-red-400' : 'text-gray-500 group-focus-within:text-blue-400'}`} size={20} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="bg-transparent w-full outline-none placeholder:text-gray-700"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid email address (e.g., name@example.com)"
                                        }
                                    })}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[10px] mt-2 ml-1 uppercase font-bold tracking-wider">{errors.email.message}</motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div variants={itemVariants}>
                            <div className="flex justify-between items-center ml-1 mb-2">
                                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold block">Password</label>
                                <button onClick={handleFogetPass} className="text-[10px] uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors font-bold">Forgot?</button>
                            </div>
                            <div className={`relative flex items-center transition-all duration-300 bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-black/15 focus-within:border-purple-500/50'} rounded-2xl px-4 py-3 group`}>
                                <FiLock className={`mr-3 transition-colors ${errors.password ? 'text-red-400' : 'text-gray-500 group-focus-within:text-purple-400'}`} size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full outline-none placeholder:text-gray-700"
                                    {...register("password", { required: "Password is required" })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-600 cursor-pointer transition-colors ml-2"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            <AnimatePresence>
                                {errors.password && (
                                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[10px] mt-2 ml-1 uppercase font-bold tracking-wider">{errors.password.message}</motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Remember Me */}
                        <motion.div variants={itemVariants} className="flex items-center gap-2 ml-1">
                            <input type="checkbox" className="w-4 h-4 rounded border-black/10 text-blue-600 focus:ring-0 focus:ring-offset-0" id="remember" />
                            <label htmlFor="remember" className="text-xs text-gray-500 cursor-pointer select-none">Keep me logged in</label>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center group"
                        >
                            Sign In
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <motion.div variants={itemVariants} className="flex items-center my-8">
                        <div className="flex-1 border-t border-white/5"></div>
                        <span className="px-4 text-[10px] uppercase tracking-[0.3em] text-gray-600 font-black">Social Login</span>
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

                    <motion.p variants={itemVariants} className="text-center text-gray-500 mt-10 text-sm">
                        New to UG Cakes Bazar?
                        <Link to="/register" className="text-blue-400 hover:text-blue-500 ml-2 font-bold transition-colors underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-400">Create Account</Link>
                    </motion.p>
                </div>
            </motion.div>

            <ToastContainer />
        </div>
    );
};

export default Login;