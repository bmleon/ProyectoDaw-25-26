import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcCustomExceptionFilter implements ExceptionFilter {
    
    private readonly logger = new Logger('RpcCustomExceptionFilter');

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        this.logger.error('--- ERROR CAPTURADO DEL MICROSERVICIO ---');
        this.logger.error(exception);
        
        const rpcError = exception.getError ? exception.getError() : exception;

        if (
        typeof rpcError === 'object' &&
        rpcError !== null &&
        'statusCode' in rpcError &&
        'message' in rpcError
        ) {
        const status = isNaN(+rpcError['statusCode'])
            ? HttpStatus.BAD_REQUEST
            : +rpcError['statusCode'];

        return response.status(status).json(rpcError);
        }

        return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: rpcError?.message || rpcError || 'Error desconocido en Microservicio',
        error: 'Gateway RpcFilter'
        });
    }
}