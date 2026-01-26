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

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(
    @Body() dto: CreateEventDto,
    @Request() req: AuthRequest,
  ): Promise<CreatedEvent> {
    return await this.eventsService.create(req.user.id, dto);
  }

  @Get('subscribed')
  async getSubscribedEvents(@Request() req: AuthRequest) {
    return await this.eventsService.getSubscribedEvents(req.user.id);
  }

  @Get('upcoming')
  async getUpcomingEvents(@Request() req: AuthRequest) {
    // TODO: add service method for upcoming
    return await this.eventsService.getSubscribedEvents(req.user.id);
  }

  @Get('organized')
  async getOrganizedEvents(@Query('userId') userId: string) {
    return await this.eventsService.getOrganizedEvents(userId);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.eventsService.deleteEvent(id, req.user.id);
    return { message: 'Event deleted successfully' };
  }

  @Get(':id')
  async getEvent(@Param('id') id: string, @Request() req: AuthRequest) {
    return await this.eventsService.getOne(id, req.user.id);
  }

  @Post(':id/subscribe')
  async subscribe(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.eventsService.subscribe(id, req.user.id);
    return { message: 'User subscribed successfully' };
  }

  @Delete(':id/unsubscribe')
  async unsubscribe(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.eventsService.unsubscribe(id, req.user.id);
    return { message: 'User unsubscribe successfully' };
  }

  @Get(':id/participants')
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
