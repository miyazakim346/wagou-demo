import Sidebar from "@/components/layout/Sidebar";

type TwoColumnProps = {
  children: React.ReactNode;
};

export default function TwoColumn({ children }: TwoColumnProps) {
  return (
    <div className="grid gap-13 md:grid-cols-[1fr_auto] md:gap-[6%]">
      <main className="m-auto max-w-151.25 md:m-0">
        <div className="">{children}</div>
      </main>
      <aside className="md:w-75">
        <Sidebar />
      </aside>
    </div>
  );
}
