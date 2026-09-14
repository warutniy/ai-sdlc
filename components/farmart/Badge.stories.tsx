import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Farmart/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["sale", "coupon", "cart-count"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sale: Story = {
  args: { variant: "sale", children: "SALE 20%" },
};

export const Coupon: Story = {
  args: { variant: "coupon", children: "Coupon Set" },
};

export const CartCount: Story = {
  args: { variant: "cart-count", children: "2" },
};
