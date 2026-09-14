import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Rating } from "./Rating";

const meta = {
  title: "Farmart/Rating",
  component: Rating,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { value: 5 },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { value: 4, size: "sm" },
};

export const WithReviewCount: Story = {
  args: { value: 5, reviewCount: 128, size: "md" },
};
