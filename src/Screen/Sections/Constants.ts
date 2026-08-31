import { Project, SidebarLink } from "@types";
const chetLogo =
  "/projects/chet-logo.svg";
const pgLogo =
  "https://ik.imagekit.io/trulyrandom/portfolio/pg_logo_1.svg?updatedAt=1693208197553";
const rebnyLogo =
  "/favicons/rebny.ico";
const chardanLogo = "/projects/Chardan-Orig-Logo.png";
const ren3Logo = "/projects/ren3-logo.svg";
const comakeLogo = "/projects/comake-logo.gif";
const lexsitusLogo = "/projects/lexsitus.ico";
const clinchItLogo = "/projects/clinchit-logo.svg";

export const sidebarLinks: SidebarLink[] = [
  {
    text: "Github",
    link: "https://github.com/aniganesh",
  },
  {
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/aniruddha-ganesh/",
  },
  {
    text: "Instagram",
    link: "https://instagram.com/indicgames",
  },
  {
    text: "YouTube",
    link: "https://www.youtube.com/@thecodebuddha7246",
  },
  {
    text: "StackOverflow",
    link: "https://stackoverflow.com/users/10032950/frankencode",
  },
];

export const workProjects: Project[] = [
  {
    id: "ren3",
    image: ren3Logo,
    projectTitle: "ReN3",
    details:
      "An enterprise AI platform for ACL-aware knowledge ingestion, retrieval, concurrent streaming agent workflows, document processing, and workspace administration.",
    url: "",
    roles: ["Frontend contributor"],
    additionalDetails: `ReN3 is a multi-tenant enterprise AI platform that brings together knowledge ingestion, retrieval, agent workflows, document processing, streaming conversations, and workspace administration.

I worked as a frontend contributor across the web console and platform-facing frontend, building streaming chat, SharePoint knowledge-source flows, workspace administration, citation navigation, file exploration, artifact downloads, and workspace-scoped conversation behavior. I also worked on audit visibility, timestamps, file title editing, citation previews, and the interaction details that make a complex AI platform understandable to users.

One of the more demanding frontend problems was supporting multiple AG-UI chat streams at the same time without mixing conversation state or making the interface unnecessarily expensive to update. I implemented a per-conversation stream pool and in-memory registry, reusing the correct runtime by conversation ID while keeping slot-to-stream and running-thread bookkeeping isolated. Stream lifecycle handling covered terminal events, cancellation, errors, short idle gaps between chained runs, and prolonged periods without visible updates. Persisted history and optimistic messages were also coordinated so switching conversations did not flash or overwrite the wrong transcript.

I also implemented a reusable multi-format file viewer used by the product. It buffers URL, Blob, and ReadableStream sources, identifies file types from content and MIME data, and routes them to renderers for PDF, DOCX, XLSX/XLS/CSV, PPTX, images including multi-page TIFF, markdown, HTML, and text. The viewer exposes format-specific controls such as page navigation, zoom, spreadsheet sheet selection, and safe preview/source modes.

The wider platform includes API gateways, control-plane services, ingestion and indexing workers, shared libraries for ACLs, storage, streaming, and orchestration, as well as integrations for systems such as SharePoint, Salesforce, MCP servers, and databases. My work sits at the boundary between product UX and the distributed systems that power it.`,
    duration: "Dec 2025 - Present",
  },
  {
    id: "comake",
    image: comakeLogo,
    projectTitle: "Comake",
    details:
      "An enterprise knowledge-platform ecosystem for modeling data, capabilities, and composable interfaces across a shared semantic layer.",
    url: "",
    roles: ["Frontend engineer"],
    additionalDetails: `I worked on the frontend architecture for Comake's Standard Knowledge Platform and MeshUI, building the interface layer for a schema-driven, interoperable data system. The work spanned entity and schema management, configurable data views, UI composition and page builders, workflow editing, and the client-side services connecting these surfaces to the platform's APIs and Standard Knowledge Language.

My contributions focused on reusable state and interaction patterns for complex data products, including table navigation, sticky headers, entity and media rendering, autosave and row mutation, plugin contracts, issue views, and incremental loading. I also worked at the integration boundary between the shared SDK and engine services and the product UI, improving data-fetching and update behavior across the platform.

The goal was to make a highly configurable platform feel coherent and dependable while allowing teams to compose new domain-specific experiences without duplicating core UI behavior.`,
    duration: "Nov 2024 - Apr 2025",
  },
  {
    id: "lexsitus",
    image: lexsitusLogo,
    projectTitle: "Lexsitus",
    details:
      "A multilingual legal-information platform for researching, analyzing, and learning about international criminal law.",
    url: "https://cilrap-lexsitus.org",
    roles: ["Full-stack engineer"],
    additionalDetails: `I worked across the backend and frontend to migrate Lexsitus from Angular to Next.js and establish the content architecture for the new platform. I designed and set up the content schema and database model for multilingual legal documents, navigation, and related metadata, along with the migration tooling and APIs needed to move existing content into the new system.

On the frontend, I built the application shell and content workflows around that model, including document browsing, legal findings and decisions, facet-driven search, reading lists, sharing, print views, authentication, and localization. This required keeping the relationships in the legal information model consistent across the database, APIs, and user-facing navigation.

The focus was on modernizing the product without losing the depth of its legal information model, while making the platform easier to extend, migrate, and maintain.`,
    duration: "Jan 2025 - Apr 2025",
  },
  {
    id: "clinchit",
    image: clinchItLogo,
    projectTitle: "ClinchIt",
    details:
      "An AI sales platform for enterprise teams, combining account intelligence, conversational agents, RFP response generation, call assistance, live-call analysis, and health and sentiment analytics.",
    url: "https://clinchit.io",
    roles: ["Full-stack developer"],
    additionalDetails: `ClinchIt is an AI sales platform for enterprise teams. It combines account intelligence, conversational agents, RFP response generation, call assistance, live-call analysis, and health and sentiment analytics into a single product used by approximately 10 enterprise customers.

I worked across the frontend and backend to extend streaming account chat, agent tools, sales metrics, and integrations with Gmail, Asana, HubSpot, Snowflake, Microsoft Teams, and Zoom. I also worked on features that connected conversational context with account-level insights, helping sales teams understand customer health and act on information from the systems they already use.

    The product required more than simply adding an LLM-powered chat box. It involved integrating external systems, presenting long-running and streaming operations clearly, and building interfaces that made AI-generated analysis useful inside an existing sales workflow.`,
    duration: "Apr 2025 - Dec 2025",
  },
  {
    id: "chet",
    image: chetLogo,
    projectTitle: "Chet",
    details:
      "Chet is an e-learning platform that gives people the opportunity to learn from collections curated by experts from top companies",
    url: "https://chetnetwork.com/",
    roles: ["Front-end lead", "Front-end contributor"],
    additionalDetails:
      "Chet was my first major project post my internship. I started out as a Front-end contributor working on adding features to a completely newly setup react app.\n\nOver the next few months, I familiarized myself with the business requirements of the project and when the front-end lead moved on to a different organization, I was able to pick up from where he left off. I had by then learnt that this project came with an older admin app from where various parameters could be tuned and customized. Adding features to the admin app had been taken care of by the senior developer until then. After he moved on, I started managing this app too. I also trained newcomers by assigning tasks to them and helping them out as they stumbled upon issues.",
    duration: "Feb 2021 - Jun 2022",
  },
  {
    id: "pg",
    image: pgLogo,
    projectTitle: "Playground",
    details:
      "Playground is a social media style site for creators to connect with their audience and advertise their events, merchandise, podcasts, content and much more.",
    url: "https://playgroundapp.com/",
    additionalDetails:
      "Playground was my second major project. It is a considerably larger project than Chet and involved a larger team with upto 6 people working on the front-end alone at times. With frequently changing requirements, the project has undergone significant changes to every core feature at least twice. Playground was originally a small Flask project which we first ported to react in less than 2 weeks and then started adding new features one by one. With every new feature set the team would meet and discuss how to architect it such that there were minimum people who were blocked by another and could accommodate possible future changes. While our initial architecture seemed to work for a while, we started seeing issues with that implementation quite quickly as file became larger and less maintainable. So we switched to using a ViewModel pattern on the front-end to keep business logic and presentation logic separate. This made things way simpler and is our go-to pattern for our larger projects.\n\nI worked on various features in the project over the months contributing in creating components, updating components for new requirements and fixing issues that came up. One challenging aspect of this project was when we had issues with the image cropper we were using. Storing only the base64 data of the cropped part of the image meant we couldn't edit the image later and it also significantly made the image size larger leading to performance issues. I tried creating a custom implementation and that only made the issue worse. Following which I looked for a better library and also switched to storing the original image and the crop coordinates such that we could apply the appropriate transformation through our image cdn.",
    roles: ["Front-end contributor"],
  },
  {
    id: "chardan",
    image: chardanLogo,
    projectTitle: "Chardan website",
    details:
      'Built on a custom framework, the chardan website and "micro sites" serve a myriad different functions; from being a way for Chardan to communicate with the general public and various stakeholders by showcasing their projects to helping them comply with laws',
    url: "https://chardan.com",
    roles: ["Full-stack contributor"],
    additionalDetails:
      'The Chardan website was built using a CMS called [Prismic](https://prismic.io) and a custom framework that used [handlebars.js](https://handlebarsjs.com/) to "render" dynamic content from the CMS and [jquery](https://jquery.com/) for a myriad different functions within the app. The custom framework was essentially a [Nodejs](https://nodejs.org) and [Express](https://expressjs.com) app that connected to the CMS, generated all of the pages from it and served those pages along with a few REST endpoints that the app used. It also would generate "microsites" which were essentially smaller websites with no more than two or three static pages with very minimal interactivity and upload them to a S3 bucket that was then served over a caching service.\n\n When I joined this project, it had already been running for quite a few years. I was responsible for creating new components that were requested by the design team. These components would have their data in the CMS and the templates and processing for that data would be done by the framework that had been built using tools like gulp, babel, handlebars and less. Every time there was a new set of components to be built or new requirements came up, the Project manager and I would meet and discuss the requirements and how best to make those components such that whoever does content entry on that project finds it intuitive to add the content and ensure that components do not conflict with each other or affect the general layout of the website.\n\n One of the more challenging features on this project was a "table" component. The CMS\'s interface was not one that would allow adding tables quickly and safely. So an [airtable](https://airtable.com/) integration was built such that any tables added in a particular "base" was accessible to the app. All that was needed on the cms was to add a component which mentions the name of the table to be displayed. This also involved creating an app on the airtable platform that would trigger our webhook to rebuild the site whenever table data changed.',
    duration: "Nov 2021 - Mar 2023",
  },
  {
    id: "rebny",
    image: rebnyLogo,
    projectTitle: "REBNY lease store",
    details:
      "Rebny lease store is a web app that helps Real Estate Board of New York (REBNY) customers create customised leases for their properties within New York. REBNY's legal team would make templates for various types of commercial and residential leases which their customers could use to create custom leases from through the lease store interface",
    url: "https://lease-store.rebny.com",
    additionalDetails:
      "The REBNY Lease store web app allowed managing past leases and creating new ones from its interface. Once all details were finalized, the app would take the user to a payment page and once the payment was done, it would generate a finalized lease pdf that would not be editable by any fully compliant pdf reader/editor. It also allowed the user to preview watermarked pdfs that could be generated during any step in the lease customization process. \n\nEach lease had its template in a CMS called [Contentful](https://contentful.com). The back-end would fetch all of the content on demand and store them in the db whenever a new instance of that lease was created by a user. This ensured that even if there was a new revision of a lease, the user always got the same version that they initially saw.\n\nInitially I worked only on the front-end adding form components and a simple form state management solution.  As the back-end setup was finished, I worked on adding some features to the back-end too. With each lease type came its own requirements that needed backward compatible changes to lease types in the CMS. While most leases were similar enough to have one common structure, there were some that needed some special handling from a content formatting perspective. These had to be handled. There was also an AWS lambda λ setup that would generate the pdf. I worked on this too when the requirement to disable pdf editing came up.",
    duration: "Jun 2022 - Apr 2023",
    roles: ["Front-end contributor", "Full-stack contributor"],
  },
  {
    id: "humans",
    image:
      "https://images.squarespace-cdn.com/content/v1/62a0ff769bb0454090ba7a78/1676657933490-W71Z4TINOBT13RSCKAIU/favicon.ico?format=100w",
    projectTitle: "Humans",
    url: "https://humans.inc",
    details:
      "Humans is a web app and an IRL way to get like minded people together and form communities. The web app serves as a way to connect with people with similar interests.",
    additionalDetails:
      "The Humans web app is built with React, [D3](https://d3js.org), [GSAP](https://greensock.com/), [easy-peasy](https://easy-peasy.vercel.app/) and Typescript. The admin and back-end is powered by Strapi. GSAP powers most animations on the site with D3 powering the bubble simulation on its home page.\n\nWe built the MVP of the app in less than two weeks and over the next months added features gradually to it and tweaking various features to ensure that its unique interface works across devices reliably. \n\nWhile I did regularly work on features, I also did mentor and train one other person on this project and help him add features to the front-end.",
    roles: ["Front-end lead", "Front-end contributor"],
    duration: "Jan 2023 - Apr 2023",
  },
  {
    id: "truenose",
    image:
      "https://ik.imagekit.io/trulyrandom/portfolio/truenose_logo_large.png?updatedAt=1693208277270",
    projectTitle: "TrueNose",
    details:
      "Truenose is a business, offering non surgical rhinoplasty to their customers. I lead a small team on this project to port their site from Vue to Nextjs and added new features to it",
    url: "https://truenose.com",
    additionalDetails:
      "The Truenose app is built with Nextjs 13, incorporating SSR, image optimization and other features that come with Nextjs 13. We went with Nextjs as their previous site was built with Nuxt and Nextjs offered the same features with similar developer experience and it was something the team was familiar with. I worked with another developer to port their quiz module and fixed the various issues they'd had with their previous site. We also added transitions and some new features to their site. I was responsible for setting up the architecture, planning the delivery of features, reviewing code and mentoring the other dev on the project.",
    duration: "Apr 2023 - Jun 2023",
    roles: ["Front-end lead", "Front-end contributor"],
  },
  {
    id: "Foundation",
    image:
      "https://ik.imagekit.io/trulyrandom/portfolio/foundation_logo_large.png?updatedAt=1693208294821",
    projectTitle: "Foundation",
    details:
      "Foundation is a platform where people seeking therapy could find therapists that suit their needs. I worked with three other developers to build this site using Nextjs",
    url: "https://www.myfoundation.co/",
    additionalDetails:
      'Foundation is another project built with Nextjs 13. I worked on adding the personalization module for users and the "book appointment" flow ',
    duration: "Apr 2023 - Jun 2023",
    roles: ["Front-end contributor"],
  },
  // {
  //   id: "migo",
  //   image:
  //     "https://images.placeholders.dev/?width=256&height=256&text=Migo&bgColor=%23f7f6f6&textColor=%23cd65af",
  //   projectTitle: "Migo",
  //   url: "https://concierge.mithyalabs.com",
  //   details:
  //     "Migo is a travel assistant powered by a conversational AI, fine tuned to suggest events, guides and various things to plan your next trip to any travel destination",
  //   additionalDetails: "",
  //   duration: "Jul 2023 - Present",
  // },
];
