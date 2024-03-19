import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  healthCheck() {
    return `sample-auction-app is healthy!`;
  }
}
