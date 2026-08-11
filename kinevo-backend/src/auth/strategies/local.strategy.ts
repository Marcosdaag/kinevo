import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';

/**
 * En primer lugar extendemos la libreria Passport y acualizamos el campo de busqueda.
 * Por defecto el campo a verificar es "username" pero lo cambiamos a 'email' ya que es la manera en la que lo hace la app.
 * */

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * Nunca llamo a la funcion manualmente, cuando un usuario envia un POST auth/login se hace automaticamente.
   * Llama a la funcion del service para validar el usuario.
   */
  async validate(email: string, password: string): Promise<Partial<User>> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }
}
