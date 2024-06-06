import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
}: {
  label?: string;
  options: Option[];
  value?: Option;
  onChange: (value: Option) => void;
  placeholder?: string;
}) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <ListboxButton className="p-2 rounded-lg border min-w-[200px] text-end">
          {(value && value.label) ?? placeholder}
        </ListboxButton>
      </div>
      <ListboxOptions
        anchor="bottom"
        className={"rounded-lg bg-white border w-[var(--button-width)]"}
      >
        {options.map((option: Option) => (
          <ListboxOption
            key={option.value}
            value={option.value}
            className="data-[focus]:bg-blue-100 p-4 cursor-pointer hover:bg-blue-100 duration-300"
          >
            {option.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
