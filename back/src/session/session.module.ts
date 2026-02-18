import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from './entity/userSession.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
