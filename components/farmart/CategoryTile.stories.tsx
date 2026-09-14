import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoryTile } from "./CategoryTile";

const meta = {
  title: "Farmart/CategoryTile",
  component: CategoryTile,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    emoji: "🍎",
    label: "Fruits & Vegetables",
    active: false,
  },
  decorators: [(Story) => <div style={{ width: 140 }}><Story /></div>],
} satisfies Meta<typeof CategoryTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { emoji: "🥖", label: "Breads & Sweets", active: true },
};
