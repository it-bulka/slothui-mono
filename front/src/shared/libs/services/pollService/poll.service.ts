import { HttpService } from '../httpService/http.service.ts';
import type { SelectPollAnswers } from './poll.type.ts';
import type { PollResultDto } from '../../../types';

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
}