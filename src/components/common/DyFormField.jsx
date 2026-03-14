import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldDescription, FieldLabel } from "../ui/field";

export function DyFormField({ fieldConfig }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[fieldConfig.name]?.message;

  return (
    <Controller
      name={fieldConfig.name}
      render={({ field }) => (
        <Field>
          <FieldLabel>{fieldConfig.label}</FieldLabel>
          {/* Input fields */}
          {fieldConfig.type === "file" ? (
            <Input
              {...field}
              type="file"
              accept={fieldConfig.accept}
              multiple={fieldConfig.multiple}
              onChange={(e) => {
                const files = e.target.files;
                if (fieldConfig.multiple) {
                  field.onChange(files);
                } else {
                  field.onChange(files ? files[0] : null);
                }
              }}
              name={field.name}
              onBlur={field.onBlur}
              ref={field.ref}
              {...register(field.name)}
            />
          ) : fieldConfig.type === "textarea" ? (
            <Textarea
              {...field}
              placeholder={fieldConfig.placeholder}
              className="resize-none"
              {...register(field.name)}
            />
          ) : (
            <Input
              {...field}
              placeholder={fieldConfig.placeholder}
              type={fieldConfig.type || "text"}
              {...register(field.name)}
            />
          )}
          {/* Field Description */}
          {fieldConfig.description && (
            <FieldDescription>{fieldConfig.description}</FieldDescription>
          )}
          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </Field>
      )}
    />
  );
}
