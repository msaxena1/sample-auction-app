import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuctionItemsService } from './auction-items.service';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto';

@Controller('auctionItems')
export class AuctionItemsController {
  constructor(private readonly auctionItemsService: AuctionItemsService) {}

  @Post()
  create(@Body() createAuctionItemDto: CreateAuctionItemDto) {
    return this.auctionItemsService.create(createAuctionItemDto);
  }

  @Get()
  findAll() {
    return this.auctionItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionItemsService.findOne(+id);
  }

}
