import useAuth from "@/Hooks/useAuth";
import AllCards from "@/root/Components/Cards/AllCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router";

const BestSellers = () => {
  const { user, signOutUser } = useAuth();
  
  // cakes data fetching
  const { data: cakes, isLoading } = useQuery({
    queryKey: ["cakes"],
    queryFn: async () => {
      const res = await axios.get("/cakes.json");
      return res.data;
    },
  });

  return (
    <>
      {/* User Info Section */}
      <div className="flex justify-center my-10">
        {user ? (
          <div className="flex items-center gap-5">
            <button 
              onClick={signOutUser} 
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
            <p>{user?.email}</p>
            <p>{user?.displayName}</p>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* All Cards Component */}
      <AllCards 
        title="🔥 Recently Best Sellers"
        subtitle="These trending cakes are flying off our shelves - Don't miss out!"
        updateTime={null}
        badge="HOT"
        cakes={cakes || []}
        isLoading={isLoading}
        left
      />
    </>
  );
};

export default BestSellers;