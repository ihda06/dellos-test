import clsx from "clsx";
import { ReactNode, useId, useRef, useState } from "react";

export default function Toggle({
  children,
  value,
  setValue,
  currentValue,
}: {
  children: ReactNode;
  value: string;
  setValue: (value: string) => void;
  currentValue: string;
}) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <label
        className={clsx(
          "flex items-center cursor-pointer bg-blue-100 text-blue-800 font-semibold px-3 rounded-full hover:bg-blue-400 duration-300 text-sm",
          {
            "bg-blue-400 text-white": value === currentValue,
          }
        )}
        htmlFor={id}
        onClick={() => {
          ref.current?.click();
        }}
      >
        {children}
      </label>
      <input
        ref={ref}
        type="checkbox"
        hidden
        checked={value === currentValue}
        onChange={() => {
          setValue(value);
        }}
        name={id}
      />
    </>
  );
}
