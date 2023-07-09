import { IsString, IsNotEmpty } from 'class-validator';
import { Offer } from '../entities/offer.entity';
import { BasePayloadDto } from './base-payload.dto';

export class PayloadOneDto extends BasePayloadDto {
  @IsString()
  @IsNotEmpty()
  offer_id: string;

  @IsString()
  @IsNotEmpty()
  offer_name: string;

  @IsString()
  offer_desc: string;

  @IsString()
  call_to_action: string;

  @IsString()
  image_url: string;

  @IsString()
  platform: string;

  @IsString()
  device: string;

  @IsString()
  offer_url: string;

  toOffer(): Offer {
    const offer = new Offer();
    offer.externalOfferId = this.offer_id;
    offer.name = this.offer_name;
    offer.description = this.offer_desc;
    offer.requirements = this.call_to_action;
    offer.thumbnail = this.image_url;
    offer.offerUrlTemplate = this.offer_url;
    offer.providerName = 'offer1';
    offer.isDesktop = this.platform.toLowerCase() === 'desktop' ? 1 : 0;
    offer.isAndroid =
      this.platform.toLowerCase() === 'mobile' &&
      this.device.toLowerCase() !== 'iphone_ipad'
        ? 1
        : 0;
    offer.isIos =
      this.platform.toLowerCase() === 'mobile' &&
      this.device.toLowerCase() === 'iphone_ipad'
        ? 1
        : 0;
    offer.slug = this.createSlug(this.offer_name, this.offer_id);
    return offer;
  }
}
