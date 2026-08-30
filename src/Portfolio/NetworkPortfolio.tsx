import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from "d3-force";
import ReactMarkdown from "react-markdown";
import ProfileImage from "Assets/images/Me3.png";
import { contactItems, portfolioProjects, profileContent, toolkitItems } from "./data";
import type { ContactItem, PortfolioIcon, PortfolioTab, ProjectModalState, ToolkitItem } from "./types";
import "./styles.css";

interface SimulationNode {
  id: string;
  targetX: number;
  targetY: number;
  radius: number;
  driftPhase: number;
  driftSpeed: number;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimulationLink {
  source: string;
  target: string;
}

interface SimulationBounds {
  width: number;
  height: number;
  padding: number;
}

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

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const createBoundsForce = (bounds: SimulationBounds) => {
  let nodes: SimulationNode[] = [];
  const force = () => {
    nodes.forEach((node) => {
      if (node.fx != null || node.fy != null || node.x == null || node.y == null) return;
      node.x = clamp(node.x, bounds.padding, bounds.width - bounds.padding);
      node.y = clamp(node.y, bounds.padding, bounds.height - bounds.padding);
    });
  };
  force.initialize = (nextNodes: SimulationNode[]) => { nodes = nextNodes; };
  return force;
};

const createDriftForce = (reducedMotion: boolean) => {
  let nodes: SimulationNode[] = [];
  const force = () => {
    if (reducedMotion) return;
    const time = performance.now() / 1000;
    nodes.forEach((node) => {
      if (node.fx != null || node.fy != null) return;
      node.vx = (node.vx ?? 0) + Math.cos(time * node.driftSpeed + node.driftPhase) * 0.09;
      node.vy = (node.vy ?? 0) + Math.sin(time * node.driftSpeed * 0.83 + node.driftPhase) * 0.09;
    });
  };
  force.initialize = (nextNodes: SimulationNode[]) => { nodes = nextNodes; };
  return force;
};

const NetworkPortfolio: FC = () => {
  const [activeTab, setActiveTab] = useState<PortfolioTab>("projects");
  const [modal, setModal] = useState<ProjectModalState>({ isOpen: false, project: null });
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedToolkit, setSelectedToolkit] = useState<ToolkitItem | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [simulatedPositions, setSimulatedPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const networkNodesRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedNode = useRef<HTMLElement | null>(null);
  const simulationRef = useRef<ReturnType<typeof forceSimulation<SimulationNode>> | null>(null);
  const simulationNodesRef = useRef<Map<string, SimulationNode>>(new Map());
  const simulationBoundsRef = useRef<SimulationBounds | null>(null);
  const dragState = useRef<{ id: string; pointerId: number; offsetX: number; offsetY: number } | null>(null);

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
  }, [activeTab]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const element = networkNodesRef.current;
    if (!element) return undefined;

    let frameId: number | null = null;
    let simulation: ReturnType<typeof forceSimulation<SimulationNode>> | null = null;

