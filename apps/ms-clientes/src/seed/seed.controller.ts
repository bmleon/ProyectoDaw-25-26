import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SeedService } from './seed.service';

@Controller()
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @MessagePattern({ cmd: 'seed_clientes' })
    ejecutarSeed() {
        return this.seedService.runSeed();
    }
}