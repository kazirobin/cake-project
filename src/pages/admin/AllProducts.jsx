import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Package } from "lucide-react";
import { useNavigate } from "react-router";
import PageHeader from "@/components/common/PageHeader";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const AllProducts = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("all");

  const axios = useAxios();
  const navigate = useNavigate();

  const {
    data: allProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cakes"],
    queryFn: async () => {
      const { data } = await axios.get("/cakes");
      return data?.data || [];
    },
  });

  const products = allProducts.filter((product) => {
    return product.isDeleted === false;
  });

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const { data } = await axios.delete(`/cakes/delete-cake/${productId}`);

      const { success, message } = data;
      if (!success) {
        toast(message || "Failed to delete product. Please try again.");
        return;
      }
      toast.success(message || "Product deleted successfully!");
      // Refetch products after deletion
      refetch();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          icon={Package}
          title={"All Products"}
          description={"Manage and view all your cake products"}
        />
        <Button
          className="w-full cursor-pointer sm:w-auto"
          onClick={() => navigate("/admin-panel/add-product")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-50">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="birthday">Birthday Cakes</SelectItem>
                <SelectItem value="wedding">Wedding Cakes</SelectItem>
                <SelectItem value="eggless">Eggless</SelectItem>
                <SelectItem value="sugarless">Sugarless</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            {products.length > 0
              ? `Showing ${products.length} products`
              : "No products found"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No products yet</p>
              <Button
                className="w-full cursor-pointer sm:w-auto"
                onClick={() => navigate("/admin-panel/add-product")}
              >
                Add Your First Product
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                    <th className="px-4 py-3 text-left font-semibold">Price</th>
                    <th className="px-4 py-3 text-left font-semibold">Stock</th>
                    <th className="px-4 py-3 text-left font-semibold">Sold</th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/50 border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product?.images !== "" ? (
                            <img
                              src={product.images[0]}
                              alt={product?.title}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          ) : (
                            <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md">
                              <Package className="text-muted-foreground h-5 w-5" />
                            </div>
                          )}
                          <span className="font-medium">
                            {product?.title || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {product?.category?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3">{product?.type || "N/A"}</td>
                      <td className="px-4 py-3">
                        {"$"}
                        {product.cakeDetails?.pricing?.discounted?.toFixed(2) ||
                          product?.price ||
                          "N/A"}
                      </td>
                      <td className="px-4 py-3">{product?.stock ?? "N/A"}</td>
                      <td className="px-4 py-3">
                        {product?.soldAmount ?? "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/admin-panel/edit-product/${product.id}`,
                              )
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllProducts;
