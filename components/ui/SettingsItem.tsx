import { ReactNode } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const goToHref = () => {
    if (href) {
      router.push(href)
    }
  }
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
    return <Button variant="plain" onClick={() => goToHref()} style={{ padding: 0 }}>{content}</Button>;
  }

  return content;
}
