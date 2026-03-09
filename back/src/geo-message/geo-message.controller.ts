import { Controller } from '@nestjs/common';
import { GeoMessageService } from './geo-message.service';

@Controller('geo-message')
export class GeoMessageController {
  constructor(private readonly geoMessageService: GeoMessageService) {}
}
