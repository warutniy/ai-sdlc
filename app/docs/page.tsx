import type { Metadata } from "next";
import { SwaggerDocs } from "./SwaggerDocs";

export const metadata: Metadata = {
  title: "API Docs — Farmart",
  description: "Swagger UI for the Farmart API spec (public/openapi.json)",
};

export default function DocsPage() {
  return <SwaggerDocs />;
}
