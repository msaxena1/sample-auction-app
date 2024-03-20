import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

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
  async create(@Body() createBidDto: CreateBidDto): Promise<any> {
    try {
      const res = await this.bidsService.create(createBidDto);
      return res;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
