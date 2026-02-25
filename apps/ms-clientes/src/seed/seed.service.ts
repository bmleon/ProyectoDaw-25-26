import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeedService {
    constructor(private readonly prisma: PrismaService) {}

    async runSeed() {
        // limpia la tabla
        await this.prisma.cliente.deleteMany();

        // datos de prueba
        const clientes = [
        {
            id: '00000000-0000-4000-8000-000000000001', 
            nombre: 'Restaurante Ukiyo (Sede Central)',
            email: 'contacto@ukiyo.com',
            telefono: '911222333',
        },
        {
            nombre: 'Juan Pérez (Particular)',
            email: 'juan.perez@gmail.com',
            telefono: '600555666',
        },
        ];

        await this.prisma.cliente.createMany({ data: clientes });
    
        return `SEED CLIENTES: ${clientes.length} insertados.`;
    }
}