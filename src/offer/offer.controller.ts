import { Controller, Get } from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer } from './entities/offer.entity';
import { payloadOne } from 'payloads/offer1.payload';
import { payloadTwo } from 'payloads/offer2.payload';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get('')
  async getOffers(): Promise<Offer[]> {
    const payloads = [payloadOne, payloadTwo]; // Get the payloads from the request
    return this.offerService.getOffersFromPayloads(payloads);
  }
}
