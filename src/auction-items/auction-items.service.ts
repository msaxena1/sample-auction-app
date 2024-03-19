import { Injectable } from '@nestjs/common';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto'

@Injectable()
export class AuctionItemsService {
  create(createAuctionItemDto: CreateAuctionItemDto) {
    console.log(createAuctionItemDto);
    return {
      auctionItemId: '1234',
    };
  }

  findAll() {
    const res = [
      {
        auctionItemId: '1234',
        currentBid: 0.0,
        reservePrice: 10450.0,
        item: {
          itemId: 'abcd',
          description: 'item description',
        },
      },
      {
        auctionItemId: '1235',
        currentBid: 2950.0,
        bidderName: 'ABC Dealership',
        reservePrice: 2499.0,
        item: {
          itemId: 'efgh',
          description: 'another item description',
        },
      },
    ];
    return res;
  }

  findOne(id: number) {
    return {
      auctionItemId: '1234',
      currentBid: 0.0,
      reservePrice: 10450.0,
      item: {
        itemId: 'abcd',
        description: 'item description',
      },
    };
  }
}
