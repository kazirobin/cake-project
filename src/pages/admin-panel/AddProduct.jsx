import * as z from "zod";
import { DyForm } from "@/components/common/DyForm";
import { DyFormField } from "@/components/common/DyFormField";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import Loading from "@/components/common/Loading";
import { PackagePlus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import DySelect from "@/components/common/DySelect";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  avatar: z.any().optional(),
  cakeType: z.string().min(2, "Type is required."),
  flavors: z.string().min(2, "At least one flavor is required."),
  weight: z.string().min(1, "Weight is required."),
  features: z.string().optional(),
  additionalImages: z.any().optional(),
  category: z.string().min(2, "Category is required."),
  stock: z.coerce.number().int().min(0, "Stock must be a positive integer."),
  specificationLabel: z.string().optional(),
  specificationValue: z.string().optional(),
});

const defaultValues = {
  title: "",
  description: "",
  price: 0,
  avatar: "",
  cakeType: "",
  flavors: "",
  weight: "",
  features: "",
  additionalImages: "",
  category: "",
  stock: 0,
  specificationLabel: "",
  specificationValue: "",
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

  function onSubmit(values) {
    console.log(values);
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
                  type: "number",
                }}
              />
              <DyFormField
                fieldConfig={{
                  name: "stock",
                  label: "Stock",
                  placeholder: "0",
                  description: "Current inventory count.",
                  type: "number",
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <DyFormField
                fieldConfig={{
                  name: "avatar",
                  label: "Avatar Image",
                  description: "Main image for the cake.",
                  type: "file",
                  accept: "image/*",
                }}
              />

              <DyFormField
                fieldConfig={{
                  name: "additionalImages",
                  label: "Additional Images",
                  description: "Other images for the cake.",
                  type: "file",
                  accept: "image/*",
                  multiple: true,
                }}
              />
            </div>

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
                  placeholder: "1kg, 2kg (comma separated)",
                  description: "Available weights.",
                  type: "text",
                }}
              />
            </div>

            <DyFormField
              fieldConfig={{
                name: "features",
                label: "Features",
                placeholder: "Eggless, Sugar-free (comma separated)",
                description: "Special features.",
                type: "text",
              }}
            />
          </DyForm>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
