import useAxios from "@/Hooks/useAxiosBase";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

const DbTest = () => {
  const axios = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["cakes"],
    queryFn: async () => {
      const { data } = await axios.get("/cakes");
      return data?.data?.data || [];
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading cakes...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Our Cakes</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DbTest;