import * as z from "zod";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import Loading from "@/components/common/Loading";
import { PackageOpen } from "lucide-react";
import PageHeader from "@/components/DynamicComponents/PageHeader";
import { DyForm } from "@/components/DynamicComponents/DyForm";
import { DyFormField } from "@/components/DynamicComponents/DyFormField";
import DySelect from "@/components/DynamicComponents/DySelect";
import { toast } from "sonner";

const formSchema = z.object({
  customizable: z.boolean().optional(),
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  price: z.string().min(0, "Price must be a positive number."),
  images: z.any().optional(),
  cakeType: z.string().min(2, "Type is required."),
  flavors: z.string().min(2, "At least one flavor is required."),
  weight: z.string().min(1, "Weight is required."),
  features: z.string().optional(),
  category: z.string().min(2, "Category is required."),
  stock: z.string().min(0, "Stock must be a positive number."),
  specificationLabel: z.string().optional(),
  specificationValue: z.string().optional(),
  nutritionLabel: z.string().optional(),
  nutritionValue: z.string().optional(),
});

const defaultValues = {
  customizable: false,
  title: "",
  description: "",
  price: "",
  images: [],
  cakeType: "",
  flavors: "",
  weight: "",
  features: "",
  category: "",
  stock: "",
  specificationLabel: "",
  specificationValue: "",
  nutritionLabel: "",
  nutritionValue: "",
};

