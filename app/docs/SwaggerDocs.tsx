"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

/** Renders the Farmart OpenAPI spec (public/openapi.json) with Swagger UI. */
export function SwaggerDocs() {
  return <SwaggerUI url="/openapi.json" />;
}
