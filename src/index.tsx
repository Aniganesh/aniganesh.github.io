import App from "App";
import { createRoot, hydrateRoot } from "react-dom/client";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

if (import.meta.env.DEV) {
  createRoot(container).render(<App />);
} else {
  hydrateRoot(container, <App />);
}
