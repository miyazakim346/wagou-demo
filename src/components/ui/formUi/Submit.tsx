type SubmitProps = {
  text: string;
};

export default function Submit({ text }: SubmitProps) {
  return (
    <button
      type="submit"
      className="bg-green hover:text-green border-green text-whiteAccent hover:bg-whiteAccent flex w-fit min-w-50 items-center justify-center overflow-hidden rounded-[1px_20px] border-2 px-12.75 py-[8px_10px] text-sm font-bold transition-colors duration-300"
    >
      {text}
    </button>
  );
}
