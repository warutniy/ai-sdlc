import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Banner } from "./Banner";

const meta = {
  title: "Farmart/Banner",
  component: Banner,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cool: Story = {
  args: {
    variant: "cool",
    title: "Active Summer With Juice Milk 300ml",
    description: "New drinks with natural fruits, pure milks, assorted flavors",
  },
};

export const Warm: Story = {
  args: {
    variant: "warm",
    title: "20% SALE OFF",
    description: "Synthetic seeds, Net 2.0 OZ",
  },
};
