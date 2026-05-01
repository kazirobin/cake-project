import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const DbTest = () => {
  const axios = useAxios();
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cakes"],
    queryFn: async () => {
      const { data } = await axios.get("/cakes");
      return data?.data?.data || [];
    },
  });
  console.log(products);

  return (
    <div className="h-32 bg-red-700">
      DbTest
      {products?.length}
    </div>
  );
};

export default DbTest;
