const portalId = 'portal-root';
export const ensurePortalRoot = () => {
  let rootPortal = document.getElementById(portalId);
  if (!rootPortal) {
    rootPortal = document.createElement('div');
    rootPortal.id = portalId;
    document.body.appendChild(rootPortal);
  }

  return rootPortal;
}