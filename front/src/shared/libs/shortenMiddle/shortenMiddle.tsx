export const shortenMiddle = (name: string, max = 15) => {
  if (name.length <= max) return name;
  const extIndex = name.lastIndexOf(".");
  const ext = extIndex !== -1 ? name.slice(extIndex) : "";
  const base = name.slice(0, extIndex);

  const half = Math.floor((max - ext.length) / 2);

  return base.slice(0, half) + "..." + base.slice(-half) + ext;
};