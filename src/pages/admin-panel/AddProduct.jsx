import * as z from "zod";
import { DyForm } from "@/components/common/DyForm";
import { DyFormField } from "@/components/common/DyFormField";

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
  rating: z.coerce.number().int().min(0).max(5).optional(),
  review: z.string().optional(),
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
  rating: 0,
  review: "",
  specificationLabel: "",
  specificationValue: "",
};

const AddProduct = () => {
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="mx-auto w-full max-w-5xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Add New Product
      </h1>
      <DyForm
        schema={formSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        submitText="Save Product"
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DyFormField
            fieldConfig={{
              name: "title",
              label: "Title",
              placeholder: "Enter product title",
              description: "The name of the cake.",
              type: "text",
            }}
          />
          <DyFormField
            fieldConfig={{
              name: "category",
              label: "Category",
              placeholder: "Enter category",
              description: "Product category.",
              type: "text",
            }}
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <DyFormField
            fieldConfig={{
              name: "cakeType",
              label: "Cake Type",
              placeholder: "e.g., Birthday, Wedding",
              description: "The type of the cake.",
              type: "text",
            }}
          />
        </div>

        <DyFormField
          fieldConfig={{
            name: "avatar",
            label: "Avatar Image",
            description: "Main image for the cake.",
            type: "file",
            accept: "image/*",
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
              placeholder: "1kg, 2kg (comma separated)",
              description: "Available weights.",
              type: "text",
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DyFormField
            fieldConfig={{
              name: "features",
              label: "Features",
              placeholder: "Eggless, Sugar-free (comma separated)",
              description: "Special features.",
              type: "text",
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
              name: "rating",
              label: "Initial Rating",
              placeholder: "0 to 5",
              description: "Average or starting rating.",
              type: "number",
            }}
          />
          <DyFormField
            fieldConfig={{
              name: "review",
              label: "Review Snippet",
              placeholder: "Enter an initial review",
              description: "A featured review for the product.",
              type: "text",
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DyFormField
            fieldConfig={{
              name: "specificationLabel",
              label: "Specification Label",
              placeholder: "e.g., Allergen Info",
              description: "Label for an additional specification.",
              type: "text",
            }}
          />
          <DyFormField
            fieldConfig={{
              name: "specificationValue",
              label: "Specification Value",
              placeholder: "e.g., Contains Nuts",
              description: "Value for the specification.",
              type: "text",
            }}
          />
        </div>
      </DyForm>
    </div>
  );
};

export default AddProduct;
