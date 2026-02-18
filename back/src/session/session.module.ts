import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from './entity/userSession.entity';
import { SessionController } from './session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
