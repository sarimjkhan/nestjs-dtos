import { PayloadOneHandler } from './payload-one.handler';
import { Offer } from '../entities/offer.entity';
import { PayloadOneDto } from '../dtos/payload-one.dto';

describe('PayloadOneHandler', () => {
  let payloadOneHandler: PayloadOneHandler;

  beforeEach(() => {
    payloadOneHandler = new PayloadOneHandler();
  });

  describe('getOffers', () => {
    it('should return an empty array for invalid payload', async () => {
      // Arrange
      const invalidPayload = null;

      // Act
      const offers = await payloadOneHandler.getOffers(invalidPayload);

      // Assert
      expect(offers).toEqual([]);
    });

    it('should return an empty array if response or offers are missing in the payload', async () => {
      // Arrange
      const invalidPayload = {
        response: {
          // Missing offers
        },
      };

      // Act
      const offers = await payloadOneHandler.getOffers(invalidPayload);

      // Assert
      expect(offers).toEqual([]);
    });

    it('should return an empty array if offers array is empty', async () => {
      // Arrange
      const payload = {
        response: {
          offers: [],
        },
      };

      // Act
      const offers = await payloadOneHandler.getOffers(payload);

      // Assert
      expect(offers).toEqual([]);
    });

    it('should convert valid payload and return corresponding offers', async () => {
      // Arrange
      const payload = {
        response: {
          offers: [
            {
              offer_id: '19524555',
              offer_name: 'MyGym - iOS',
              offer_desc: 'Play and reach level 23 within 14 days.',
              call_to_action: 'Play and reach level 23 within 14 days.',
              disclaimer: 'This offer rewards within 24 hours. New users only.',
              offer_url: 'https://some.url',
              offer_url_easy: 'https://some.url',
              payout: 10.675,
              payout_type: 'cpe',
              amount: 8873,
              image_url: 'https://some.url',
              image_url_220x124: 'https://some.url',
              countries: ['NZ'],
              platform: 'mobile',
              device: 'iphone_ipad',
              category: {
                '9': 'Mobile Apps',
              },
              last_modified: 1645095666,
              preview_url: 'https://some.url',
              package_id: 'idnumbers',
              verticals: [
                {
                  vertical_id: '4',
                  vertical_name: 'Lifestyle',
                },
                {
                  vertical_id: '11',
                  vertical_name: 'Health',
                },
              ],
            },
          ],
        },
      };

      const expectedOffers: Offer[] = [new Offer()];
      expectedOffers[0].externalOfferId = '19524555';
      expectedOffers[0].name = 'MyGym - iOS';
      expectedOffers[0].description = 'Play and reach level 23 within 14 days.';
      expectedOffers[0].requirements =
        'Play and reach level 23 within 14 days.';
      expectedOffers[0].thumbnail = 'https://some.url';
      expectedOffers[0].offerUrlTemplate = 'https://some.url';
      expectedOffers[0].providerName = 'offer1';
      expectedOffers[0].isDesktop = 0;
      expectedOffers[0].isAndroid = 0;
      expectedOffers[0].isIos = 1;
      expectedOffers[0].slug = 'mygym---ios-19524555';

      // Act
      const offers = await payloadOneHandler.getOffers(payload);

      // Assert
      expect(offers).toEqual(expectedOffers);
    });
  });
});
