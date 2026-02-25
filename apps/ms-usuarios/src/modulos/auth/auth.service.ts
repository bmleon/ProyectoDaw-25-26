import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { AccesosService } from '../accesos/accesos.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
        private readonly accesosService: AccesosService,
    ) {}

    async validateUser(username: string, pass: string, ip: string) {
        const user = await this.usuariosService.findByUsernameOrEmail(username);

        if (user) {
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            await this.accesosService.create({
            userId: user.id,
            ipOrigen: ip,
            resultado: 'EXITO'
            });
            
            const { password, ...result } = user;
            return result;
        }
        }
        
        if (user) {
        await this.accesosService.create({
            userId: user.id,
            ipOrigen: ip,
            resultado: 'FALLO_PASS'
        });
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id, roles: user.roles };
        
        return {
        access_token: this.jwtService.sign(payload),
        user: user,
        };
    }

    async verifyToken(token: string) {
        try {
        const payload = this.jwtService.verify(token);
        const user = await this.usuariosService.findOne(payload.sub);
        
        if (!user) {
            throw new RpcException('Usuario no encontrado');
        }

        if (!user.isActive) {
            throw new RpcException('Usuario inactivo');
        }

        const { password, ...userClean } = user;
        return userClean;

        } catch (error) {
        throw new RpcException('Token inválido');
        }
    }
}
