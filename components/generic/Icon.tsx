import * as icons from "@phosphor-icons/react/dist/ssr";

export default function Icon({
  icon,
  className,
  weight = "bold",
  onClick,
}: {
  icon: string;
  className?: string;
  weight?: string;
  onClick?: () => void;
}) {
  // @ts-ignore
  const PhosphorIcon = icons[icon];
  if (!PhosphorIcon) return <></>;
  return (
    <div onClick={onClick}>
      <PhosphorIcon aria-hidden className={className} weight={weight} />
    </div>
  );
}
