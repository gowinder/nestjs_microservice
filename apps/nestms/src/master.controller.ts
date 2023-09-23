import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { MasterService } from './master.service';
import { StartJobDTO } from './dto/start.job.dt';
import { SlaveJobResultData } from '@app/shared/interfaces/slave.job.data.interface';
import { firstValueFrom } from 'rxjs';

@Controller()
export class MasterController {
  logger = new Logger(MasterController.name);
  constructor(private readonly appService: MasterService) {}

  @Post('start_job')
  async startJob(
    @Body() startJobDTO: StartJobDTO,
  ): Promise<SlaveJobResultData> {
    this.logger.log(`start_job, startJobDTO: ${JSON.stringify(startJobDTO)}`);
    return await firstValueFrom(this.appService.startJob(startJobDTO));
  }
}
