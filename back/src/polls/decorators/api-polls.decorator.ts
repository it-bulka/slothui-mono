import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export const ApiVotePoll = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Vote on a poll. Supports single or multiple answer selection.',
    }),
    ApiParam({ name: 'pollId', description: 'Poll UUID' }),
    ApiOkResponse({ description: 'Updated poll result with new vote counts' }),
    ApiNotFoundResponse({ description: 'Poll not found' }),
  );

export const ApiGetPollDetails = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get full poll details including vote distribution',
    }),
    ApiParam({ name: 'pollId', description: 'Poll UUID' }),
    ApiOkResponse({
      description:
        'PollResultDto with answers, vote percentages, and user vote state',
    }),
  );

export const ApiGetPollVoters = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get paginated list of users who voted for a specific answer',
    }),
    ApiParam({ name: 'pollId', description: 'Poll UUID' }),
    ApiParam({ name: 'answerId', description: 'Answer UUID' }),
    ApiQuery({ name: 'cursor', required: false }),
    ApiQuery({ name: 'limit', required: false, example: 20 }),
    ApiOkResponse({ description: 'Paginated voter list' }),
  );
