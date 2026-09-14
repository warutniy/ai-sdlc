import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SignupPanel } from "./SignupPanel";

const meta = {
  title: "Farmart/SignupPanel",
  component: SignupPanel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
} satisfies Meta<typeof SignupPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
