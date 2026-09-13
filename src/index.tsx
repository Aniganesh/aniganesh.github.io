import App from "App";
import { hydrateRoot } from "react-dom/client";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

hydrateRoot(container, <App />);
