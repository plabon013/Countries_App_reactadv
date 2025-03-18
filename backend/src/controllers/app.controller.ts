import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller() // extends the controller with AppService?
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // get request to forward slash - /
  getHello(): string {
    return this.appService.getHello();
  }
}
