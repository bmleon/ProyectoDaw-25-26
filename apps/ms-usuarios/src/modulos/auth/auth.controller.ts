import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from '@ukiyo/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login')
  async login(@Payload() data: { loginDto: LoginUsuarioDto, ip: string }) {
    const user = await this.authService.validateUser(data.loginDto.username, data.loginDto.password, data.ip);
    
    if (!user) {
      return { error: 'Credenciales inválidas' };
    }

    return this.authService.login(user);
  }

  @MessagePattern('auth.verify.user')
  verifyToken(@Payload() token: string) {
    return this.authService.verifyToken(token);
  }
}
