import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth(): boolean {
    return true;
  }
}