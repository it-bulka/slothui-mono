import * as Generator from '@asyncapi/generator';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

const logger = new Logger('AsyncAPIDocs');

export async function buildAsyncApiDocs(): Promise<void> {
  try {
    const asyncapiPath = path.join(__dirname, 'asyncapi.ws.yaml');
    const outputDir = path.resolve(__dirname, '../../public/docs/ws');

    if (!fs.existsSync(asyncapiPath)) {
      throw new Error(`AsyncAPI file not found at ${asyncapiPath}`);
    }

    const yamlContent = fs.readFileSync(asyncapiPath, 'utf8');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    const generator = new Generator('@asyncapi/html-template', outputDir, {
      templateParams: {
        sidebarOrganization: 'byTags',
        singleFile: true, // compile with styles
      },
      forceWrite: true, // rewrite docs
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    await generator.generateFromString(yamlContent);
    logger.log('AsyncAPI documentation generated successfully!');
  } catch (err) {
    logger.error('Failed to generate AsyncAPI documentation', err);
    throw err;
  }
}
