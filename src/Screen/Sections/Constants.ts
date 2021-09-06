import {Project, SidebarLink} from '@types';

export const sidebarLinks: SidebarLink[]= [
  {
    text: 'Github',
    link: 'https://github.com/aniganesh',
  }, {
    text: 'Linkedin',
    link: 'https://www.linkedin.com/in/aniruddha-ganesh/',
  }, {
    text: 'Instagram',
    link: 'https://instagram.com/aniganesh741',
  }, {
    text: 'Youtube',
    link: 'https://www.youtube.com/channel/UCTrowLhBSwU55fXwkFcFSBA',
  },
];
export const projects :Project[] =[
  {
    image: 'https://i.pinimg.com/originals/00/b4/69/00b469328c4eb1f6cdb19a3638520857.jpg',
    imgSrc: 'https://abilitytolov3.blogspot.com/1973/07/illustration-rajinikanth-vector.html',
    projectTitle: 'Rajini lipsum',
    // projectSubtitle: '',
    details: 'A fun VS Code extension that gives you placeholder text using iconic lines from Rajini\'s movies',
    url: 'https://marketplace.visualstudio.com/items?itemName=aniruddha.rajini-lipsum',
  },
  {
    image: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/confused-man-606288.png',
    projectTitle: 'Help me decide',
    imgSrc: 'https://iconscout.com/icon/confused-man',
    // projectSubtitle: '',
    details: 'A very simple single page application using HTML5, CSS3 and JS that helps you decide between tasks',
    url: 'https://helpmedecide.vercel.app/',
  },
  {
    image: 'https://static.vecteezy.com/system/resources/previews/000/510/084/original/color-palette-vector-illustration.jpg',
    projectTitle: 'Colour palette creator',
    imgSrc: 'https://www.vecteezy.com/vector-art/510084-color-palette-vector-illustration',
    // projectSubtitle: '',
    details: `A simple desktop app using python and tkinter that creates a colour scheme complementing Bootstrap's BEM specification adding modifier classes`,
    url: 'https://github.com/Aniganesh/Colour-Palette-creator/',
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
