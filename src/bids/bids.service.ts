import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateBidDto } from './dto/create-bid.dto';
import { AuctionItemsService } from '../auction-items/auction-items.service';

@Injectable()
export class BidsService implements OnModuleInit {
  private auctionItemService: AuctionItemsService;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.auctionItemService = this.moduleRef.get(AuctionItemsService, {
      strict: false,
    });
  }

  async create(createBidDto: CreateBidDto) {
    // TBD: Add Logging !!!

    const res = await this.auctionItemService.updateBid(createBidDto);
    return res;
  }
}
