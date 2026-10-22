import { createFileRoute } from "@tanstack/react-router";
import { NotFoundComponent } from "./__root";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "Page not found — Blue Sign PR" }, { name: "robots", content: "noindex" }],
  }),
  component: NotFoundComponent,
});
