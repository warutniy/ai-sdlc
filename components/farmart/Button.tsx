import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "register";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `primary` = add-to-cart-button (orange fill)
   * `secondary` = banner-cta-button (white on colored banner)
   * `register` = register-button (darker orange, used in the signup panel)
   */
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-[#f5a623] text-white",
  secondary: "bg-white text-[#28374b] ring-1 ring-[#eeeeee]",
  register: "bg-[#e5920f] text-white",
};

/** {component.add-to-cart-button} / {component.banner-cta-button} / {component.register-button} */
export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        "rounded px-5 py-2.5 text-[11px] font-bold",
        VARIANT_CLASSES[variant],
        fullWidth ? "w-full" : "w-max",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
