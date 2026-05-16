import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
  HttpCode,
  ParseArrayPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import { SaveContactItem } from './dto/save-contacts.dto';
import { JwtAuthGuard } from '../auth/guards';
import type { AuthRequest } from '../common/types/user.types';

@ApiTags('Contacts')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(':userId/contacts')
  async getByUser(@Param('userId') userId: string) {
    return this.contactsService.getByUserId(userId);
  }

  @Post('me/contacts')
  async saveAll(
    @Request() req: AuthRequest,
    @Body(new ParseArrayPipe({ items: SaveContactItem }))
    items: SaveContactItem[],
  ) {
    return this.contactsService.saveAll(req.user.id, items);
  }

  @Patch('me/contacts/:id')
  async update(
    @Param('id') id: string,
    @Request() req: AuthRequest,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactsService.update(id, req.user.id, dto);
  }

  @Delete('me/contacts/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.contactsService.delete(id, req.user.id);
  }
}
