import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export const ApiGetEvents = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a paginated list of all events' }),
    ApiQuery({
      name: 'cursor',
      required: false,
      description: 'Pagination cursor',
    }),
    ApiQuery({ name: 'limit', required: false, example: 50 }),
    ApiOkResponse({ description: 'Paginated event list' }),
  );

export const ApiCreateEvent = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new event' }),
    ApiCreatedResponse({ description: 'Event created successfully' }),
  );

export const ApiGetSubscribedEvents = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get events the authenticated user has subscribed to',
    }),
    ApiOkResponse({ description: 'List of subscribed events' }),
  );

export const ApiGetUpcomingEvents = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get upcoming events starting from now' }),
    ApiQuery({ name: 'cursor', required: false }),
    ApiOkResponse({ description: 'Paginated list of upcoming events' }),
  );

export const ApiGetOrganizedEvents = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get events organized by a specific user' }),
    ApiQuery({ name: 'userId', description: 'Organizer user UUID' }),
    ApiOkResponse({ description: 'List of events organized by the user' }),
  );

export const ApiDeleteEvent = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete an event (organizer only)' }),
    ApiParam({ name: 'id', description: 'Event UUID' }),
    ApiOkResponse({ description: 'Event deleted' }),
    ApiNotFoundResponse({
      description: 'Event not found or user is not the organizer',
    }),
  );

export const ApiGetEvent = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a single event by ID' }),
    ApiParam({ name: 'id', description: 'Event UUID' }),
    ApiOkResponse({
      description: 'Event details with organizer info and subscription status',
    }),
    ApiNotFoundResponse({ description: 'Event not found' }),
  );

export const ApiSubscribeEvent = () =>
  applyDecorators(
    ApiOperation({ summary: 'Subscribe to an event' }),
    ApiParam({ name: 'id', description: 'Event UUID' }),
    ApiOkResponse({ description: 'Subscribed successfully' }),
  );

export const ApiUnsubscribeEvent = () =>
  applyDecorators(
    ApiOperation({ summary: 'Unsubscribe from an event' }),
    ApiParam({ name: 'id', description: 'Event UUID' }),
    ApiOkResponse({ description: 'Unsubscribed successfully' }),
  );

export const ApiGetEventParticipants = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get paginated list of event participants' }),
    ApiParam({ name: 'id', description: 'Event UUID' }),
    ApiQuery({ name: 'pageSize', required: false, example: 20 }),
    ApiQuery({ name: 'cursor', required: false }),
    ApiOkResponse({ description: 'Paginated participant list' }),
  );
