import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async ValidateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(name);
    if (user && user.password === password) {
      const { password, name, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any){
    const payload = { name: user.name, sub: user.id };
    return{
      access_token: this.jwtService.sign(payload),
    }
  }
}
