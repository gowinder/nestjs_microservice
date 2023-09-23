import { Inject, Injectable, Logger } from '@nestjs/common';
import { StartJobDTO } from './dto/start.job.dt';
import { SLAVE_SERVICE } from './const/client.module.name';
import { ClientProxy } from '@nestjs/microservices';
import { randomInt } from 'crypto';
import { Observable } from 'rxjs';
import {
  SlaveJobResultData,
  SlaveJobData,
} from '@app/shared/interfaces/slave.job.data.interface';

@Injectable()
export class MasterService {
  logger = new Logger(MasterService.name);
  constructor(
    @Inject(SLAVE_SERVICE) private readonly slaveClient: ClientProxy,
  ) {}

  startJob(startJobDTO: StartJobDTO): Observable<SlaveJobResultData> {
    this.logger.log(`startJob, startJobDTO: ${JSON.stringify(startJobDTO)}`);
    const salveJobData: SlaveJobData = {
      id: randomInt(100),
      seconds: startJobDTO.sleep_time,
      va: '',
    };
    const pattern = { cmd: 'slave_job' };
    return this.slaveClient.send(pattern, salveJobData);
  }
}
