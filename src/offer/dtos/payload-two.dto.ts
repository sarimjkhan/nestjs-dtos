import { IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Offer } from '../entities/offer.entity';
import { BasePayloadDto } from './base-payload.dto';

class OperatingSystemDto {
  @IsNotEmpty()
  web: boolean;

  @IsNotEmpty()
  android: boolean;

  @IsNotEmpty()
  ios: boolean;
}

export class PayloadTwoDto extends BasePayloadDto {
  @IsString()
  @IsNotEmpty()
  campaign_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  instructions: string;

  @IsString()
  icon: string;

  @IsString()
  tracking_url: string;

  @IsNotEmpty()
  @Type(() => OperatingSystemDto)
  OS: OperatingSystemDto;

  toOffer(): Offer {
    const offer = new Offer();
    offer.externalOfferId = this.campaign_id;
    offer.thumbnail = this.icon;
    offer.name = this.name;
    offer.offerUrlTemplate = this.tracking_url;
    offer.requirements = this.instructions;
    offer.description = this.description;
    offer.isDesktop = this.OS.web ? 1 : 0;
    offer.isAndroid = this.OS.android ? 1 : 0;
    offer.isIos = this.OS.ios ? 1 : 0;
    offer.providerName = 'offer2';
    offer.slug = this.createSlug(this.name, this.campaign_id);

    console.log('offer2 jani: ', offer);
    return offer;
  }
}
