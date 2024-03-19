import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { ConfigModule } from './config/config.module';
import { AuctionItemsModule } from './auction-items/auction-items.module';
import { BidsModule } from './bids/bids.module';

@Module({
  imports: [
    ConfigModule.register({ folder: './config' }),
    HealthcheckModule,
    AuctionItemsModule,
    BidsModule,
  ],
})
export class AppModule {}
