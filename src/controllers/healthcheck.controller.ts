import { JsonController, Get } from 'routing-controllers';

@JsonController()
export default class HealthCheckController {
  @Get('/ping')
  ping() {
    return 'pong';
  }
}
