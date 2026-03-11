import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DyFormField({ fieldConfig }) {
  return (
    <FormField
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <FormControl>
            {fieldConfig.type === "file" ? (
              <Input
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
              />
            ) : fieldConfig.type === "textarea" ? (
              <Textarea
                placeholder={fieldConfig.placeholder}
                className="resize-none"
                {...field}
              />
            ) : fieldConfig.type === "select" ? (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder={fieldConfig.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {fieldConfig.items?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Input
                placeholder={fieldConfig.placeholder}
                type={fieldConfig.type || "text"}
                {...field}
              />
            )}
          </FormControl>
          {fieldConfig.description && (
            <FormDescription>{fieldConfig.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
