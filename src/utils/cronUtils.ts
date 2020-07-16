import { Logger } from '@nestjs/common';
import { CronJob } from 'cron';

export const cron = (): void => {
  const job = new CronJob({
    cronTime: '0 0 0 * * *',
    onTick: () => {
      Logger.debug('cron job completed', 'Cron', false);
    },
    timeZone: 'Asia/Seoul',
  });

  job.start();
};
