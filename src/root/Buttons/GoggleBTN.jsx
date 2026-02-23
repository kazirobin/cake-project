import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import useAuth from "@/Hooks/useAuth";
import { useNavigate } from "react-router";

const GoggleBTN = ({ itemVariants }) => {

    const { signinWithGoggle } = useAuth();
    const navigate = useNavigate();

    // google sign in handle logic
    const handleGoogleSignIn = () => {
        signinWithGoggle()
            .then(result => {
                console.log(result.user);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (

        <motion.button
            variants={itemVariants}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            className="w-full bg-white cursor-pointer border border-black/15 text-black font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
        >
            <FcGoogle size={24} />
            Continue with Google
        </motion.button>
    );
};

export default GoggleBTN;