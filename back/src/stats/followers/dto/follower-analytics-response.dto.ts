import { UserShortDTO } from '../../../user/dto/user-response.dto';

export interface FollowerAnalyticsResponseDto {
  userId: string;
  delta: number;
  percent: number;
  period: 'month';
  lastFollowers: UserShortDTO[];
}