const UpdateProduct = () => {
  const { id } = useParams();
  const axios = useAxios();

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/categories");
      return data?.data || [];
    },
  });

  const {
    data: product,
    isLoading: productLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axios.get(`/cakes/${id}`);
      return data?.data;
    },
    enabled: !!id,
  });

  const categoryItems = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const productDefaultValues = product
    ? {
        customizable: product.customizable || false,
        title: product.title || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        images: [],
        cakeType: product.cakeType || "",
        flavors: product.flavors || "",
        weight: product.weight || "",
        features: product.features || "",
        category: product.category?.id || "",
        stock: product.stock?.toString() || "",
        specificationLabel: product.specificationLabel || "",
        specificationValue: product.specificationValue || "",
        nutritionLabel: product.nutritionLabel || "",
        nutritionValue: product.nutritionValue || "",
      }
    : defaultValues;

  async function onSubmit(values) {
    const {
      customizable,
      title,
      description,
      price,
      stock,
      images,
      cakeType,
      flavors,
      weight,
      features,
      category,
      specificationLabel,
      specificationValue,
      nutritionLabel,
      nutritionValue,
    } = values;

    const formData = new FormData();

    // Handle images - only add new images
    const imageArray = Array.isArray(images) ? images : images ? [images] : [];
    if (imageArray.length > 0) {
      imageArray.forEach((image) => {
        if (image instanceof File) {
          formData.append("files", image);
        }
      });
    }

    // Prepare JSON data
    const jsonData = {
      customizable,
      title,
      description,
      price: parseFloat(price) || 0,
      stock: parseInt(stock) || 0,
      cakeType: cakeType || "",
      category: category || "",
      flavors: flavors && flavors.trim() !== "" ? flavors : "",
      weight: weight && weight.trim() !== "" ? weight : "",
      features: features && features.trim() !== "" ? features : "",
      specificationLabel:
        specificationLabel && specificationLabel.trim() !== ""
          ? specificationLabel
          : "",
      specificationValue:
        specificationValue && specificationValue.trim() !== ""
          ? specificationValue
          : "",
      nutritionLabel:
        nutritionLabel && nutritionLabel.trim() !== "" ? nutritionLabel : "",
      nutritionValue:
        nutritionValue && nutritionValue.trim() !== "" ? nutritionValue : "",
    };

    formData.append("data", JSON.stringify(jsonData));
    console.log("FormData to send:", jsonData);

    try {
      const { data } = await axios.put(`/cakes/update-cake/${id}`, formData);

      const { success, message } = data;

      if (!success) {
        toast.error(message || "Server returned unsuccessful response");
        return;
      }

      toast.success(message || "Product updated successfully!");
    } catch (error) {
      console.error("Error response:", error.response?.data);
      console.error("Error message:", error.message);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update product";

      toast.error(errorMessage);
    }
  }

  if (productLoading || categoriesLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="space-y-8">
        <PageHeader
          icon={PackageOpen}
          title="Error"
          description="Failed to load product"
        />
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <p className="text-red-800">
            {error?.message || "Unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        icon={PackageOpen}
        title="Edit Product"
        description="Update cake product details and information"
      />

      {/* Form Card */}
      <div className="bg-card rounded-lg border">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">Product Information</h2>
        </div>
        <div className="p-6">
          <DyForm
            schema={formSchema}
            defaultValues={productDefaultValues}
            onSubmit={onSubmit}
            submitText="Update Product"
            className="space-y-6"
          >
            <DyFormField
              fieldConfig={{
                name: "customizable",
                label: "Customizable",
                type: "switch",
              }}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DyFormField
                fieldConfig={{
                  name: "title",
                  label: "Title",
                  placeholder: "Enter product title",
                  description: "The name of the cake.",
                  type: "text",
                }}
              />
              <DySelect
                name="category"
                label="Category"
                selectLabel="Categories"
                placeholder="Select a category..."
                description="Product category."
                items={categoryItems}
                isLoading={categoriesLoading}
              />
              <DySelect
                name="cakeType"
                label="Cake Type"
                selectLabel="Cake Types"
                placeholder="Select cake type..."
                description="The type of the cake."
                items={[
                  { value: "cup-cake", label: "Cup Cake" },
                  { value: "cake", label: "Cake" },
                ]}
                isLoading={false}
              />
            </div>

            <DyFormField
              fieldConfig={{
                name: "description",
                label: "Description",
                placeholder: "Enter product description",
                description: "Detailed description of the cake.",
                type: "textarea",
              }}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DyFormField
                fieldConfig={{
                  name: "price",
                  label: "Price",
                  placeholder: "0.00",
                  description: "The price of the cake.",
                  type: "text",
                }}
              />
              <DyFormField
                fieldConfig={{
                  name: "stock",
                  label: "Stock",
                  placeholder: "0",
                  description: "Current inventory count.",
                  type: "text",
                }}
              />
            </div>

            <DyFormField
              fieldConfig={{
                name: "images",
                label: "Images",
                description: "Images for the cake.",
                type: "file",
                accept: "image/*",
                multiple: true,
              }}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <DyFormField
                fieldConfig={{
                  name: "flavors",
                  label: "Flavors",
                  placeholder: "Chocolate, Vanilla (comma separated)",
                  description: "Available flavors.",
                  type: "text",
                }}
              />
              <DyFormField
                fieldConfig={{
                  name: "weight",
                  label: "Weight Options",
                  placeholder: "1lb, 2lb (comma separated)",
                  description: "Available weights.",
                  type: "text",
                }}
              />
            </div>

            <DyFormField
              fieldConfig={{
                name: "features",
                label: "Features",
                placeholder: "Egg-less, Sugar-free (comma separated)",
                description: "Special features.",
                type: "text",
              }}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <DyFormField
                fieldConfig={{
                  name: "specificationLabel",
                  label: "Specification Label",
                  placeholder: "e.g., Delivery Range",
                  description: "Label for specifications.",
                  type: "text",
                }}
              />
              <DyFormField
                fieldConfig={{
                  name: "specificationValue",
                  label: "Specification Value",
                  placeholder: "e.g., 2-3 Days",
                  description: "Value for specifications.",
                  type: "text",
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <DyFormField
                fieldConfig={{
                  name: "nutritionLabel",
                  label: "Nutrition Label",
                  placeholder: "e.g., Calories",
                  description: "Label for nutrition info.",
                  type: "text",
                }}
              />
              <DyFormField
                fieldConfig={{
                  name: "nutritionValue",
                  label: "Nutrition Value",
                  placeholder: "e.g., 250 Cal per serving",
                  description: "Value for nutrition info.",
                  type: "text",
                }}
              />
            </div>
          </DyForm>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
