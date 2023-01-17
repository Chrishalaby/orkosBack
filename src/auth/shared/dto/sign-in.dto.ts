import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  public email: string;

  @ApiProperty()
  @IsString()
  public password: string;
}
