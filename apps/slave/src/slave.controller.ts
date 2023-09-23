import { Controller, Get, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { SlaveService } from './slave.service';
import {
  SlaveJobData,
  SlaveJobResultData,
} from '@app/shared/interfaces/slave.job.data.interface';

@Controller()
export class SlaveController {
  logger = new Logger(SlaveController.name);
  constructor(private readonly appService: SlaveService) {}

  @MessagePattern({ cmd: 'slave_job' })
  async slaveJob(
    @Payload() data: SlaveJobData,
    @Ctx() context: RedisContext,
  ): Promise<SlaveJobResultData> {
    this.logger.log(`slaveJob: ${JSON.stringify(data)}`);
    return await this.appService.doSlaveJob(data);
  }
}
