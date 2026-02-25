import { Body, Controller, Inject, Post, Ip } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { USUARIOS_SERVICE } from '../../../config'; 
import { LoginUsuarioDto } from '@ukiyo/common';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(USUARIOS_SERVICE) private readonly client: ClientProxy,
    ) {}

    @Post('login')
    async login(@Body() loginUserDto: LoginUsuarioDto, @Ip() ip: string) { 
        try {
        const response = await firstValueFrom(
            this.client.send('auth.login', { loginDto: loginUserDto, ip })
        );

        if (response && response.error) {
            throw new RpcException(response.error); 
        }

        return response;
        } catch (error) {
        throw new RpcException(error);
        }
    }
}