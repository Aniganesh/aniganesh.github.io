const isAnyProjectOpen = () => !!document.querySelector(".project-card.isOpen");

export const projectToggleHandler = (onStyleRemove: () => void) => {
  if (isAnyProjectOpen()) {
    document.body.style.overflow = "hidden";
    return;
  }
  document.body.style.overflow = "";
  onStyleRemove?.();
};
