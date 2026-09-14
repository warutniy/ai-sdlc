import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "Farmart/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "register"],
    },
  },
  args: {
    children: "Add To Cart",
    variant: "primary",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", children: "Add To Cart" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Shop Now" },
  parameters: { backgrounds: { default: "dark" } },
};

export const Register: Story = {
  args: { variant: "register", children: "Register Now" },
};

export const FullWidth: Story = {
  args: { variant: "primary", children: "Add To Cart", fullWidth: true },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};
