import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuctionItemsService } from './auction-items.service';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auctionItems')
@ApiTags('Auction Items')
export class AuctionItemsController {
  constructor(private readonly auctionItemsService: AuctionItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Adds an entry for auction' })
  @ApiResponse({
    status: 200,
    description: 'sample-auction-app is healthy!',
    type: String,
  })
  create(@Body() createAuctionItemDto: CreateAuctionItemDto) {
    return this.auctionItemsService.create(createAuctionItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'returns all auctionItems' })
  @ApiResponse({
    status: 200,
    description: 'sample-auction-app is healthy!',
    type: String,
  })
  findAll() {
    return this.auctionItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'returns a specific auctionItem' })
  @ApiResponse({
    status: 200,
    description: 'sample-auction-app is healthy!',
    type: String,
  })
  findOne(@Param('id') id: string) {
    return this.auctionItemsService.findOne(+id);
  }

}
