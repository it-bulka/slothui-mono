const portalId = 'portal-root';
export const ensurePortalRoot = () => {
  let rootPortal = document.getElementById(portalId);
  if (!rootPortal) {
    rootPortal = document.createElement('div');
    rootPortal.id = portalId;
    document.appendChild(rootPortal);
  }

  return rootPortal;
}