    const publishPositions = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        const bounds = simulationBoundsRef.current;
        if (!bounds) return;
        const nextPositions: Record<string, { x: number; y: number }> = {};
        simulationNodesRef.current.forEach((node) => {
          if (node.id === "profile" || node.x == null || node.y == null) return;
          nextPositions[node.id] = {
            x: (node.x / bounds.width) * 100,
            y: (node.y / bounds.height) * 100,
          };
        });
        setSimulatedPositions(nextPositions);
      });
    };

    const initialize = () => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      simulation?.stop();
      const mobile = window.matchMedia("(max-width: 700px)").matches || rect.width < 500;
      const nodeRadius = mobile ? 32 : clamp(Math.min(rect.width, rect.height) * 0.05, 40, 54);
      const centerRadius = mobile ? 48 : clamp(Math.min(rect.width, rect.height) * 0.11, 72, 110);
      const bounds: SimulationBounds = {
        width: rect.width,
        height: rect.height,
        padding: nodeRadius + 4,
      };
      simulationBoundsRef.current = bounds;

      const centerNode: SimulationNode = {
        id: "profile",
        targetX: rect.width / 2,
        targetY: rect.height / 2,
        radius: centerRadius,
        driftPhase: 0,
        driftSpeed: 0,
        x: rect.width / 2,
        y: rect.height / 2,
        fx: rect.width / 2,
        fy: rect.height / 2,
      };
      const surroundingNodes: SimulationNode[] = items.map((item, index) => {
        const target = positions[index];
        return {
          id: item.id,
          targetX: (target.x / 100) * rect.width,
          targetY: (target.y / 100) * rect.height,
          radius: nodeRadius + (mobile ? 7 : 12),
          driftPhase: index * 1.73,
          driftSpeed: 0.6 + (index % 4) * 0.11,
          x: (target.x / 100) * rect.width,
          y: (target.y / 100) * rect.height,
        };
      });
      const nodes = [centerNode, ...surroundingNodes];
      simulationNodesRef.current = new Map(nodes.map((node) => [node.id, node]));
      setSimulatedPositions(Object.fromEntries(surroundingNodes.map((node) => [node.id, {
        x: (node.x / rect.width) * 100,
        y: (node.y / rect.height) * 100,
      }])));

      const links: SimulationLink[] = surroundingNodes.map((node) => ({ source: "profile", target: node.id }));
      const linkForce = forceLink<SimulationNode, SimulationLink>(links)
        .id((node) => node.id)
        .distance(Math.min(rect.width, rect.height) * (mobile ? 0.3 : 0.34))
        .strength(0.015);

      simulation = forceSimulation<SimulationNode>(nodes)
        .velocityDecay(mobile ? 0.44 : 0.5)
        .force("link", linkForce)
        .force("charge", forceManyBody<SimulationNode>().strength(mobile ? -44 : -82).distanceMax(Math.max(rect.width, rect.height) * 1.25))
        .force("collide", forceCollide<SimulationNode>().radius((node) => node.radius).strength(0.85).iterations(2))
        .force("target-x", forceX<SimulationNode>((node) => node.targetX).strength(mobile ? 0.06 : 0.038))
        .force("target-y", forceY<SimulationNode>((node) => node.targetY).strength(mobile ? 0.06 : 0.038))
        .force("bounds", createBoundsForce(bounds))
        .force("drift", createDriftForce(reducedMotion))
        .on("tick", publishPositions);
      simulationRef.current = simulation;

      if (reducedMotion) {
        simulation.stop();
        simulation.tick(90);
        publishPositions();
      } else {
        simulation.alpha(0.95).alphaTarget(0.08).restart();
      }
    };

    initialize();
    const observer = new ResizeObserver(initialize);
    observer.observe(element);

    return () => {
      observer.disconnect();
      simulation?.stop();
      simulationRef.current = null;
      simulationNodesRef.current = new Map();
      simulationBoundsRef.current = null;
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [items, positions, reducedMotion]);

  const handleNodePointerDown = (id: string, event: React.PointerEvent<HTMLElement>) => {
    const node = simulationNodesRef.current.get(id);
    const bounds = simulationBoundsRef.current;
    if (!node || !bounds) return;
    const networkRect = networkNodesRef.current?.getBoundingClientRect();
    if (!networkRect) return;
    const pointerX = event.clientX - networkRect.left;
    const pointerY = event.clientY - networkRect.top;
    node.fx = node.x;
    node.fy = node.y;
    node.vx = 0;
    node.vy = 0;
    dragState.current = {
      id,
      pointerId: event.pointerId,
      offsetX: node.x - pointerX,
      offsetY: node.y - pointerY,
    };
    simulationRef.current?.alphaTarget(reducedMotion ? 0.08 : 0.22).restart();
  };

  const handleNodePointerMove = (id: string, event: React.PointerEvent<HTMLElement>) => {
    const currentDrag = dragState.current;
    const node = simulationNodesRef.current.get(id);
    const bounds = simulationBoundsRef.current;
    const networkRect = networkNodesRef.current?.getBoundingClientRect();
    if (!currentDrag || currentDrag.id !== id || currentDrag.pointerId !== event.pointerId || !node || !bounds || !networkRect) return;
    node.fx = clamp(event.clientX - networkRect.left + currentDrag.offsetX, bounds.padding, bounds.width - bounds.padding);
    node.fy = clamp(event.clientY - networkRect.top + currentDrag.offsetY, bounds.padding, bounds.height - bounds.padding);
    node.x = node.fx;
    node.y = node.fy;
    setSimulatedPositions((current) => ({
      ...current,
      [id]: { x: (node.x / bounds.width) * 100, y: (node.y / bounds.height) * 100 },
    }));
  };

  const handleNodePointerEnd = (id: string, event: React.PointerEvent<HTMLElement>) => {
    const currentDrag = dragState.current;
    const node = simulationNodesRef.current.get(id);
    if (!currentDrag || currentDrag.id !== id || currentDrag.pointerId !== event.pointerId || !node) return;
    node.fx = null;
    node.fy = null;
    dragState.current = null;
    simulationRef.current?.alphaTarget(reducedMotion ? 0 : 0.08).restart();
  };

  const linePositions = items.map((item, index) => simulatedPositions[item.id] ?? positions[index]);

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
            const position = simulatedPositions[item.id] ?? positions[index];
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
                onPointerDown={(event) => handleNodePointerDown(item.id, event)}
                onPointerMove={(event) => handleNodePointerMove(item.id, event)}
                onPointerEnd={(event) => handleNodePointerEnd(item.id, event)}
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
  onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerEnd: (event: React.PointerEvent<HTMLElement>) => void;
  url?: string;
}

