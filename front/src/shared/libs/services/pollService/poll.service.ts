import { HttpService } from '../httpService/http.service.ts';
import type { SelectPollAnswers } from './poll.type.ts';
import type { PaginatedResponse, PollResultDto, VoterDetails } from '../../../types';

export class PollService {
  private BASE_URL = '/api/polls';
  constructor(
    private readonly http: HttpService,
  ) {}

  /** POST /api/polls/:id/choose-answer */
  async selectAnswer(arg: SelectPollAnswers): Promise<PollResultDto> {
    return await this.http.request<PollResultDto>(
      `${this.BASE_URL}/${arg.pollId}/choose-answer`,
      { method: 'POST', body: { answerIds: arg.answerIds} },
    );
  }

  /** GET /api/polls/:id/details */
  async fetchDetails(arg: { pollId: string }): Promise<PollResultDto> {
    return await this.http.request<PollResultDto>(
      `${this.BASE_URL}/${arg.pollId}/details`
    );
  }

  /** GET /api/polls/:pollId/answers/:answerId/voters?cursor=abc&limit=20 */
  async fetchVoters(arg: { cursor?: string | null, limit?: number, pollId: string, answerId: string }): Promise<PaginatedResponse<VoterDetails>> {
    return await this.http.request<PaginatedResponse<VoterDetails>>(
      `${this.BASE_URL}/${arg.pollId}/answers/${arg.answerId}/voters`,
      { params: { cursor: arg.cursor, limit: arg.limit ?? 50 } },
    );
  }
}