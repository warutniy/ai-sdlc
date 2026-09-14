import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Farmart/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Wines & Alcohol Drinks", href: "/" },
      { label: "Ice Red's Beer, 500ml x 24 Pieces" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
