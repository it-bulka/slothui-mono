import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../common/types/user.types';
import { CreateEventDto } from './dto/createEvent.dto';
import { CreatedEvent } from './dto/event.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../docs/swagger/api-auth.decorator';
import {
  ApiGetEvents,
  ApiCreateEvent,
  ApiGetSubscribedEvents,
  ApiGetUpcomingEvents,
  ApiGetOrganizedEvents,
  ApiDeleteEvent,
  ApiGetEvent,
  ApiSubscribeEvent,
  ApiUnsubscribeEvent,
  ApiGetEventParticipants,
} from './decorators/api-events.decorator';

@ApiTags('Events')
@ApiAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiGetEvents()
  async getMany(
    @Query('cursor') cursor: string,
    @Query('limit') limit: string,
    @Request() req: AuthRequest,
  ) {
    return await this.eventsService.getMany(req.user.id, {
      cursor,
      pageSize: Number(limit) || 50,
    });
  }

  @Post()
  @ApiCreateEvent()
  async create(
    @Body() dto: CreateEventDto,
    @Request() req: AuthRequest,
  ): Promise<CreatedEvent> {
    return await this.eventsService.create(req.user.id, dto);
  }

  @Get('subscribed')
  @ApiGetSubscribedEvents()
  async getSubscribedEvents(@Request() req: AuthRequest) {
    return await this.eventsService.getSubscribedEvents(req.user.id);
  }

  @Get('upcoming')
  @ApiGetUpcomingEvents()
  async getUpcomingEvents(
    @Query('cursor') cursor: string,
    @Request() req: AuthRequest,
  ) {
    return await this.eventsService.getUpcomingEvents(req.user.id, { cursor });
  }

  @Get('organized')
  @ApiGetOrganizedEvents()
  async getOrganizedEvents(
    @Query('userId') userId: string,
    @Request() req: AuthRequest,
  ) {
    return await this.eventsService.getOrganizedEvents(userId, {
      currentUserId: req.user.id,
    });
  }

  @Delete(':id')
  @ApiDeleteEvent()
  async deleteEvent(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.eventsService.deleteEvent(id, req.user.id);
    return { message: 'Event deleted successfully' };
  }

  @Get(':id')
  @ApiGetEvent()
  async getEvent(@Param('id') id: string, @Request() req: AuthRequest) {
    return await this.eventsService.getOne(id, req.user.id);
  }

  @Post(':id/subscribe')
  @ApiSubscribeEvent()
  async subscribe(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.eventsService.subscribe(id, req.user.id);
    return { message: 'User subscribed successfully' };
  }

  @Delete(':id/unsubscribe')
  @ApiUnsubscribeEvent()
  async unsubscribe(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.eventsService.unsubscribe(id, req.user.id);
    return { message: 'User unsubscribe successfully' };
  }

  @Get(':id/participants')
  @ApiGetEventParticipants()
  async getParticipants(
    @Param('id') id: string,
    @Query() q: { pageSize?: number; cursor?: string },
  ) {
    return await this.eventsService.getParticipantsCursor(id, {
      pageSize: q.pageSize,
      cursor: q.cursor,
    });
  }
}
