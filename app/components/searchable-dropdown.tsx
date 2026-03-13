// app/components/searchable-dropdown.tsx
import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { cn } from "~/common";

interface Option {
  readonly id: string;
  readonly label: string;
}

interface Props {
  readonly options: Option[];
  readonly value: string;
  readonly onOptionChange: (value: string) => void;
  readonly className?: string;
}

export default function SearchableDropdown({
  options,
  value,
  onOptionChange,
  className,
}: Props) {
  const [query, setQuery] = useState("");

  const selectedOption = options.find((o) => o.id === value) ?? null;

  const filtered =
    query === ""
      ? options
      : options.filter((o) =>
          o.label.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Combobox
      value={selectedOption}
      onChange={(option: Option | null) => {
        if (option) onOptionChange(option.id);
      }}
      onClose={() => setQuery("")}
    >
      <div className={cn("relative w-full", className)}>
        <ComboboxInput
          className="w-full text-sm border rounded-lg bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white focus:ring-orange-500 focus:border-orange-500 pr-8"
          displayValue={(option: Option | null) => option?.label ?? ""}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search timezones..."
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-4 w-4 text-zinc-400"
            aria-hidden="true"
          />
        </ComboboxButton>

        <ComboboxOptions
          portal
          anchor={{ to: "bottom start", gap: 4 }}
          className="z-50 max-h-60 w-(--input-width) overflow-auto rounded-lg bg-zinc-800 border border-zinc-600 text-sm shadow-lg focus:outline-none [--anchor-max-height:15rem]"
        >
          {filtered.length === 0 ? (
            <div className="py-2 px-3 text-zinc-400">No results found.</div>
          ) : (
            filtered.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className={({ focus }) =>
                  cn(
                    "cursor-default select-none py-1.5 px-3 flex items-center justify-between",
                    focus ? "bg-zinc-700 text-white" : "text-zinc-300",
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={cn(
                        "truncate",
                        selected && "text-white font-medium",
                      )}
                    >
                      {option.label}
                    </span>
                    {selected && (
                      <CheckIcon
                        className="h-4 w-4 text-orange-500 shrink-0 ml-2"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
