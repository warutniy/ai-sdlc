import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

const meta = {
  title: "Farmart/Dialog",
  component: Dialog,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    open: true,
    onClose: () => {},
    title: "Remove item from cart?",
    children: null,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="flex min-h-[420px] items-center justify-center bg-[#f7f7f7] p-8">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Remove Item
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Remove item from cart?"
          primaryLabel="Remove"
          secondaryLabel="Keep it"
          onPrimaryClick={() => setOpen(false)}
        >
          This will remove &quot;Ice Red&apos;s Beer, 500ml x 24 Pieces&quot; from your cart. You
          can add it back anytime before checkout.
        </Dialog>
      </div>
    );
  },
};

export const Closed: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex min-h-[420px] items-center justify-center bg-[#f7f7f7] p-8">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Remove Item
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Remove item from cart?"
          primaryLabel="Remove"
          secondaryLabel="Keep it"
          onPrimaryClick={() => setOpen(false)}
        >
          This will remove &quot;Ice Red&apos;s Beer, 500ml x 24 Pieces&quot; from your cart. You
          can add it back anytime before checkout.
        </Dialog>
      </div>
    );
  },
};
