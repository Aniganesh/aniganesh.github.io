import React, { FC } from "react";
import "./index.css";
import RootLayout from "./RootLayout";
import BlogPost from "./Portfolio/BlogPost";

const App: FC = () => {
  return typeof window !== "undefined" && window.location.pathname.startsWith("/writing/evaluating-gemini-and-claude-on-the-same-rag-task")
    ? <BlogPost />
    : <RootLayout />;
};

export default App;
