import * as z from "zod";
import { DyForm } from "@/components/common/DyForm";
import { DyFormField } from "@/components/common/DyFormField";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import Loading from "@/components/common/Loading";
import { PackagePlus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import DySelect from "@/components/common/DySelect";
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

const AddProduct = () => {
  const axios = useAxios();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/categories");
      return data?.data || [];
    },
  });

  const categoryItems = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  async function onSubmit(values) {
    console.log("Form values:", values);
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

    // Handle images - ensure we're working with an array
    const imageArray = Array.isArray(images) ? images : images ? [images] : [];
    if (imageArray.length > 0) {
      imageArray.forEach((image) => {
        if (image instanceof File) {
          formData.append("files", image);
        }
      });
    }

    // Prepare JSON data with proper handling of empty strings and type conversions
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
      const { data } = await axios.post("/cakes/create-cake", formData);

      const { success, message } = data;

      if (!success) {
        toast.error(message || "Server returned unsuccessful response");
        return;
      }

      toast.success(message || "Product created successfully!");
    } catch (error) {
      console.error("Error response:", error.response?.data);
      console.error("Error message:", error.message);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to create product";

      toast.error(errorMessage);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        icon={PackagePlus}
        title={"Add New Product"}
        description={"Create and publish a new cake product to your catalog"}
      />

      {/* Form Card */}
      <div className="bg-card rounded-lg border">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">Product Information</h2>
        </div>
        <div className="p-6">
          <DyForm
            schema={formSchema}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            submitText="Save Product"
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
                isLoading={isLoading}
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
            {/* </div> */}

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
                  label: "Specification Title",
                  placeholder: "e.g. Size, Weight",
                  description: "The title of the specification.",
                  type: "text",
                }}
              />
              <DyFormField
                fieldConfig={{
                  name: "specificationValue",
                  label: "Specification Value",
                  placeholder: "e.g. 20cm, 1kg",
                  description: "The value of the specification.",
                  type: "text",
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <DyFormField
                fieldConfig={{
                  name: "nutritionLabel",
                  label: "Nutritional Title",
                  placeholder: "e.g. Calories, Protein",
                  description: "The title of the nutritional information.",
                  type: "text",
                }}
              />
              <DyFormField
                fieldConfig={{
                  name: "nutritionValue",
                  label: "Nutritional Value",
                  placeholder: "e.g. 100gm, 200gm",
                  description: "The value of the nutritional information.",
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

export default AddProduct;
