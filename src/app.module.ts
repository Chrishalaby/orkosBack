import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
// import { AppController } from './app.controller';
// import { AuthModule } from './auth1/auth.module';
// import { AuthService } from './auth1/auth.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, AuthModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
