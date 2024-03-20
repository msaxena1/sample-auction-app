import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { AuctionItemsModule } from 'src/auction-items/auction-items.module';

@Module({
  imports: [AuctionItemsModule],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
