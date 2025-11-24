import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    cloudinary.config({
      cloud_name: this.configService.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: this.configService.getOrThrow('CLOUDINARY_API_SECRET'),
    });
  }

  generateUniqueFileName(originalName: string) {
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    return `${baseName}-${uuidv4()}`;
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    return await cloudinary.uploader.upload(file.path, {
      folder,
      resource_type: 'auto',
      public_id: this.generateUniqueFileName(file.originalname),
    });
  }

  async uploadFiles(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<(UploadApiResponse | null)[]> {
    const uploadPromises = files.map((file) =>
      this.uploadFile(file, folder).catch(() => null),
    );

    return await Promise.all(uploadPromises);
  }
}
