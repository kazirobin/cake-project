import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (message) => sonnerToast(message, { variant: "success" }),
  error: (message) => sonnerToast(message, { variant: "error" }),
  info: (message) => sonnerToast(message, { variant: "default" }),
  remove: (id) => sonnerToast.dismiss(id),
};