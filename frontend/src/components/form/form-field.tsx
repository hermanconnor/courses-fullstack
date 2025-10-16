/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  serverError?: string;
}

const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
  register,
  error,
  serverError,
}: Props) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        {...register(name)}
        className="mt-1"
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {serverError && (
        <p className="mt-1 text-sm text-red-600">{serverError}</p>
      )}
    </div>
  );
};

export default FormField;
