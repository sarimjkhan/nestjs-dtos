import { PayloadHandler } from './payload.handler';
import { validateOrReject } from 'class-validator';
import { Offer } from '../entities/offer.entity';
import { PayloadTwoDto } from '../dtos/payload-two.dto';

export class PayloadTwoHandler implements PayloadHandler {
  async getOffers(payload: any): Promise<Offer[]> {
    if (!payload || !payload.data) {
      console.warn('Invalid payload:', payload);
      return [];
    }

    const payloadDtos = Object.values(payload.data).map((data: any) => {
      return Object.assign(new PayloadTwoDto(), {
        ...data.Offer,
        OS: {
          web: data?.OS?.web || false,
          android: data?.OS?.android || false,
          ios: data?.OS?.ios || false,
        },
      });
    });

    const offers: Offer[] = [];

    for (const payloadDto of payloadDtos) {
      try {
        await validateOrReject(payloadDto, { whitelist: true });
        const offer = payloadDto.toOffer();
        offers.push(offer);
      } catch (errors) {
        console.warn('Failed to convert payload to offer:', errors);
      }
    }

    return offers;
  }
}
