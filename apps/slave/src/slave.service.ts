import { randomUUID } from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import {
  SlaveJobData,
  SlaveJobResultData,
} from '@app/shared/interfaces/slave.job.data.interface';
import axios from 'axios';

@Injectable()
export class SlaveService {
  logger = new Logger(SlaveService.name);
  async doSlaveJob(data: SlaveJobData): Promise<SlaveJobResultData> {
    this.logger.log(`doSlaveJob, begin sleep ${data.seconds} seconds`);
    // await this.sleep(data.seconds);
    const resp = await axios.get('https://www.google.com');
    const resultData: SlaveJobResultData = {
      code: resp.status,
      message: resp.data,
    };
    this.logger.log(`return ${JSON.stringify(resultData)}`);
    return resultData;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
