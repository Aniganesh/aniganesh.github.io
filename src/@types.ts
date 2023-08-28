export interface SidebarLink {
  text: string;
  link: string;
}

export interface Project {
  id: string;
  image: string;
  projectTitle: string;
  // projectSubtitle: string;
  details: string;
  url: string;
  imgSrc?: string;
  roles?: string[];
  additionalDetails?: string;
  duration?: string;
}
