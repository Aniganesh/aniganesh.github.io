import { renderToString } from "react-dom/server";
import App from "App";
import BlogPost from "Portfolio/BlogPost";

export function render() {
  return renderToString(<App />);
}

export function renderBlog() {
  return renderToString(<BlogPost />);
}
