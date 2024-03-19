import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { ConfigModule } from './config/config.module';
import { AuctionItemsModule } from './auction-items/auction-items.module';
import { BidsModule } from './bids/bids.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.register({ folder: './config' }),
    MongooseModule.forRoot('mongodb://172.17.1.164:27017/auction'),
    HealthcheckModule,
    AuctionItemsModule,
    BidsModule,
  ],
})
export class AppModule {}
