import { parseUserAgent } from '../../common/utils/parseUserAgent';
import { IDevice, IBrowser, IOS } from 'ua-parser-js';

export const parseUserAgentForSession = (userAgent: string) => {
  const { device, os, browser } = parseUserAgent(userAgent);

  return {
    device: transformDeviceData(device),
    os: transformOsData(os),
    browser: transformBrowserData(browser),
  };
};

function transformDeviceData(deviceObj: IDevice): string {
  const device =
    [deviceObj.vendor].filter(Boolean).join(' ') +
    (deviceObj.type ? ` (${deviceObj.type})` : '');

  return device;
}

function transformBrowserData(browserObj: IBrowser): string {
  return (
    [browserObj.name].filter(Boolean).join(' ') +
    (browserObj.type ? ` (${browserObj.type})` : '')
  );
}

function transformOsData(os: IOS): string {
  return `${os.name} ${os.version || ''}`.trim();
}
