import * as z from "zod";
import { DyForm } from "@/components/common/DyForm";
import { DyFormField } from "@/components/common/DyFormField";
import axios from "axios";
import { toast } from "react-toastify";
// import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Title must be at least 2 characters."),
  image: z.any(),
});

const defaultValues = {
  name: "",
  image: null,
};

const ManageCategory = () => {
  //   const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    console.log("Submitted Category values:", values);
    const { name, image } = values;

    const formData = new FormData();
    formData.append("data", JSON.stringify({ name }));
    if (image) {
      formData.append("file", image);
    }

    console.log("Category Form Data: ", ...formData);
    try {
      //   setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/categories/create-category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            boundary: formData._boundary,
          },
        },
      );

      const { success, message } = data;

      if (!success) {
        toast.error("Failed to create category: " + message);
        throw new Error("Failed to create category");
      }

      toast.success(message || "Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Category</h1>
        <p className="text-muted-foreground mt-1">
          Create and publish a new category for your product
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-card rounded-lg border">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">Category Information</h2>
        </div>
        <div className="p-6">
          <DyForm
            schema={formSchema}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            submitText="Save Category"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <DyFormField
                fieldConfig={{
                  name: "name",
                  label: "Name",
                  placeholder: "Enter category name",
                  description: "The name of the category.",
                  type: "text",
                }}
              />
              <DyFormField
                fieldConfig={{
                  name: "image",
                  label: "Image",
                  description: "Image for the category.",
                  type: "file",
                  accept: "image/*",
                }}
              />
            </div>
          </DyForm>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
