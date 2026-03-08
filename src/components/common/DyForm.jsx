import React, { Children } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DyFormField } from "./DyFormField";

export function DyForm({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitText = "Submit",
  className = "space-y-8",
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function handleSubmit(values) {
    if (onSubmit) {
      onSubmit(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        {children}
        <Button type="submit">{submitText}</Button>
      </form>
    </Form>
  );
}
