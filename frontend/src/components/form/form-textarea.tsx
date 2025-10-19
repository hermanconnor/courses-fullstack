/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  name: string;
  label: string;
  rows?: number;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  serverError?: string;
};

const FormTextArea = ({
  name,
  label,
  rows,
  placeholder,
  register,
  error,
  serverError,
}: Props) => {
  return (
    <div className="md:col-span-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        {...register(name)}
        rows={rows}
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

export default FormTextArea;
