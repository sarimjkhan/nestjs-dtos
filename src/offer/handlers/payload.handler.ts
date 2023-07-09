import { Offer } from '../entities/offer.entity';

export interface PayloadHandler {
  getOffers(payload: any): Promise<Offer[]>;
}
