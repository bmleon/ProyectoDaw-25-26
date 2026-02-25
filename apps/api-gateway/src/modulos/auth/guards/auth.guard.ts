import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { USUARIOS_SERVICE } from '../../../../config';
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(USUARIOS_SERVICE) private readonly client: ClientProxy,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
        throw new UnauthorizedException('Token no encontrado');
        }

        try {
        const user = await firstValueFrom(
            this.client.send('auth.verify.user', token),
        );

        request['user'] = user; 
        
        return true;
        } catch (error) {
        throw new UnauthorizedException('Token inválido o expirado');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}