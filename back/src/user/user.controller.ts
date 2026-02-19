import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  Param,
  Patch,
  Post,
  Delete,
  UseInterceptors,
  Body,
  UploadedFile,
  HttpCode,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../common/types/user.types';
import { UserMapper } from './user-mapper';
import { SearchUsersQueryDto } from './dto/search-user.query';
import { ProfileUpdateDto } from './dto/profile-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePasswordDto } from './dto/changePassword';
import { Response as ExpressResponse } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me/profile')
  async getProfile(@Request() req: AuthRequest) {
    const profile = await this.userService.getProfileData(req.user.id);
    const providers = await this.userService.getProviders(req.user.id);
    return { profile, linkedProviders: providers };
  }

  @Delete('me/profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProfile(
    @Request() req: AuthRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    await this.userService.deleteUser(req.user.id);
    res.clearCookie('refresh_token');
    return;
  }

  @Patch('me/profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @Body() dto: ProfileUpdateDto,
    @Request() req: AuthRequest,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    const user = await this.userService.updateProfileData(req.user.id, {
      ...dto,
      avatar,
    });
    if (!user) return null;
    return UserMapper.toResponse(user);
  }

  @Post('me/change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @Request() req: AuthRequest,
  ) {
    await this.userService.changePassword(
      req.user.id,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @Get()
  async searchUsers(@Query() q: SearchUsersQueryDto) {
    return await this.userService.search({
      search: q.search,
      limit: q.limit,
      cursor: q.cursor,
    });
  }

  @Get(':userId/profile')
  async getUser(@Param('userId') userId: string, @Request() req: AuthRequest) {
    return await this.userService.getProfileDataForOtherUser(
      userId,
      req.user.id,
    );
  }
}
