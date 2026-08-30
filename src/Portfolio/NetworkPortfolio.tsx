import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { motion, MotionConfig } from "motion/react";
import ReactMarkdown from "react-markdown";
import ProfileImage from "Assets/images/Me3.png";
import { contactItems, portfolioProjects, profileContent, toolkitItems } from "./data";
import type { ContactItem, PortfolioIcon, PortfolioTab, ProjectModalState, ToolkitItem } from "./types";
import "./styles.css";

const PROFILE_IMAGE = ProfileImage;
const TABS: Array<{ id: PortfolioTab; label: string }> = [
  { id: "projects", label: "Projects" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

const positionsFor = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (index / Math.max(count, 1)) * Math.PI * 2;
    const radiusX = count > 12 ? 41 : 38;
    const radiusY = count > 12 ? 37 : 35;
    return {
      x: 50 + Math.cos(angle) * radiusX,
      y: 50 + Math.sin(angle) * radiusY,
    };
  });

const NetworkPortfolio: FC = () => {
  const [activeTab, setActiveTab] = useState<PortfolioTab>("projects");
  const [modal, setModal] = useState<ProjectModalState>({ isOpen: false, project: null });
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedToolkit, setSelectedToolkit] = useState<ToolkitItem | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [dragOffsets, setDragOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const networkNodesRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedNode = useRef<HTMLElement | null>(null);

  const items = useMemo(() => {
    if (activeTab === "toolkit") return toolkitItems;
    if (activeTab === "contact") return contactItems;
    return portfolioProjects;
  }, [activeTab]);

  const positions = useMemo(() => positionsFor(items.length), [items.length]);

  useEffect(() => {
    setSelectedToolkit(null);
    setSelectedContact(null);
    setModal({ isOpen: false, project: null });
    setProfileModalOpen(false);
    setDragOffsets({});
  }, [activeTab]);

  const updateDragOffset = (id: string, x: number, y: number) => {
    const bounds = networkNodesRef.current?.getBoundingClientRect();
    if (!bounds?.width || !bounds.height) return;
    setDragOffsets((current) => ({
      ...current,
      [id]: { x: (x / bounds.width) * 100, y: (y / bounds.height) * 100 },
    }));
  };

  const clearDragOffset = (id: string) => {
    setDragOffsets((current) => {
      if (!current[id]) return current;
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const linePositions = positions.map((position, index) => {
    const offset = dragOffsets[items[index].id];
    return {
      x: position.x + (offset?.x ?? 0),
      y: position.y + (offset?.y ?? 0),
    };
  });

  const openProject = (project: (typeof portfolioProjects)[number], node: HTMLElement) => {
    lastFocusedNode.current = node;
    setModal({ isOpen: true, project });
  };

  const closeModal = () => {
    setModal({ isOpen: false, project: null });
    window.setTimeout(() => lastFocusedNode.current?.focus(), 0);
  };

  const openProfile = (node: HTMLElement) => {
    lastFocusedNode.current = node;
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
    window.setTimeout(() => lastFocusedNode.current?.focus(), 0);
  };

  return (
    <MotionConfig reducedMotion="user">
    <main className="portfolio-shell" data-testid="network-portfolio">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="star-field" aria-hidden="true" />

      <header className="portfolio-header">
        <div className="tab-list" role="tablist" aria-label="Portfolio sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`tab-button ${activeTab === tab.id ? "is-active" : ""}`}
              data-testid={`network-tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="network-panel"
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (TABS.findIndex((entry) => entry.id === activeTab) + 1) % TABS.length;
                  setActiveTab(TABS[next].id);
                  document.getElementById(`tab-${TABS[next].id}`)?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const current = TABS.findIndex((entry) => entry.id === activeTab);
                  const previous = (current - 1 + TABS.length) % TABS.length;
                  setActiveTab(TABS[previous].id);
                  document.getElementById(`tab-${TABS[previous].id}`)?.focus();
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <section
        id="network-panel"
        className="network-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        data-testid="network-panel"
      >
        <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {linePositions.map((position, index) => (
            <line key={`${activeTab}-line-${index}`} className="connection-line" x1="50" y1="50" x2={position.x} y2={position.y} />
          ))}
        </svg>

        <button
          className="network-center"
          type="button"
          aria-label="About Aniruddha Ganesh"
          data-testid="network-profile-node"
          onClick={(event) => openProfile(event.currentTarget)}
        >
          <div className="profile-frame">
            <img src={PROFILE_IMAGE} alt="Aniruddha Ganesh" />
          </div>
        </button>

        <div className="network-nodes" data-testid="network-nodes" ref={networkNodesRef}>
          {items.map((item, index) => {
            const position = positions[index];
            const label = "projectTitle" in item ? item.projectTitle : item.label;
            const icon = "projectTitle" in item ? undefined : item.icon;
            return (
              <NodeButton
                key={item.id}
                id={item.id}
                label={label}
                icon={icon}
                image={"projectTitle" in item ? item.image : undefined}
                position={position}
                kind={activeTab}
                onClick={(event) => {
                  if ("projectTitle" in item) openProject(item, event.currentTarget);
                  if (activeTab === "toolkit") setSelectedToolkit(item as ToolkitItem);
                  if (activeTab === "contact") setSelectedContact(item as ContactItem);
                }}
                wobbleIndex={index}
                onDrag={(x, y) => updateDragOffset(item.id, x, y)}
                onDragTransitionEnd={() => clearDragOffset(item.id)}
                url={activeTab === "contact" ? (item as ContactItem).url : undefined}
              />
            );
          })}
        </div>
      </section>

      <footer className="portfolio-footer">
        <span className="status-dot" />
        <span>{activeTab === "projects" ? "SELECT A PROJECT TO EXPLORE" : activeTab === "toolkit" ? "A SYSTEMS-LEVEL VIEW OF MY TOOLKIT" : "FIND ME ACROSS THE NETWORK"}</span>
        {selectedToolkit && <span className="selection-note"> / {selectedToolkit.label}</span>}
        {selectedContact && <span className="selection-note"> / {selectedContact.label}</span>}
      </footer>

      {profileModalOpen && <ProfileModal onClose={closeProfileModal} />}
      {modal.isOpen && modal.project && <ProjectModal project={modal.project} onClose={closeModal} />}
    </main>
    </MotionConfig>
  );
};

interface NodeButtonProps {
  id: string;
  label: string;
  icon?: PortfolioIcon;
  image?: string;
  position: { x: number; y: number };
  kind: PortfolioTab;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onDrag: (x: number, y: number) => void;
  onDragTransitionEnd: () => void;
  wobbleIndex: number;
  url?: string;
}

const NodeButton: FC<NodeButtonProps> = ({ id, label, icon: Icon, image, position, kind, onClick, onDrag, onDragTransitionEnd, wobbleIndex, url }) => {
  const iconImage = image ?? (typeof Icon === "string" ? Icon : undefined);
  const IconComponent = typeof Icon === "string" ? undefined : Icon;
  const suppressClick = useRef(false);
  const placementStyle = {
    left: `${position.x}%`,
    top: `${position.y}%`,
    "--wobble-delay": `${(wobbleIndex % 5) * -0.55}s`,
    "--wobble-duration": `${5.2 + (wobbleIndex % 4) * 0.7}s`,
  } as React.CSSProperties;

  const contents = iconImage ? (
    <span className="node-logo">
      <img src={iconImage} alt="" draggable={false} />
    </span>
  ) : (
    <span className="node-icon">{IconComponent && <IconComponent size={34} weight="duotone" />}</span>
  );

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
    if (Math.hypot(info.offset.x, info.offset.y) > 4) {
      suppressClick.current = true;
      window.setTimeout(() => { suppressClick.current = false; }, 350);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (suppressClick.current) {
      event.preventDefault();
      suppressClick.current = false;
      return;
    }
    onClick(event);
  };

  const motionProps = {
    drag: true as const,
    dragConstraints: { top: -120, right: 120, bottom: 120, left: -120 },
    dragElastic: 0.18,
    dragMomentum: false,
    dragSnapToOrigin: true,
    whileDrag: { scale: 1.08 },
    whileHover: { scale: 1.08 },
    onDragStart: () => { suppressClick.current = true; },
    onDrag: (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => onDrag(info.offset.x, info.offset.y),
    onDragEnd: handleDragEnd,
    onDragTransitionEnd,
  };

  if (url) {
    return (
      <div className="node-placement" style={placementStyle}>
        <motion.a
          {...motionProps}
          className={`network-node ${kind}-node`}
          data-testid={`network-node-${id}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${label}`}
          onClick={handleClick}
        >
          {contents}
        </motion.a>
        <span className="node-label" aria-hidden="true">{label}</span>
      </div>
    );
  }

  return (
    <div className="node-placement" style={placementStyle}>
      <motion.button
        {...motionProps}
        className={`network-node ${kind}-node ${id === "express" ? "express-node" : ""}`}
        data-testid={`network-node-${id}`}
        type="button"
        aria-label={label}
        onClick={handleClick}
      >
        {contents}
      </motion.button>
      <span className="node-label" aria-hidden="true">{label}</span>
    </div>
  );
};

interface ProjectModalProps {
  project: (typeof portfolioProjects)[number];
  onClose: () => void;
}

const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  const closeButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" data-testid="project-modal">
        <button className="modal-close" type="button" aria-label="Close project details" data-testid="project-modal-close" ref={closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-project-image"><img src={project.image} alt="" /></div>
        <div className="modal-copy">
          <h2 id="project-modal-title">{project.projectTitle}</h2>
          <p className="modal-summary">{project.details}</p>
          {(project.roles?.length || project.duration) && (
            <div className="modal-meta">
              {project.roles?.map((role) => <span key={role}>{role}</span>)}
              {project.duration && <span>{project.duration}</span>}
            </div>
          )}
          {project.additionalDetails && <div className="modal-details"><ReactMarkdown>{project.additionalDetails}</ReactMarkdown></div>}
          {project.url && (
            <a className="modal-link" href={project.url} target="_blank" rel="noopener noreferrer">
              Visit project <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal: FC<ProfileModalProps> = ({ onClose }) => {
  const closeButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="project-modal profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-modal-title" data-testid="profile-modal">
        <button className="modal-close" type="button" aria-label="Close profile details" data-testid="profile-modal-close" ref={closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-project-image modal-profile-image">
          <img src={PROFILE_IMAGE} alt={profileContent.name} />
        </div>
        <div className="modal-copy">
          <h2 id="profile-modal-title">{profileContent.name}</h2>
          <p className="modal-summary">{profileContent.summary}</p>
          <div className="profile-sections">
            {profileContent.experience.map((entry) => (
              <section className="profile-section" key={entry.title}>
                <h3>{entry.title}</h3>
                <p>{entry.body}</p>
              </section>
            ))}
          </div>
          <div className="profile-expertise">
            {profileContent.expertise.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NetworkPortfolio;
