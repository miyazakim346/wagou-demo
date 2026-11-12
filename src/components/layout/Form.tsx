import Label from "@/components/ui/formUi/Label";
import Input from "@/components/ui/formUi/Input";
import Select from "@/components/ui/formUi/Select";
import Textarea from "@/components/ui/formUi/Textarea";
import Submit from "@/components/ui/formUi/Submit";
import clsx from "clsx";

const SSG_FORM_URL = process.env.NEXT_PUBLIC_SSG_FORM;

export default function Form() {
  if (!SSG_FORM_URL) {
    return (
      <p className="text-center text-base leading-6.25 font-bold">
        現在はフォームの送信ができない状態です。
        <br />
        <br />
        しばらくしてもう一度お試しいただくか、info@example.comまでご連絡ください
      </p>
    );
  }

  return (
    // フォーム内に入力エラー（:user-invalid）があるとき、
    // 下にある「submit-error」クラスのメッセージを表示する
    <form
      className="grid gap-15 [&:has(:user-invalid)_.submit-error]:block"
      action={SSG_FORM_URL}
      method="post"
    >
      <div className="grid gap-5">
        <div className="grid gap-2 [&:has(:user-invalid)>.error]:block">
          <Label text="お名前" id="your-name" isRequired />
          <Input
            id="your-name"
            type="text"
            name="お名前"
            placeholder="山田 太郎"
            required={true}
          />
          <p
            className={clsx(
              "hidden text-[0.8125rem] leading-6.25 font-bold text-[#ef4444]",
              "error"
            )}
          >
            必須の入力項目です。
          </p>
        </div>
        <div className="grid gap-2 [&:has(:user-invalid)>.error]:block">
          <Label text="メールアドレス" id="your-email" isRequired />
          <Input
            id="your-email"
            type="email"
            name="メールアドレス"
            placeholder="example@example.com"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            required={true}
          />
          <p
            className={clsx(
              "hidden text-[0.8125rem] leading-6.25 font-bold text-[#ef4444]",
              "error"
            )}
          >
            メールアドレスの形式と異なります。
          </p>
        </div>
        <div className="grid gap-2 [&:has(:user-invalid)>.error]:block">
          <Label text="電話番号" id="your-tel" isRequired />
          <Input
            id="your-tel"
            type="tel"
            name="電話番号"
            placeholder="000-0000-0000"
            pattern="^0\d{9,10}$|^0\d{1,4}-\d{1,4}-\d{4}$"
            required={true}
          />
          <p
            className={clsx(
              "hidden text-[0.8125rem] leading-6.25 font-bold text-[#ef4444]",
              "error"
            )}
          >
            電話番号の形式と異なります。
          </p>
        </div>
        <div className="grid gap-2 [&:has(:user-invalid)>.error]:block">
          <Label
            text="予約第一希望日"
            id="your-date-01"
            isRequired
            noteText="例) 2026年10月1日"
          />
          <Input
            id="your-date-01"
            type="date"
            name="予約第一希望日"
            placeholder="年/月/日"
            dateToday={true}
            required={true}
          />
          <p
            className={clsx(
              "hidden text-[0.8125rem] leading-6.25 font-bold text-[#ef4444]",
              "error"
            )}
          >
            必須の入力項目です。
          </p>
        </div>
        <div className="grid gap-2">
          <Label
            text="予約第二希望日"
            id="your-date-02"
            isRequired={false}
            noteText="例) 2026年10月1日"
          />
          <Input
            id="your-date-02"
            type="date"
            name="予約第二希望日"
            placeholder="年/月/日"
            dateToday={true}
            required={false}
          />
          <p
            className={clsx(
              "hidden text-[0.8125rem] leading-6.25 font-bold text-[#ef4444]",
              "error"
            )}
          >
            必須の入力項目です。
          </p>
        </div>
        <div className="grid gap-2 [&:has(:user-invalid)>.error]:block">
          <Label text="お席の希望" id="your-select" isRequired={true} />
          <Select
            id="your-select"
            name="お席の希望"
            required={true}
            options={[
              { optionName: "カウンター", optionValue: "カウンター" },
              { optionName: "テーブル", optionValue: "テーブル" },
            ]}
          />
          <p
            className={clsx(
              "hidden text-[0.8125rem] leading-6.25 font-bold text-[#ef4444]",
              "error"
            )}
          >
            必須の入力項目です。
          </p>
        </div>
        <div className="grid gap-2">
          <Label text="備考欄" id="your-message" />
          <Textarea id="your-message" name="備考欄" />
        </div>
      </div>
      <div className="grid place-items-center">
        <Submit text="送信する" />
        <p
          className={clsx(
            "hidden text-[0.8125rem] leading-6.25 font-bold text-[#ef4444]",
            "submit-error"
          )}
        >
          入力内容に誤りがあります。
        </p>
      </div>
    </form>
  );
}
