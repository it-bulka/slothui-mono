import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { RolesEnum } from '../common/types/roles.types';

@Controller('admin')
export class AdminController {
  constructor() {}

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  admin() {
    return 'only admin access';
  }
}
