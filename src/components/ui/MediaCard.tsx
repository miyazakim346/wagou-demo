type MediaCardProps = {
  id: string;
  date: string;
  text: string;
};

export default function MediaCard({ id, date, text }: MediaCardProps) {
  return (
    <div className="sssm:gap-[6%] ssm:gap-[15%] flex w-full items-center border-b border-[#939393] pb-2.5 pl-2.25 md:pb-2.75 md:pl-3">
      <p className="w-full max-w-25 text-[0.9375rem] leading-6.25 font-bold tracking-[.12em] md:max-w-30 md:text-base">
        {date}
      </p>
      <h3 className="flex-1 text-[0.9375rem] leading-6.25 font-bold tracking-[.12em] md:text-base">
        {text}
      </h3>
    </div>
  );
}
