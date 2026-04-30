import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { RolesEnum } from '../common/types/roles.types';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiAdminCheck } from './decorators/api-admin.decorator';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor() {}

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiAdminCheck()
  admin() {
    return 'only admin access';
  }
}
