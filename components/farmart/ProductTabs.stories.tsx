import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductTabs } from "./ProductTabs";

const meta = {
  title: "Farmart/ProductTabs",
  component: ProductTabs,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    tabs: [
      { label: "Description", content: "Ice Red's signature lager, brewed for easy drinking." },
      { label: "Reviews", content: "★★★★★ — \"Great value for a full case.\"" },
      { label: "Nutrition Facts", content: "215 kcal · 4.5% ABV · 13g carbohydrates per 500ml." },
    ],
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
} satisfies Meta<typeof ProductTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
