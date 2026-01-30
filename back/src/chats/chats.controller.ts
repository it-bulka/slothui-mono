import {
  Controller,
  Post,
  Body,
  Request,
  Param,
  Patch,
  Get,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDtoWithOwner } from './dto/createChat.dto';
import { AuthRequest } from '../common/types/user.types';
import { UpdateMembersDto } from './dto/updateMembers.dto';
import { JwtAuthGuard } from '../auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(
    @Body() dto: CreateChatDtoWithOwner,
    @Request() request: AuthRequest,
  ) {
    return await this.chatsService.create({
      ...dto,
      members: [...dto.members, request.user.id],
    });
  }

  @Get()
  async getSubscribedChats(@Request() request: AuthRequest) {
    return await this.chatsService.findChatsByMember(request.user.id);
  }

  @Get()
  async globalSearch(
    @Query() query: { limit?: number; search: string },
    @Request() request: AuthRequest,
  ) {
    return await this.chatsService.globalSearch({
      userId: request.user.id,
      limit: query.limit,
      query: query.search,
    });
  }

  @Get()
  async searchMemberChats(
    @Query() query: { limit?: number; search: string },
    @Request() request: AuthRequest,
  ) {
    return await this.chatsService.searchUserChats({
      userId: request.user.id,
      limit: query.limit,
      query: query.search,
    });
  }

  @Get('private/:userId')
  async findPrivateChat(
    @Param('userId') userId: string,
    @Request() request: AuthRequest,
  ) {
    return await this.chatsService.findOrCreatePrivateChat(
      [request.user.id, userId],
      request.user.id,
    );
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: string, @Request() request: AuthRequest) {
    const chat = await this.chatsService.deleteChatByOwner(request.user.id, id);
    return {
      chat,
      deleted: true,
    };
  }

  @Patch(':id/members')
  async addMember(@Body() dto: UpdateMembersDto, @Param('id') id: string) {
    return await this.chatsService.updateMembers(id, dto);
  }

  @Post(':chatId/read')
  markAsRead(@Param('chatId') chatId: string, @Request() request: AuthRequest) {
    return this.chatsService.markChatAsRead(chatId, request.user.id);
  }
}
