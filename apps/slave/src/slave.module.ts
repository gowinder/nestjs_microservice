import { Module } from '@nestjs/common';
import { SlaveController } from './slave.controller';
import { SlaveService } from './slave.service';

@Module({
  imports: [],
  controllers: [SlaveController],
  providers: [SlaveService],
})
export class SlaveModule {}
