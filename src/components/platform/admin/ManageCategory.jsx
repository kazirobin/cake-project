import * as z from "zod";
import { DyForm } from "@/components/common/DyForm";
import { DyFormField } from "@/components/common/DyFormField";
import { toast } from "react-toastify";
import useAxios from "@/hooks/use-axios";
import PageHeader from "@/components/common/PageHeader";
import { ChartGantt } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Title must be at least 2 characters."),
  image: z.any(),
});

const defaultValues = {
  name: "",
  image: undefined,
};

const ManageCategory = () => {
  const axios = useAxios();

  const onSubmit = async (values) => {
    const { name, image } = values;

    const formData = new FormData();
    formData.append("data", JSON.stringify({ name }));
    if (image) {
      formData.append("file", image);
    }

    try {
      const { data } = await axios.post(
        `/categories/create-category`,
        formData,
      );

      const { success, message } = data;

      if (!success) {
        toast.error(message);
        throw new Error("Failed to create category");
      }

      toast.success(message || "Category created successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        icon={ChartGantt}
        title={"Add New Category"}
        description={"Create and publish a new category for your product"}
      />

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
            submitLoadingText="Saving..."
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
