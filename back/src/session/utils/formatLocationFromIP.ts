import { getGeoFromIP } from '../../common/utils/getGeoFromIP';

export const formatLocationFromIP = (ip: string) => {
  const geo = getGeoFromIP(ip);
  if (!geo) return;

  if (geo.country && geo.city) return `${geo.country}, ${geo.city}`;
  if (geo?.country) return geo.country;
  if (geo?.city) return geo.city;
};
