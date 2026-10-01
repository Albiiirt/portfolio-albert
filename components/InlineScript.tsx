// Wraps a `<script dangerouslySetInnerHTML>` the way Next.js recommends for
// scripts that must run synchronously before first paint (e.g. anti-flash
// theme scripts). Using type="text/plain" on the client avoids React's
// "Encountered a script tag while rendering" warning, since the browser
// never treats a non-executable type as a script to run — the script has
// already done its job during HTML parsing by the time React hydrates.
// suppressHydrationWarning accepts the resulting type mismatch.
// See: node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
