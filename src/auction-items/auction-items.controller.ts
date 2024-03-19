import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { AuctionItemsService } from './auction-items.service';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auctionItems')
@ApiTags('Auction Items')
export class AuctionItemsController {
  constructor(private readonly auctionItemsService: AuctionItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Adds an entry for auction' })
  @ApiResponse({
    status: 201,
    description: 'Auction item created!!',
    type: CreateAuctionItemDto,
  })
  create(@Body() createAuctionItemDto: CreateAuctionItemDto) {
    return this.auctionItemsService.create(createAuctionItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'returns all auctionItems' })
  @ApiResponse({
    status: 200,
    description: 'list of auction items!',
    type: Array,
  })
  findAll() {
    return this.auctionItemsService.findAll();
  }

  @Get(':auctionItemId')
  @ApiOperation({ summary: 'returns a specific auctionItem' })
  @ApiResponse({
    status: 200,
    description: 'details of auction item!',
    type: Object,
  })
  findOne(
    @Param('auctionItemId')
    auctionItemId: number
  ) {
    console.log(auctionItemId);
    return this.auctionItemsService.findOne(+auctionItemId);
  }
}
