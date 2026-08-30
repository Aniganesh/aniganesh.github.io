import type { ComponentType } from "react";
import type { Icon } from "@phosphor-icons/react";

import type { CommonIconProps } from "Assets/icons/@types";
import type { Project } from "@types";

/** Icons can come from local SVG components, Phosphor, or checked external favicon URLs. */
export type PortfolioIcon = ComponentType<CommonIconProps> | Icon | string;

export type PortfolioTab = "projects" | "toolkit" | "contact";

export type NetworkNodeKind = "project" | "toolkit" | "contact";

export interface NodePosition {
  x: number;
  y: number;
}

export interface ToolkitItem {
  id: string;
  label: string;
  /** Required so every Toolkit node has a deterministic visual identity. */
  icon: PortfolioIcon;
  category: "technology";
  description?: string;
  url?: string;
}

export interface ContactItem {
  id: string;
  label: string;
  url: string;
  icon: PortfolioIcon;
}

export interface ProjectNode {
  id: string;
  kind: "project";
  label: string;
  project: Project;
  position?: NodePosition;
}

export interface ToolkitNode {
  id: string;
  kind: "toolkit";
  label: string;
  item: ToolkitItem;
  position?: NodePosition;
}

export interface ContactNode {
  id: string;
  kind: "contact";
  label: string;
  item: ContactItem;
  position?: NodePosition;
}

export type PortfolioNode = ProjectNode | ToolkitNode | ContactNode;

export type ProjectModalState =
  | { isOpen: false; project: null }
  | { isOpen: true; project: Project };
