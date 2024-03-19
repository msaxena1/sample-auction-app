import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Health check')
@Controller('healthcheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get()
  @ApiOperation({ summary: 'check application health' })
  @ApiResponse({
    status: 200,
    description: 'sample-auction-app is healthy!',
    type: String,
  })
  healthCheck() {
    return this.healthcheckService.healthCheck();
  }
}
