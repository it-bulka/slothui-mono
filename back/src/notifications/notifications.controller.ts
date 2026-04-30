import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { GetNotificationsQueryDto } from './dto/get-notifications-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../common/types/user.types';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../docs/swagger/api-auth.decorator';
import {
  ApiGetNotifications,
  ApiGetUnreadCount,
  ApiMarkAllRead,
  ApiMarkOneRead,
} from './decorators/api-notifications.decorator';

@ApiTags('Notifications')
@ApiAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiGetNotifications()
  getList(
    @Request() req: AuthRequest,
    @Query() query: GetNotificationsQueryDto,
  ) {
    return this.notificationsService.getList(
      req.user.id,
      query.cursor,
      query.limit,
    );
  }

  @Get('unread-count')
  @ApiGetUnreadCount()
  getUnreadCount(@Request() req: AuthRequest) {
    return this.notificationsService.getUnreadCount(req.user.id);
  }

  @Post('mark-all-read')
  @ApiMarkAllRead()
  markAllAsRead(@Request() req: AuthRequest) {
    return this.notificationsService.markAllAsRead(req.user.id);
  }

  @Post(':id/read')
  @ApiMarkOneRead()
  markOneAsRead(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.notificationsService.markOneAsRead(id, req.user.id);
  }
}
