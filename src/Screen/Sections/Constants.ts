import { Project, SidebarLink } from "@types";
import chetLogo from "Assets/images/chet-logo.jpeg";

export const sidebarLinks: SidebarLink[] = [
  {
    text: "Github",
    link: "https://github.com/aniganesh",
  },
  {
    text: "Linkedin",
    link: "https://www.linkedin.com/in/aniruddha-ganesh/",
  },
  {
    text: "Instagram",
    link: "https://instagram.com/aniganesh741",
  },
  {
    text: "Youtube",
    link: "https://www.youtube.com/channel/UCTrowLhBSwU55fXwkFcFSBA",
  },
  {
    text: "Stackoverflow",
    link: "https://stackoverflow.com/users/10032950/frankencode",
  },
];
export const projects: Project[] = [
  {
    image:
      "https://i.pinimg.com/originals/00/b4/69/00b469328c4eb1f6cdb19a3638520857.jpg",
    imgSrc:
      "https://abilitytolov3.blogspot.com/1973/07/illustration-rajinikanth-vector.html",
    projectTitle: "Rajini lipsum",
    // projectSubtitle: '',
    details:
      "A fun VS Code extension that gives you placeholder text using iconic lines from Rajini's movies",
    url: "https://marketplace.visualstudio.com/items?itemName=aniruddha.rajini-lipsum",
  },
  {
    image:
      "https://cdn.iconscout.com/icon/premium/png-256-thumb/confused-man-606288.png",
    projectTitle: "Help me decide",
    imgSrc: "https://iconscout.com/icon/confused-man",
    // projectSubtitle: '',
    details:
      "A very simple single page application using HTML5, CSS3 and JS that helps you decide between tasks",
    url: "https://helpmedecide.vercel.app/",
  },
  {
    image:
      "https://static.vecteezy.com/system/resources/previews/000/510/084/original/color-palette-vector-illustration.jpg",
    projectTitle: "Colour palette creator",
    imgSrc:
      "https://www.vecteezy.com/vector-art/510084-color-palette-vector-illustration",
    // projectSubtitle: '',
    details: `A simple desktop app using python and tkinter that creates a colour scheme complementing Bootstrap's BEM specification adding modifier classes`,
    url: "https://github.com/Aniganesh/Colour-Palette-creator/",
  },
  // {
  //   image: '4',
  //   projectTitle: '',
  //   // projectSubtitle: '',
  //   details: '',
  //   url: '',
  // },
];
// const GRID_SPACING_LG = 40; const GRID_SPACING_MD = 20; const GRID_SPACING_SM = 10;

export const workProjects: Project[] = [
  {
    image: chetLogo,
    projectTitle: "Chet",
    imgSrc: chetLogo,
    details:
      "Chet is an e-learning platform that gives people the opportunity to learn from collections curated by experts from top companies",
    url: "https://chetnetwork.com/",
    role: "Front-end lead",
  },
  // {
  //   image: chetLogo,
  //   projectTitle: "Chet",
  //   imgSrc: chetLogo,
  //   details:
  //     "Built with React, easy-peasy and Typescript, Chet is an e-learning platform that gives people the opportunity to learn from collections curated by experts from top companies",
  //   url: "https://chetnetwork.com/",
  // },
];
