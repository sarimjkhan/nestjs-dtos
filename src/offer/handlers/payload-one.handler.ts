import { PayloadHandler } from './payload.handler';
import { validateOrReject } from 'class-validator';
import { Offer } from '../entities/offer.entity';
import { PayloadOneDto } from '../dtos/payload-one.dto';

export class PayloadOneHandler implements PayloadHandler {
  async getOffers(payload: any): Promise<Offer[]> {
    if (!payload || !payload.response || !payload.response.offers) {
      console.warn('Invalid payload:', payload);
      return [];
    }

    const payloadDtos = payload.response.offers.map((data: any) =>
      Object.assign(new PayloadOneDto(), data),
    );
    const offers: Offer[] = [];

    for (const payloadDto of payloadDtos) {
      try {
        await validateOrReject(payloadDto);
        const offer = payloadDto.toOffer();
        offers.push(offer);
      } catch (errors) {
        console.warn('Failed to convert payload to offer:', errors);
      }
    }

    return offers;
  }
}
