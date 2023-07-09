import { PayloadTwoHandler } from './payload-two.handler';
import { Offer } from '../entities/offer.entity';
import { PayloadTwoDto } from '../dtos/payload-two.dto';

describe('PayloadTwoHandler', () => {
  let payloadTwoHandler: PayloadTwoHandler;

  beforeEach(() => {
    payloadTwoHandler = new PayloadTwoHandler();
  });

  describe('getOffers', () => {
    it('should return an empty array for invalid payload', async () => {
      // Arrange
      const invalidPayload = null;

      // Act
      const offers = await payloadTwoHandler.getOffers(invalidPayload);

      // Assert
      expect(offers).toEqual([]);
    });

    it('should return an empty array if data is missing in the payload', async () => {
      // Arrange
      const invalidPayload = {
        // Missing data
      };

      // Act
      const offers = await payloadTwoHandler.getOffers(invalidPayload);

      // Assert
      expect(offers).toEqual([]);
    });

    it('should return an empty array if data array is empty', async () => {
      // Arrange
      const payload = {
        data: [],
      };

      // Act
      const offers = await payloadTwoHandler.getOffers(payload);

      // Assert
      expect(offers).toEqual([]);
    });

    it('should convert valid payload and return corresponding offers', async () => {
      // Arrange
      const payload = {
        data: {
          '15828': {
            Offer: {
              campaign_id: '15828',
              store_id: null,
              tracking_type: 'CPA',
              campaign_vertical: 'professional_finance',
              currency_name_singular: 'coin',
              currency_name_plural: 'coins',
              network_epc: '4.8359',
              icon: 'https://some.url',
              name: 'Sofi',
              tracking_url: 'https://some.url',
              instructions:
                'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
              disclaimer: null,
              description:
                'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
              short_description: 'Make a Deposit to Earn!',
              offer_sticker_text_1: 'RECOMMENDED',
              offer_sticker_text_2: null,
              offer_sticker_text_3: null,
              offer_sticker_color_1: 'D100BC',
              offer_sticker_color_2: 'FFFFFF',
              offer_sticker_color_3: 'FFFFFF',
              sort_order_setting: null,
              category_1: 'free',
              category_2: null,
              amount: 53550,
              payout_usd: 69.25,
              start_datetime: '2022-04-19 11:58:30',
              end_datetime: '2042-04-19 04:59:00',
              is_multi_reward: false,
            },
            Country: {
              include: {
                US: {
                  id: 243,
                  code: 'US',
                  name: 'United States',
                },
              },
              exclude: [],
            },
            State: {
              include: [],
              exclude: [],
            },
            City: {
              include: [],
              exclude: [],
            },
            Connection_Type: {
              cellular: true,
              wifi: true,
            },
            Device: {
              include: [],
              exclude: [],
            },
            OS: {
              web: true,
              android: false,
              ios: true,
              min_ios: null,
              max_ios: null,
              min_android: null,
              max_android: null,
            },
          },
        },
      };

      const expectedOffers: any[] = [
        {
          externalOfferId: '15828',
          name: 'Sofi',
          description:
            'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
          requirements:
            'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
          thumbnail: 'https://some.url',
          offerUrlTemplate: 'https://some.url',
          providerName: 'offer2',
          isDesktop: 1,
          isAndroid: 0,
          isIos: 1,
          slug: 'sofi-15828',
        },
      ];

      // Act
      const offers = await payloadTwoHandler.getOffers(payload);

      // Assert
      expect(offers).toEqual(expectedOffers);
    });
  });
});
