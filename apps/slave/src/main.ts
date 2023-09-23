import { NestFactory } from '@nestjs/core';
import { SlaveModule } from './slave.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SlaveModule,
    {
      transport: Transport.REDIS,
      options: {
        host: '192.168.1.91',
        port: 6379,
      }
    },
    );
    await app.listen();
}
bootstrap();
