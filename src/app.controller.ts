import { AppService } from '@/app.service';
import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  checkHealth(): boolean {
    return this.appService.checkHealth();
  }
}
