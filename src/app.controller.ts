// import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth/auth.service';
// import { AuthService } from './auth1/auth.service';
// import { JwtAuthGuard } from './auth1/jwt-auth.guard';
// import { LocalAuthGuard } from './auth1/local-auth.guard';

// @Controller()
// export class AppController {
//   constructor(private readonly authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('login')
//   login(@Request() req): any {
//     return this.authService.login(req.user);
//   }

//   // @UseGuards(AuthenticatedGuard)
//   @UseGuards(JwtAuthGuard)
//   @Get('protected')
//   getHello(@Request() req): string {
//     return req.user;
//   }
// }
