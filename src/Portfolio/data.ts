import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  StackOverflowLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";

import AmazonS3Icon from "Assets/icons/amazonS3";
import ExpressIcon from "Assets/icons/express";
import GraphQLIcon from "Assets/icons/graphql";
import MongoDBIcon from "Assets/icons/mongodb";
import NestJSIcon from "Assets/icons/nestjs";
import ReactIcon from "Assets/icons/react";
import TypescriptIcon from "Assets/icons/typescript";
import UbuntuIcon from "Assets/icons/ubuntu";
import { sidebarLinks, workProjects } from "Screen/Sections/Constants";
import type { Project, SidebarLink } from "@types";
import type { ToolkitItem, ContactItem, PortfolioIcon } from "./types";

/**
 * Indic Games is the one retained personal project. It keeps the original
 * content while moving ownership from the retired section data to this new
 * portfolio data module.
 */
const indicGames: Project = {
  id: "indic-games",
  image: "https://indic-games.in/logo.svg",
  projectTitle: "Indic games",
  details: "Indic games is a website and a collection of games inspired from Indian knowledge systems.",
  url: "https://indic-games.in",
  additionalDetails: `Indic games is a passion project I started for fun and learning.
The first game is "Guess who?" an indic version of the classic guess who game. I first designed the project on Figma, planned it on Github projects, architected and executed it using React, Zustand, Express, Socket.io and Contentful over the next couple of months working after hours and weekends on the project. I also wrote the content for it in the same time period.`,
};

export const portfolioProjects: Project[] = [
  ...workProjects,
  indicGames,
];

/** Short alias for consumers that render the active Projects collection. */
export const projects = portfolioProjects;

/** Content for the profile node's cross-tab introduction modal. */
export const profileContent = {
  name: "Aniruddha Ganesh",
  summary:
    "I’m a product-focused software engineer who builds thoughtful interfaces for complex systems. My work sits at the intersection of frontend architecture, developer experience, and AI-powered products.",
  experience: [
    {
      title: "AI systems",
      body:
        "I’ve worked on enterprise AI products that bring together knowledge ingestion, retrieval, agent workflows, streaming conversations, document processing, and workspace administration. I care about making these systems understandable and useful in the moments where people rely on them.",
    },
    {
      title: "Product engineering",
      body:
        "Across ReN3 and ClinchIt, I’ve built interfaces for AI-assisted workflows, integrations, account intelligence, citations, long-running operations, and administration. Earlier work spans design systems, e-learning, creator platforms, websites, and document-heavy applications.",
    },
    {
      title: "How I work",
      body:
        "I like turning ambiguous product problems into clear, resilient experiences. That means thinking about the underlying data and workflows as carefully as the final interaction, then building with a bias toward maintainability and useful feedback.",
    },
  ],
  expertise: [
    "AI product interfaces",
    "Agent and streaming workflows",
    "Frontend architecture",
    "TypeScript and React",
    "Node.js systems",
    "Design systems and UI tooling",
  ],
};

const toolkitTechnology = (
  id: string,
  label: string,
  icon: PortfolioIcon,
  description?: string,
  url?: string
): ToolkitItem => ({
  id,
  label,
  icon,
  category: "technology",
  description,
  url,
});

/** Technologies, libraries, and packages shown by the Toolkit tab. */
export const toolkitItems: ToolkitItem[] = [
  toolkitTechnology("typescript", "TypeScript", TypescriptIcon),
  toolkitTechnology("react", "React", ReactIcon),
  toolkitTechnology("nestjs", "NestJS", NestJSIcon),
  toolkitTechnology("nodejs", "Node.js", "/favicons/nodejs.ico"),
  toolkitTechnology("express", "Express", ExpressIcon),
  toolkitTechnology("graphql", "GraphQL", GraphQLIcon),
  toolkitTechnology("mongodb", "MongoDB", MongoDBIcon),
  toolkitTechnology("postgresql", "PostgreSQL", "/favicons/postgresql-elephant.png"),
  toolkitTechnology("amazon-s3", "Amazon S3", AmazonS3Icon),
  toolkitTechnology("aws", "AWS", "/favicons/aws.ico"),
  toolkitTechnology("ubuntu", "Ubuntu", UbuntuIcon),
  toolkitTechnology("pulumi", "Pulumi", "/favicons/pulumi.ico"),
  toolkitTechnology("zustand", "Zustand", "/favicons/zustand.ico"),
  toolkitTechnology("socket-io", "Socket.IO", "/favicons/socket-io.png"),
];

const contactIconByText: Record<SidebarLink["text"], PortfolioIcon> = {
  Github: GithubLogo,
  LinkedIn: LinkedinLogo,
  Instagram: InstagramLogo,
  YouTube: YoutubeLogo,
  StackOverflow: StackOverflowLogo,
};

const contactLabelByText: Record<SidebarLink["text"], string> = {
  Github: "GitHub",
  LinkedIn: "LinkedIn",
  Instagram: "Instagram",
  YouTube: "YouTube",
  StackOverflow: "Stack Overflow",
};

const toContactId = (text: string): string =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Contact nodes retain the existing sidebar destinations and add icons. */
export const contactItems: ContactItem[] = sidebarLinks.map(({ text, link }) => ({
  id: toContactId(text),
  label: contactLabelByText[text],
  url: link,
  icon: contactIconByText[text],
}));
