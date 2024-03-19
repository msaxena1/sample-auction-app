import { Module } from '@nestjs/common';
import { AuctionItemsService } from './auction-items.service';
import { AuctionItemsController } from './auction-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionItem, AuctionItemSchema } from './schema/auctionItem.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuctionItem.name, schema: AuctionItemSchema },
    ]),
  ],
  controllers: [AuctionItemsController],
  providers: [AuctionItemsService],
})
export class AuctionItemsModule {}
