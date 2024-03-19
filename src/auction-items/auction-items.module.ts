import { Module } from '@nestjs/common';
import { AuctionItemsService } from './auction-items.service';
import { AuctionItemsController } from './auction-items.controller';

@Module({
  controllers: [AuctionItemsController],
  providers: [AuctionItemsService],
})
export class AuctionItemsModule {}
