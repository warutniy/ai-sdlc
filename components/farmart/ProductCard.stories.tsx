import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCard } from "./ProductCard";

const meta = {
  title: "Farmart/ProductCard",
  component: ProductCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 220 }}><Story /></div>],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnSaleWithQty: Story = {
  args: {
    emoji: "🍾",
    sale: "SALE 20%",
    brand: "Brand Name",
    name: "Ice Red's Beer, 500ml x 24 Pieces",
    stars: "★★★★★",
    price: "$49.90",
    extra: "Total: $80.0",
    withQty: true,
  },
};

export const WithOldPrice: Story = {
  args: {
    emoji: "🥩",
    brand: "Meat Brand",
    name: "British Meat Mince (10% Fat)",
    stars: "★★★★☆",
    price: "$29.90",
    oldPrice: "$32.0",
    extra: "Sale: 20/50",
  },
};

export const ThumbnailOnly: Story = {
  args: {
    emoji: "🍱",
    name: "",
  },
};
