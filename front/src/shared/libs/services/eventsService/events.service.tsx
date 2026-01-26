import { HttpService } from '../httpService/http.service.ts';
import type { EventDTO, EventParticipant, CreateEventDTO } from './events.type.ts';
import type { PaginatedResponse } from '@/shared/types';

export class EventsService {
  constructor(
    private readonly http: HttpService,
  ) {}

  /* ------------------------------------------------------------------ */
  /*                       ---- REST over fetch ----                    */
  /* ------------------------------------------------------------------ */

  /** GET /api/events?cursor&limit=50 */
  async listEvents(cursor?: string | null): Promise<PaginatedResponse<EventDTO>> {
    const res = await this.http.request<PaginatedResponse<EventDTO>>(
      `/api/events`,
      { params: { cursor, limit: 50 } },
    );
    return res;
  }

  /** GET /api/events/subscribed?cursor&limit=50 */
  async getSubscribedEvents(cursor?: string | null): Promise<PaginatedResponse<EventDTO>> {
    const res = await this.http.request<PaginatedResponse<EventDTO>>(
      `/api/events/subscribed`,
      { params: { cursor, limit: 50 } },
    );
    return res;
  }

  /** GET /api/events/upcoming?cursor&limit=50 */
  async getUpcomingEvents(cursor?: string | null): Promise<PaginatedResponse<EventDTO>> {
    const res = await this.http.request<PaginatedResponse<EventDTO>>(
      `/api/events/upcoming`,
      { params: { cursor, limit: 50 } },
    );
    return res;
  }

  /** GET /api/events/organized?userId=<id>&cursor=<cursor>&limit=50 */
  async getEventsByUser(userId: string, cursor?: string | null): Promise<PaginatedResponse<EventDTO>> {
    const res = await this.http.request<PaginatedResponse<EventDTO>>(
      `/api/events/organized`,
      { params: { cursor, limit: 50, userId } },
    );
    return res;
  }

  /** GET /api/events/my?cursor&limit=50 */
  async getMyEvents(cursor?: string | null): Promise<PaginatedResponse<EventDTO>> {
    const res = await this.http.request<PaginatedResponse<EventDTO>>(
      `/api/events/my`,
      { params: { cursor, limit: 50 } },
    );
    return res;
  }

  /** GET /api/events/:id */
  async getEvent(eventId: string): Promise<EventDTO> {
    return await this.http.request<EventDTO>(
      `/api/events/${eventId}`,
    );
  }

  /** GET /api/events/:id/participants?cursor&limit=50 */
  async listEventParticipants(eventId: string, cursor?: string): Promise<PaginatedResponse<EventParticipant>> {
    const res = await this.http.request<PaginatedResponse<EventParticipant>>(
      `/api/events/${eventId}/participants`,
      { params: { cursor, limit: 50 } },
    );
    return res;
  }

  /** POST /api/events CreateEventDTO */
  async createEvent(data: CreateEventDTO): Promise<EventDTO> {
    return this.http.request<EventDTO>(
      '/api/events',
      { method: 'POST', body: data },
    );
  }

  /** DELETE /api/events/:id   id:string */
  async deleteEvent(id:string): Promise<void> {
    await this.http.request<EventDTO>(
      `/api/events/${id}`,
      { method: 'DELETE' },
    );
  }

  /** POST /api/events/:id/subscribe   id:string */
  async subscribeEvent(id:string): Promise<void> {
    await this.http.request(
      `/api/events/${id}/subscribe`,
      { method: 'POST' },
    );
  }

  /** POST /api/events/:id/unsubscribe   id:string */
  async unsubscribeEvent(id:string): Promise<void> {
    await this.http.request(
      `/api/events/${id}/unsubscribe`,
      { method: 'POST' },
    );
  }
}