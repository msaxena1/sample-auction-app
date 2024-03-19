import { Injectable } from '@nestjs/common';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuctionItem } from './schema/auctionItem.schema';

@Injectable()
export class AuctionItemsService {
  constructor(
    @InjectModel(AuctionItem.name) private auctionItemModel: Model<AuctionItem>,
  ) {}

  async create(createAuctionItemDto: CreateAuctionItemDto): Promise<any> {
    console.log(createAuctionItemDto);
    const createdAuctionItem =
      await this.auctionItemModel.create(createAuctionItemDto);
    const ret = {
      auctionItemId: createdAuctionItem._id,
    };

    return Promise.resolve(ret);
  }

  async findAll(): Promise<any[]> {
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
    ];

    const auctionItems = await this.auctionItemModel.find().exec();
    return auctionItems;
  }

  async findOne(id: string): Promise<any> {
    /*
    return {
      auctionItemId: id,
      currentBid: 0.0,
      reservePrice: 10450.0,
      item: {
        itemId: 'abcd',
        description: 'item description',
      },
    };
    */
    const auctionItem = await this.auctionItemModel.findOne({ _id: id }).exec();
    return auctionItem;
  }
}
