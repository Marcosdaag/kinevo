/**
 * Los DTOs se encargan de manejar que datos entran y salen para realizar ciertas funciones.
 * Ademas de esto, se pueden expresar requerimientos para las variables y tipos de datos.
 * Por ultimo tambien se puede dejar un ejemplo para que  Sawgger lo documente.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;
}
