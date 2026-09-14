import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./Tabs";

const meta = {
  title: "Farmart/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    labels: ["All", "Fruits & Vegetables", "Frozen Seafoods", "Raw Meats", "Coffee & Teas", "Pet Foods"],
    activeIndex: 0,
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
