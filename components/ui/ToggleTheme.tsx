"use client";

import { useTheme } from "@/theme/ThemeProvider";
import Toggle from "./Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ToggleTheme() {
  const { mode, setMode } = useTheme();

  return (
    <Toggle
      value={mode}
      onChange={setMode}
      options={[
        { label: <FontAwesomeIcon icon={faSun} />, value: "light" },
        { label: <FontAwesomeIcon icon={faMoon} />, value: "dark" },
      ]}
    />
  );
}
