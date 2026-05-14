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
  HttpCode,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDtoWithOwner } from './dto/createChat.dto';
import { AuthRequest } from '../common/types/user.types';
import { UpdateMembersDto } from './dto/updateMembers.dto';
import { JwtAuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../docs/swagger/api-auth.decorator';
import {
  ApiCreateChat,
  ApiGetChats,
  ApiGlobalSearch,
  ApiSearchMyChats,
  ApiFindPrivateChat,
  ApiDeleteChat,
  ApiUpdateChatMembers,
  ApiMarkChatRead,
} from './decorators/api-chats.decorator';

@ApiTags('Chats')
@ApiAuth()
@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  @ApiCreateChat()
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
  @ApiGetChats()
  async getSubscribedChats(@Request() request: AuthRequest) {
    return await this.chatsService.findChatsByMember(request.user.id);
  }

  @Get('search/global')
  @ApiGlobalSearch()
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

  @Get('search/my')
  @ApiSearchMyChats()
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
  @ApiFindPrivateChat()
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
  @ApiDeleteChat()
  async deleteChat(@Param('id') id: string, @Request() request: AuthRequest) {
    const chat = await this.chatsService.deleteChatByOwner(request.user.id, id);
    return {
      chat,
      deleted: true,
    };
  }

  @Patch(':id/members')
  @ApiUpdateChatMembers()
  async addMember(@Body() dto: UpdateMembersDto, @Param('id') id: string) {
    return await this.chatsService.updateMembers(id, dto);
  }

  @Post(':chatId/read')
  @HttpCode(204)
  @ApiMarkChatRead()
  markAsRead(@Param('chatId') chatId: string, @Request() request: AuthRequest) {
    return this.chatsService.markChatAsRead(chatId, request.user.id);
  }
}
