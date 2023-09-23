import { Module } from '@nestjs/common';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SLAVE_SERVICE } from './const/client.module.name';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SLAVE_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: '192.168.1.91',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [MasterController],
  providers: [MasterService],
})
export class MasterModule {}
