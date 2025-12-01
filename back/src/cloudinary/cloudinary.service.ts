import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import * as streamifier from 'streamifier';

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

  async uploadFileStream(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            return reject(
              new Error(error.message || 'Cloudinary upload error'),
            );
          }

          if (!result) {
            return reject(new Error('Cloudinary returned no result'));
          }

          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async uploadFiles(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<(UploadApiResponse | null)[]> {
    const uploadPromises = files.map((file) => {
      return this.uploadFile(file, folder).catch(() => null);
    });

    return await Promise.all(uploadPromises);
  }

  async uploadFilesStream(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<(UploadApiResponse | null)[]> {
    const uploadPromises = files.map((file) => {
      return this.uploadFileStream(file, folder).catch(() => null);
    });

    return await Promise.all(uploadPromises);
  }

  async deleteFile(publicId: string) {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
  }

  async deleteMany(publicIds: { publicId: string }[]) {
    const arrToDel = publicIds.map((item) => this.deleteFile(item.publicId));

    const results = await Promise.allSettled(arrToDel);

    const accInitVal: {
      fulfilledPublicIds: string[];
      rejectedPublicIds: string[];
      rejectedDetails: {
        publicId: string;
        reason: unknown;
      }[];
    } = { fulfilledPublicIds: [], rejectedPublicIds: [], rejectedDetails: [] };

    return results.reduce((acc, item, index) => {
      const publicId = publicIds[index].publicId;
      if (item.status === 'fulfilled') {
        acc.fulfilledPublicIds.push(publicId);
      } else {
        acc.rejectedPublicIds.push(publicId);
        acc.rejectedDetails.push({ publicId, reason: item.reason });
      }

      return acc;
    }, accInitVal);
  }
}
