import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { PayloadHandler } from './handlers/payload.handler';
import { OfferController } from './offer.controller';

// Import all the payload handlers
import { PayloadOneHandler } from './handlers/payload-one.handler';
import { PayloadTwoHandler } from './handlers/payload-two.handler';
// Import any additional payload handlers you want to add

const payloadHandlers = [
  PayloadOneHandler,
  PayloadTwoHandler
  // Add any additional payload handlers here
]

@Module({
  providers: [
    OfferService,
    {
      provide: 'PAYLOAD_HANDLERS',
      useFactory: (...payloadHandlers: PayloadHandler[]) => payloadHandlers,
      inject: payloadHandlers,
    },
    // Register all the payload handlers
    ...payloadHandlers
  ],
  exports: [OfferService],
  controllers: [OfferController],
})
export class OfferModule {}
