"use client";

import { useTheme } from "@/theme/ThemeProvider";
import Toggle from "./Toggle";

export default function ToggleColor() {
  const { color, setColor } = useTheme();

  return (
    <Toggle
      value={color}
      onChange={setColor}
      options={[
        { label: "Blue", value: "blue" },
        { label: "Cherry", value: "cherry" },
      ]}
    />
  );
}
