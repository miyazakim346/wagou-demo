import clsx from "clsx";

type LabelProps = {
  text: string;
  isRequired?: boolean;
  id?: string;
  noteText?: string;
};

export default function Label({
  text,
  isRequired = false,
  id = "",
  noteText,
}: LabelProps) {
  return (
    <div className="flex items-center gap-4.5">
      <div className="flex min-w-39 items-center gap-2">
        <label htmlFor={id} className="text-base leading-6.25 font-bold">
          {text}
        </label>
        <span
          className={clsx(
            "bg-green rounded-[1px] px-1.5 py-0.5 text-[0.75rem] leading-3 font-bold text-white",
            isRequired ? "inline-block" : "hidden"
          )}
        >
          必須
        </span>
      </div>
      <p
        className={clsx(
          "block text-base leading-6.25 font-bold",
          noteText ? "block" : "hidden"
        )}
      >
        {noteText}
      </p>
    </div>
  );
}
