import type { ReactNode } from "react";
import { Button } from "./Button";

export interface SignupPanelProps {
  heading?: string;
  description?: ReactNode;
  onRegister?: () => void;
}

/** {component.signup-panel} — the one card that departs from the white/gray/orange palette */
export function SignupPanel({
  heading = "15% OFF",
  description = "For new member sign up to the first order",
  onRegister,
}: SignupPanelProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-gradient-to-br from-[#f6dccf] to-[#f3d7cb] p-6">
      <h3 className="text-xl font-bold text-[#28374b]">{heading}</h3>
      <p className="text-xs text-[#6b5d55]">{description}</p>
      <input
        type="email"
        placeholder="✉  yourdomain@gmail.com"
        className="rounded border border-[#e0cfc4] bg-white px-3 py-2.5 text-xs"
      />
      <input
        type="password"
        placeholder="🔒  Password"
        className="rounded border border-[#e0cfc4] bg-white px-3 py-2.5 text-xs"
      />
      <label className="text-[11px] text-[#6b5d55]">
        <input type="checkbox" /> Or type Password
      </label>
      <Button variant="register" fullWidth className="mt-1.5 py-3" onClick={onRegister}>
        Register Now
      </Button>
    </div>
  );
}
