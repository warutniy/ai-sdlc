import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { QuantityStepper } from "./QuantityStepper";

const meta = {
  title: "Farmart/QuantityStepper",
  component: QuantityStepper,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof QuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StartingAtFive: Story = {
  args: { defaultValue: 5 },
};
