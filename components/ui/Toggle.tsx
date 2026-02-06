"use client";

type Option<T> = {
  label: string | React.ReactNode;
  value: T;
};

type Props<T> = {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
};

export default function Toggle<T extends string>({
  value,
  onChange,
  options,
}: Props<T>) {
  return (
    <div className="segmented-toggle">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`segmented-btn ${
            value === opt.value ? "active" : ""
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
