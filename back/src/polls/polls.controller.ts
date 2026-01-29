import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { PollsService } from './polls.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../common/types/user.types';
import { SelectPollAnswerDto } from './dto/selectPollAnswer.dto';

@UseGuards(JwtAuthGuard)
@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post(':pollId/choose-answer')
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
}
