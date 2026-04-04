import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Label } from "../ui/label";

export function DyFormField({ fieldConfig }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[fieldConfig.name]?.message;

  return (
    <Controller
      name={fieldConfig.name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel>
            {fieldConfig.type === "switch" ? "" : fieldConfig.label}
          </FieldLabel>

          {/* FILE INPUT */}
          {fieldConfig.type === "file" ? (
            <Input
              type="file"
              accept={fieldConfig.accept}
              multiple={fieldConfig.multiple}
              onChange={(e) => {
                const files = e.target.files;
                field.onChange(
                  fieldConfig.multiple ? files : (files?.[0] ?? null),
                );
              }}
            />
          ) : fieldConfig.type === "textarea" ? (
            <Textarea
              {...field}
              placeholder={fieldConfig.placeholder}
              className="resize-none"
            />
          ) : fieldConfig.type === "switch" ? (
            <div className="flex items-center space-x-2">
              <Label htmlFor={fieldConfig.name}>{fieldConfig.label}</Label>
              <Switch
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          ) : (
            <Input
              {...field}
              placeholder={fieldConfig.placeholder}
              type={fieldConfig.type || "text"}
            />
          )}

          {fieldConfig.description && (
            <FieldDescription>{fieldConfig.description}</FieldDescription>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}
        </Field>
      )}
    />
  );
}
