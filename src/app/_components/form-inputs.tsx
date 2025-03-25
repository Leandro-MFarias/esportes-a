import { Input } from "@/components/ui/input";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface ContainerInputProps<T extends FieldValues> {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>; // Tipagem automática via useForm
  name: Path<T>; // Garante que o nome seja uma chave válida do schema
  errors: FieldErrors<T>; // Tipagem para os erros do formulário
}

export function ContainerInput<T extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  name,
  errors,
}: ContainerInputProps<T>) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-bold text-zinc-300">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        className="outline-none"
        {...register(name)}
      />
      {errors[name]?.message && (
        <p className="pl-1 text-red-500 text-sm font-bold">
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
}
