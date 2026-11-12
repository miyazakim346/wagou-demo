import ButtonOutline from "@/components/ui/ButtonOutline";

export default function InfoSection() {
  return (
    <div
      id="info"
      className="scroll-mt-(--header-height) py-12.5 md:py-[100px_50px]"
    >
      <div className="m-auto flex max-w-216 flex-col gap-9 px-5 sm:flex-row sm:items-center sm:justify-center sm:gap-10 md:gap-13">
        <div className="h-62.5 w-full overflow-hidden rounded-[20px] sm:h-84.25 sm:max-w-135">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.831058151688!2d136.8392667!3d34.885588399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60048768da9f32d9%3A0x8f3f6276902f957f!2z6Iy26IiXIOWSjOWQiA!5e0!3m2!1sja!2sjp!4v1786196815854!5m2!1sja!2sjp"
            className="h-full w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
        <div className="grid w-fit shrink-0 px-[9.09%] sm:px-0">
          <p className="text-xl leading-6.25 font-bold tracking-[.12em]">
            茶舗 和合
          </p>
          <div className="mt-4.75 grid gap-1.5">
            <p className="text-[0.9375rem] leading-6.25 font-bold tracking-[.12em]">
              愛知県〇〇市〇〇町0丁目0-0
            </p>
            <p className="text-[0.9375rem] leading-6.25 font-bold tracking-[.12em]">
              最寄り駅から徒歩15分
            </p>
          </div>
          <p className="mt-3 text-[1.375rem] leading-6.25 font-bold tracking-[.06em]">
            050-0000-0000
          </p>
          <div className="mt-6.5">
            <ButtonOutline
              href="https://maps.app.goo.gl/sFwV36UioEouegU38"
              text="Google mapへ"
              targetBlank
            />
          </div>
        </div>
      </div>
    </div>
  );
}
