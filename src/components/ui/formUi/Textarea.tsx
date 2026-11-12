type TextareaProps = {
  id?: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
};

export default function Textarea({
  id = "",
  name,
  defaultValue = "",
  placeholder = "",
  required = false,
}: TextareaProps) {
  return (
    <textarea
      className="bg-whiteAccent border-green h-40 w-full appearance-none rounded-xs border px-3 py-2 text-base leading-6.25 font-bold placeholder:text-base placeholder:leading-6.25 placeholder:font-bold placeholder:text-[#D0D0D0]"
      name={name}
      id={id}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
    />
  );
}
