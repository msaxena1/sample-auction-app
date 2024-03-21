import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { ConfigModule } from './config/config.module';
import { AuctionItemsModule } from './auction-items/auction-items.module';
import { BidsModule } from './bids/bids.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';

let dbConnection = 'mongodb://localhost:27017/auction';
if (process.env.AUCTION_DB) {
  dbConnection = process.env.AUCTION_DB;
  //'mongodb://172.17.1.164:27017/auction'
}
let configFoler = path.resolve(__dirname, '../', './config');
if (process.env.CONFIG_FOLDER) {
  configFoler = process.env.CONFIG_FOLDER;
}
console.log(`Config folder location to use ${configFoler}`);
console.log(`DB Connection (AUCTION_DB) to use ${dbConnection}`);

@Module({
  imports: [
    ConfigModule.register({ folder: configFoler }),
    MongooseModule.forRoot(dbConnection),
    HealthcheckModule,
    AuctionItemsModule,
    BidsModule,
  ],
})
export class AppModule {}
