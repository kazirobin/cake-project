import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";

export function DyForm({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitText = "Submit",
  submitLoadingText = "Submitting...",
  className = "space-y-8",
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
      form.reset();
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        {children}

        <Button
          type="submit"
          className="cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner />
              <span>{submitLoadingText}</span>
            </div>
          ) : (
            submitText
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
