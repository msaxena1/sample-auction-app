import { Injectable } from '@nestjs/common';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuctionItem } from './schema/auctionItem.schema';
import {
  RESERVE_NOT_MET_EXCEPTION,
  OUTBID_EXCEPTION,
} from './constants';

@Injectable()
export class AuctionItemsService {
  constructor(
    @InjectModel(AuctionItem.name) private auctionItemModel: Model<AuctionItem>,
  ) {}

  async create(createAuctionItemDto: CreateAuctionItemDto): Promise<any> {
    const auctionItem: any = { ...createAuctionItemDto };
    auctionItem.currentBid = 0.0;
    const createdAuctionItem = await this.auctionItemModel.create(auctionItem);
    const ret = {
      auctionItemId: createdAuctionItem._id,
    };

    return Promise.resolve(ret);
  }

  mapAuctionItem(record: any): any {
    return {
      auctionItemId: record._id,
      currentBid: record.currentBid,
      reservePrice: record.reservePrice,
      item: record.item,
      bidderName: record.bidderName,
    };
  }

  async findAll(): Promise<any[]> {
    const auctionItems: Array<any> = await this.auctionItemModel.find().exec();
    return auctionItems.map((item) => this.mapAuctionItem(item));
  }

  async findOne(id: string): Promise<any> {
    const auctionItem = await this.auctionItemModel.findOne({ _id: id }).exec();
    return this.mapAuctionItem(auctionItem);
  }

  async updateBid(payload: any): Promise<any> {
    const price: number = payload.maxAutoBidAmount - 1;
    const filter: any = {
      _id: payload.auctionItemId,
      currentBid: { $lte: price },
    };

    const update: any = {
      currentBid: payload.maxAutoBidAmount,
      bidderName: payload.bidderName,
    };

    const auctionItem = await this.auctionItemModel
      .findOneAndUpdate(filter, update, { returnOriginal: false })
      .exec();

    if (auctionItem) {
      const newDetails = this.mapAuctionItem(auctionItem);
      if (newDetails.currentBid < newDetails.reservePrice)
        throw RESERVE_NOT_MET_EXCEPTION;
      return `Your Bid of ${newDetails.currentBid} Accepted for item: ${newDetails.auctionItemId}`;
    } else throw OUTBID_EXCEPTION;
  }
}
