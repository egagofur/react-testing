interface ButtonProps {
  label: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function Button({
  label,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button disabled={disabled} type={type}>
      {label}
    </button>
  );
}
