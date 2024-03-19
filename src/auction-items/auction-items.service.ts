import { Injectable } from '@nestjs/common';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto';

@Injectable()
export class AuctionItemsService {
  create(createAuctionItemDto: CreateAuctionItemDto) {
    return 'This action adds a new auctionItem';
  }

  findAll() {
    return `This action returns all auctionItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auctionItem`;
  }

}
