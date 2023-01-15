import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/shared/entities/user.entity';
// import { User } from 'src/users/shared/models/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, PassportModule, JwtModule.register({
    secret: 'SECRET', // ############## put env variable
    signOptions: { expiresIn: '60s' },
  })], //.register({ session: true})
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService], //SessionSerializer
  exports: [AuthService],
})
export class AuthModule {}
