"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

/**
 * Self-contained interactive demo — owns the open/close state so it can be
 * dropped into a Server Component page (e.g. /design) or a Storybook story
 * without either of those needing to manage state themselves.
 */
export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Remove Item
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Remove item from cart?"
        primaryLabel="Remove"
        secondaryLabel="Keep it"
        onPrimaryClick={() => setOpen(false)}
      >
        This will remove &quot;Ice Red&apos;s Beer, 500ml x 24 Pieces&quot; from your cart. You
        can add it back anytime before checkout.
      </Dialog>
    </>
  );
}
