export const toastRootId = 'toast-root';

export const ensureToastContainerInRootDiv = () => {
  let toastRoot = document.getElementById(toastRootId);
  if(toastRoot) return toastRoot;

  toastRoot = document.createElement('div');
  toastRoot.id = toastRootId

  let rootDiv = document.getElementById('root');
  if (!rootDiv) {
    rootDiv = document.createElement('div');
    document.body.appendChild(rootDiv);
  }

  rootDiv.appendChild(toastRoot);

  return toastRoot
}