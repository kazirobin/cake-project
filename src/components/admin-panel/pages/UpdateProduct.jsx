import * as z from "zod";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import { PackageOpen } from "lucide-react";
import PageHeader from "@/components/DynamicComponents/PageHeader";
import { DyForm } from "@/components/DynamicComponents/DyForm";
import { DyFormField } from "@/components/DynamicComponents/DyFormField";
import DySelect from "@/components/DynamicComponents/DySelect";
import { toast } from "sonner";
import FormLoadingSkeleton from "../LoadingUI/FormLoadingSkeleton";

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
  category: z.string().min(2, "Category is required."),
  stock: z.string().min(0, "Stock must be a positive number."),
  features: z.string().optional(),
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
  category: "",
  stock: "",
  features: "",
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
    data: product = {},
    isLoading: productLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axios.get(`/cakes/${id}`);
      return data?.data || {};
    },
  });

  console.log("Product : ", product);

  const categoryItems = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const productDefaultValues = product
    ? {
        customizable: product.customizable || false,
        title: product.title || "",
        description: product?.description || "",
        price: product.price?.toString() || "",
        images: [],
        cakeType: product?.type || "",
        flavors: product?.flavour || "",
        weight: product?.size || "",
        category: product.category?.id || "",
        stock: product.stock?.toString() || "",
        features: Array.isArray(product?.cakeFeatures?.features)
          ? product.cakeFeatures.features.join(", ")
          : "",
        specificationLabel: Array.isArray(
          product?.cakeFeatures?.specificationLabel,
        )
          ? product.cakeFeatures.specificationLabel.join(", ")
          : "",
        specificationValue: Array.isArray(
          product?.cakeFeatures?.specificationValue,
        )
          ? product.cakeFeatures.specificationValue.join(", ")
          : "",
        nutritionLabel: Array.isArray(product?.cakeFeatures?.nutritionLabel)
          ? product.cakeFeatures.nutritionLabel.join(", ")
          : "",
        nutritionValue: Array.isArray(product?.cakeFeatures?.nutritionValue)
          ? product.cakeFeatures.nutritionValue.join(", ")
          : "",
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

    // Handle new file uploads - only add new images (File instances)
    const imageArray = Array.isArray(images) ? images : images ? [images] : [];
    if (imageArray.length > 0) {
      imageArray.forEach((image) => {
        if (image instanceof File) {
          formData.append("files", image);
        }
      });
    }

    // Helper function matching backend's toArray logic
    const toArray = (value) => {
      if (Array.isArray(value) && value.length > 0) {
        return value.filter((v) => v && String(v).trim());
      }
      if (typeof value === "string" && value.trim()) {
        return value.split(/\s*,\s*/).filter(Boolean);
      }
      return undefined;
    };

    // Prepare JSON data - send all fields for backend to process
    const jsonData = {
      customizable: customizable || false,
      title,
      description,
      price: parseFloat(price) || 0,
      stock: parseInt(stock) || 0,
      cakeType,
      category,
      flavors: typeof flavors === "string" ? flavors : "",
      weight: typeof weight === "string" ? weight : null,
    };

    // Handle CakeFeatures fields - only include if they have values
    const specLabel = toArray(specificationLabel);
    if (specLabel) jsonData.specificationLabel = specLabel;

    const specValue = toArray(specificationValue);
    if (specValue) jsonData.specificationValue = specValue;

    const featsArray = toArray(features);
    if (featsArray) jsonData.features = featsArray;

    const nutritionLbl = toArray(nutritionLabel);
    if (nutritionLbl) jsonData.nutritionLabel = nutritionLbl;

    const nutritionVal = toArray(nutritionValue);
    if (nutritionVal) jsonData.nutritionValue = nutritionVal;

    formData.append("data", JSON.stringify(jsonData));

    try {
      const { data } = await axios.patch(`/cakes/update-cake/${id}`, formData);

      const { success, message } = data;

      if (!success) {
        toast.error(message || "Server returned unsuccessful response");
        return;
      }

      toast.success(message || "Product updated successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update product";

      toast.error(errorMessage);
    }
  }

  if (productLoading || categoriesLoading) {
    return <FormLoadingSkeleton fieldCount={6} showTextarea={true} />;
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
                  { value: "CUPCAKE", label: "Cup Cake" },
                  { value: "CAKE", label: "Cake" },
                ]}
                // defaultValue={product?.cakeType}
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
