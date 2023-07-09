import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTransformedOffers(): string {
    return 'Hello World!';
  }
}
