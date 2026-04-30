import {
  Controller,
  Request,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { AuthRequest } from '../common/types/user.types';
import { JwtAuthGuard } from '../auth/guards';
import { getRefreshTokenFromReq } from '../common/utils/getRefreshTokenFromReq';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../docs/swagger/api-auth.decorator';
import {
  ApiGetSessions,
  ApiDeleteSession,
} from './decorators/api-session.decorator';

@ApiTags('Sessions')
@ApiAuth()
@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  @ApiGetSessions()
  async getSessions(@Request() req: AuthRequest) {
    const refreshToken = getRefreshTokenFromReq(req);
    if (!refreshToken) throw new BadRequestException('Invalid credentials');
    return this.sessionService.getUserSessions(req.user.id, refreshToken);
  }

  @Delete(':sessionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteSession()
  async deleteSessions(
    @Param('sessionId') sessionId: string,
    @Request() req: AuthRequest,
  ) {
    return this.sessionService.invalidateSessionById(req.user.id, sessionId);
  }
}
