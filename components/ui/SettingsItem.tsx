import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  label: string;
  right?: ReactNode;
  href?: string;
};

export default function SettingsItem({
  icon,
  label,
  right,
  href,
}: Props) {
  const content = (
    <div className="settings-item">
      <div className="left">
        {icon}
        <span>{label}</span>
      </div>

      {right && <div className="right">{right}</div>}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
