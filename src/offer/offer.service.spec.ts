import { OfferService } from './offer.service';
import { PayloadHandler } from './handlers/payload.handler';
import { Offer } from './entities/offer.entity';
import { PayloadOneHandler } from './handlers/payload-one.handler';
import { PayloadTwoHandler } from './handlers/payload-two.handler';

describe('OfferService', () => {
  let offerService: OfferService;
  let payloadHandlers: PayloadHandler[];

  beforeEach(() => {
    payloadHandlers = [new PayloadOneHandler(), new PayloadTwoHandler()];

    offerService = new OfferService(payloadHandlers);
  });

  describe('getOffersFromPayloads', () => {
    it('should return offers from valid payloads', async () => {
      // Arrange
      const payloads = [
        {
          query: {
            pubid: '1',
            appid: 1,
            country: '',
            platform: 'all',
          },
          response: {
            currency_name: 'Coins',
            offers_count: 2729,
            offers: [
              {
                offer_id: '19524555',
                offer_name: 'MyGym - iOS',
                offer_desc: 'Play and reach level 23 within 14 days.',
                call_to_action: 'Play and reach level 23 within 14 days.',
                disclaimer:
                  'This offer rewards within 24 hours. New users only.',
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
        },
      ];

      const expectedOffers: Offer[] = [
        {
          id: null,
          externalOfferId: '19524555',
          name: 'MyGym - iOS',
          description: 'Play and reach level 23 within 14 days.',
          requirements: 'Play and reach level 23 within 14 days.',
          thumbnail: 'https://some.url',
          offerUrlTemplate: 'https://some.url',
          providerName: 'offer1',
          isDesktop: 0,
          isAndroid: 0,
          isIos: 1,
          slug: 'mygym---ios-19524555',
        },
      ];

      // Mock the getOffers method of the payload handlers
      jest
        .spyOn(payloadHandlers[0], 'getOffers')
        .mockResolvedValue(expectedOffers);

      // Act
      const offers = await offerService.getOffersFromPayloads(payloads);

      // Assert
      expect(offers).toEqual(expectedOffers);
      expect(payloadHandlers[0].getOffers).toHaveBeenCalledTimes(1);
      expect(payloadHandlers[0].getOffers).toHaveBeenCalledWith(payloads[0]);
    });

    it('should return an empty array for invalid payloads', async () => {
      // Arrange
      const payloads = [
        {
          status: 'success',
          data: {
            '15828': {
              Offer: {
                campaign_id: 15828,
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
                android: false,
                ios: true,
                web: true,
                min_ios: null,
                max_ios: null,
                min_android: null,
                max_android: null,
              },
            },
          },
        },
      ];

      const expectedOffers: Offer[] = [];

      // Mock the getOffers method of the payload handlers
      jest
        .spyOn(payloadHandlers[1], 'getOffers')
        .mockResolvedValue(expectedOffers);

      // Act
      const offers = await offerService.getOffersFromPayloads(payloads);

      // Assert
      expect(offers).toEqual(expectedOffers);
      expect(payloadHandlers[1].getOffers).toHaveBeenCalledTimes(1);
      expect(payloadHandlers[1].getOffers).toHaveBeenCalledWith(payloads[0]);
    });

    // Add more test cases as needed
  });
});
