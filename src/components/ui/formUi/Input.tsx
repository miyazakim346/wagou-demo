"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type InputProps = {
  id?: string;
  type: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  dateToday?: boolean;
  pattern?: string;
};

export default function Input({
  id = "",
  type,
  name,
  placeholder = "",
  defaultValue = "",
  required = false,
  dateToday = false,
  ...restOFProps
}: InputProps) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // ブラウザ表示後にローカル時間の今日を設定し、過去日付を選べないようにする
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    if (!dateToday) {
      input.removeAttribute("min");
      return;
    }

    const now = new Date();
    const localToday = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    input.min = localToday;
  }, [dateToday]);

  // date input の年/月/日部分の色を、未入力時はグレー・入力済みは黒にする
  const dateEditColorClasses = `
    [&::-webkit-datetime-edit-fields-wrapper]:text-[#D0D0D0]
    [&::-webkit-datetime-edit-text]:text-[#D0D0D0]
    [&::-webkit-datetime-edit-month-field]:text-[#D0D0D0]
    [&::-webkit-datetime-edit-day-field]:text-[#D0D0D0]
    [&::-webkit-datetime-edit-year-field]:text-[#D0D0D0]
    ${
      value
        ? `[&::-webkit-datetime-edit-fields-wrapper]:!text-black
           [&::-webkit-datetime-edit-text]:!text-black
           [&::-webkit-datetime-edit-month-field]:!text-black
           [&::-webkit-datetime-edit-day-field]:!text-black
           [&::-webkit-datetime-edit-year-field]:!text-black`
        : ""
    }
  `;
  return (
    <input
      ref={inputRef}
      className={clsx(
        "bg-whiteAccent border-green h-10 w-full appearance-none rounded-xs border px-3 py-2 text-base leading-6.25 font-bold placeholder:text-base placeholder:leading-6.25 placeholder:font-bold",
        type === "date" ? dateEditColorClasses : ""
      )}
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
      {...restOFProps} // pattern属性
    />
  );
}
