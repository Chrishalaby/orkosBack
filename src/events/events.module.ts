import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/shared/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User]), UsersModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
