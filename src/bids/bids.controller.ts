import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('bids')
@ApiTags('Bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  @ApiOperation({ summary: 'Places a bid for auction item' })
  @ApiResponse({
    status: 201,
    description: 'Bid placed!!',
    type: String,
  })
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto);
  }

}
