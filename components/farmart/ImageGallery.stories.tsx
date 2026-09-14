import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImageGallery } from "./ImageGallery";

const meta = {
  title: "Farmart/ImageGallery",
  component: ImageGallery,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    images: ["🍾", "🍺", "🧊", "🥂"],
    alt: "Ice Red's Beer, 500ml x 24 Pieces",
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleImage: Story = {
  args: { images: ["🍾"] },
};
