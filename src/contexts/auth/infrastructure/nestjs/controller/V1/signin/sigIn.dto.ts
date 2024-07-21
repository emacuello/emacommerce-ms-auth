import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';

export class SingUpDto {
  @ApiPropertyOptional({
    example: 'patch2000@mail.com',
    description: 'Email del usuario',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'patch2000',
    description: 'Username del usuario',
  })
  username: string;

  @ApiProperty({
    example: '123qweASD.!@',
    description: 'Password del usuario',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.,_-])([A-Za-z\d$@$!%*?&.,_-]|[^ ]){8,15}$/,
  )
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
