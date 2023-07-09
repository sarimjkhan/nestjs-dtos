import { Offer } from '../entities/offer.entity';

export abstract class BasePayloadDto {
  abstract toOffer(): Offer;
  protected createSlug(name: string, id: string): string {
    const baseSlug = name.toLowerCase().split(' ').join('-');
    return `${baseSlug}-${id}`;
  }
}
