import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Iniciando el Seed...');

    // 1. LIMPIEZA
    await prisma.acceso.deleteMany();
    await prisma.empleado.deleteMany();
    await prisma.usuario.deleteMany();
    
    console.log('Base de datos limpiada.');

  // 2. CREAR USUARIOS
    const admin = await prisma.usuario.create({
        data: {
            username: 'fabricio_admin',
            email: 'fabricio@ukiyo.com',
            password: '$2b$10$EpIXA/w....',
            roles: ['admin', 'super-user'],
        },
    });

    const empleadoNormal = await prisma.usuario.create({
        data: {
            username: 'belen_dev',
            email: 'belen@ukiyo.com',
            password: '$2b$10$EpIXA/w....',
            roles: ['user'],
        },
    });

    console.log('Usuarios creados.');

    // 3. CREAR EMPLEADOS
    await prisma.empleado.create({
        data: {
            userId: admin.id, // Conectamos con el ID generado arriba
            puesto: 'Tech Lead & Architect',
            salario: 5500.50,
            departamento: 'Ingeniería',
        },
    });

    await prisma.empleado.create({
        data: {
            userId: empleadoNormal.id,
            puesto: 'Junior Developer',
            salario: 1200.00,
            departamento: 'Desarrollo',
        },
    });
    console.log('Perfiles de empleado creados.');

    // 4. CREAR ACCESOS
    await prisma.acceso.createMany({
        data: [
        {
            userId: admin.id,
            ipOrigen: '192.168.1.100',
            resultado: 'LOGIN_EXITOSO',
        },
        {
            userId: admin.id,
            ipOrigen: '10.0.0.5',
            resultado: 'PASSWORD_INCORRECTO',
        },
        {
            userId: empleadoNormal.id,
            ipOrigen: '192.168.1.101',
            resultado: 'LOGIN_EXITOSO',
        },
        ],
    });
    console.log('Accesos de auditoría creados.');
}

    // Función estándar para ejecutar y desconectar
main()
    .catch((e) => {
        console.error('Error en el seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
});