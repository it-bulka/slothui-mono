import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { PollsService } from './polls.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../common/types/user.types';
import { SelectPollAnswerDto } from './dto/selectPollAnswer.dto';
import { UserShortDTO } from '../user/dto/user-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../docs/swagger/api-auth.decorator';
import {
  ApiVotePoll,
  ApiGetPollDetails,
  ApiGetPollVoters,
} from './decorators/api-polls.decorator';

@ApiTags('Polls')
@ApiAuth()
@UseGuards(JwtAuthGuard)
@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post(':pollId/choose-answer')
  @ApiVotePoll()
  async selectAnswer(
    @Param('pollId') pollId: string,
    @Body() dto: SelectPollAnswerDto,
    @Request() req: AuthRequest,
  ) {
    return await this.pollsService.selectAnswers({
      pollId,
      selectedAnswers: dto.answerIds,
      userId: req.user.id,
    });
  }

  @Get(':pollId/details')
  @ApiGetPollDetails()
  async getDetails(
    @Param('pollId') pollId: string,
    @Request() req: AuthRequest,
  ) {
    return await this.pollsService.getDetails(pollId, req.user.id);
  }

  @Get(':pollId/answers/:answerId/voters')
  @ApiGetPollVoters()
  async fetchVoters(
    @Param('pollId') pollId: string,
    @Param('answerId') answerId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = 20,
  ): Promise<{
    items: UserShortDTO[];
    nextCursor?: string | null;
    hasMore: boolean;
  }> {
    return this.pollsService.getVoters(pollId, answerId, Number(limit), cursor);
  }
}
