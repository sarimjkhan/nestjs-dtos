import { Injectable, Inject } from '@nestjs/common';
import { PayloadHandler } from './handlers/payload.handler';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @Inject('PAYLOAD_HANDLERS')
    private readonly payloadHandlers: PayloadHandler[],
  ) {}

  async getOffersFromPayloads(payloads: any[]): Promise<Offer[]> {
    const allOffers: Offer[] = [];

    for (const handler of this.payloadHandlers) {
      for (const payload of payloads) {
        const offers = await handler.getOffers(payload);
        allOffers.push(...offers);
      }
    }

    return allOffers;
  }
}
