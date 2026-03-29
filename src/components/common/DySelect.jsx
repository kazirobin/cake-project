import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldDescription, FieldLabel } from "../ui/field";

const DySelect = ({
  name,
  label,
  selectLabel,
  placeholder,
  description,
  items,
  isLoading,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          {/* Select Dropdown */}
          <Select
            {...field}
            value={field.value}
            onValueChange={field.onChange}
            disabled={isLoading}
            {...register(field.name)}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{selectLabel}</SelectLabel>
                {items?.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Field Description */}
          {description && <FieldDescription>{description}</FieldDescription>}
          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </Field>
      )}
    />
  );
};

export default DySelect;
