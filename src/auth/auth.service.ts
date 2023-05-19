import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorConstraint } from 'src/shared/enums/error-constraints.enum';
import { User } from 'src/users/shared/entities/user.entity';
import { IAccessTokenPayload } from 'src/users/shared/models/access-token-payload';
import { IUser } from 'src/users/shared/models/user.model';
import { Repository } from 'typeorm';
import { SignInDto } from './shared/dto/sign-in.dto';
import { SignUpDto } from './shared/dto/sign-up.dto';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(signUpDto: SignUpDto): Promise<IUser> {
    const salt: string = await bcrypt.genSalt();
    const data = {
      ...signUpDto,
      password: await AuthService.hashPassword(signUpDto.password, salt),
      salt,
      name: signUpDto.firstName,
      isEventOrganizer: false,
    };
    delete data.firstName;
    try {
      const user: User = await this.usersRepository.save(data);
      delete user.salt;
      delete user.password;
      const accessTokenPayload: IAccessTokenPayload = { profile: user };
      const accessToken: string = this.jwtService.sign(accessTokenPayload);

      return { accessToken };
    } catch (error) {
      console.log(error);
      if (error.constraint === ErrorConstraint.emailError) {
        throw new ConflictException({});
      }

      if (error.constraint === ErrorConstraint.usernameError) {
        throw new ConflictException({});
      }
      throw new InternalServerErrorException({});
    }
  }

  public async signIn(signInDto: SignInDto): Promise<IUser> {
    const { email, password } = signInDto;
    const user: User = await this.usersRepository.findOne({
      where: [{ email: email }, { name: email }],
    });

    if (!user) {
      throw new UnauthorizedException({});
    }

    if (await user.validatePassword(password)) {
      delete user.salt;
      delete user.password;
      const accessTokenPayload: IAccessTokenPayload = { profile: user };
      const accessToken: string = this.jwtService.sign(accessTokenPayload);
      return { accessToken };
    }

    throw new UnauthorizedException({});
  }

  private static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
