import useAxios from "@/hooks/use-axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { EllipsisVertical, Package, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProductRow = ({ product, refetch }) => {
  const navigate = useNavigate();
  const axios = useAxios();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(product?.price));

  const handleDeleteProduct = async (productId) => {
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
    <tr key={product.id} className="hover:bg-muted/50 border-b">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {product?.images && product?.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product?.title}
              title={product?.title}
              className="h-10 w-10 rounded-md object-cover"
            />
          ) : (
            <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md">
              <Package className="text-muted-foreground h-5 w-5" />
            </div>
          )}
          <span className="font-medium">{product?.title || "N/A"}</span>
        </div>
      </td>
      <td className="px-4 py-3">{product?.category?.name || "N/A"}</td>
      <td className="px-4 py-3">{product?.type || "N/A"}</td>
      <td className="px-4 py-3">
        {product.cakeDetails?.pricing?.discounted?.toFixed(2) ||
          formattedPrice ||
          "N/A"}
      </td>
      <td align="center" className="px-4 py-3">
        {product?.stock ?? "N/A"}
      </td>
      <td align="center" className="px-4 py-3">
        {product?.soldAmount ?? "N/A"}
      </td>
      <td className="px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/admin-panel/all-products/${product.id}`)
                }
              >
                <PencilIcon />
                Edit
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-red-500 hover:text-red-500"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <TrashIcon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default ProductRow;
