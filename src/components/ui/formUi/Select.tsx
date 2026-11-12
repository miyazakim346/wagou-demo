type SelectProps = {
  id?: string;
  name: string;
  options: {
    optionName: string;
    optionValue: string;
  }[];
  required?: boolean;
};

export default function Select({
  id = "",
  name,
  options,
  required = false,
}: SelectProps) {
  return (
    <select
      className="bg-whiteAccent border-green bg-[bottom 50px right 100px] h-10 w-full appearance-none rounded-xs border bg-[url(/dropdown-arrow.svg)] bg-position-[98%_50%] bg-no-repeat px-3 py-2 text-base leading-6.25 font-bold placeholder:text-base placeholder:leading-6.25 placeholder:font-bold placeholder:text-[#D0D0D0]"
      id={id}
      name={name}
      required={required}
    >
      <option value="" className="text-base leading-6.25 font-bold">
        選択してください
      </option>
      {options.map((option) => {
        return (
          <option
            key={option.optionValue}
            value={option.optionValue}
            className="text-base leading-6.25 font-bold"
          >
            {option.optionName}
          </option>
        );
      })}
    </select>
  );
}