const NodeButton: FC<NodeButtonProps> = ({ id, label, icon: Icon, image, position, kind, onClick, onPointerDown, onPointerMove, onPointerEnd, url }) => {
  const iconImage = image ?? (typeof Icon === "string" ? Icon : undefined);
  const IconComponent = typeof Icon === "string" ? undefined : Icon;
  const logoClass = ["mongodb", "postgresql", "nodejs", "pulumi"].includes(id) ? `${id}-node` : "";
  const suppressClick = useRef(false);
  const pointerState = useRef<{ pointerId: number; startX: number; startY: number; moved: boolean } | null>(null);
  const placementStyle = {
    left: `${position.x}%`,
    top: `${position.y}%`,
  } as React.CSSProperties;

  const contents = iconImage ? (
    <span className="node-logo">
      <img src={iconImage} alt="" draggable={false} />
    </span>
  ) : (
    <span className="node-icon">{IconComponent && <IconComponent size={34} weight="duotone" />}</span>
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    pointerState.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    onPointerDown(event);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const currentPointer = pointerState.current;
    if (!currentPointer || currentPointer.pointerId !== event.pointerId) return;
    if (Math.hypot(event.clientX - currentPointer.startX, event.clientY - currentPointer.startY) > 4) currentPointer.moved = true;
    onPointerMove(event);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLElement>) => {
    const currentPointer = pointerState.current;
    if (!currentPointer || currentPointer.pointerId !== event.pointerId) return;
    if (currentPointer.moved) {
      suppressClick.current = true;
      window.setTimeout(() => { suppressClick.current = false; }, 350);
    }
    onPointerEnd(event);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pointerState.current = null;
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (suppressClick.current) {
      event.preventDefault();
      suppressClick.current = false;
      return;
    }
    onClick(event);
  };

  if (url) {
    return (
      <div className="node-placement" style={placementStyle}>
        <a
          className={`network-node ${kind}-node ${logoClass}`}
          data-testid={`network-node-${id}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${label}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onClick={handleClick}
        >
          {contents}
        </a>
        <span className="node-label" aria-hidden="true">{label}</span>
      </div>
    );
  }

  return (
    <div className="node-placement" style={placementStyle}>
      <button
        className={`network-node ${kind}-node ${id === "express" ? "express-node" : ""} ${logoClass}`}
        data-testid={`network-node-${id}`}
        type="button"
        aria-label={label}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClick={handleClick}
      >
        {contents}
      </button>
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
