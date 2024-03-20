import { Controller, Post, Body } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AUDIT_CATEGORY } from './constants';

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
    const incomingMsg = `Incoming Audit Req: ${JSON.stringify(createBidDto)}`;
    Logger.log(incomingMsg, AUDIT_CATEGORY);
    try {
      const res = await this.bidsService.create(createBidDto);

      const outgoingMsg = `Outgoing Audit Res: ${JSON.stringify(res)}`;
      Logger.log(outgoingMsg, AUDIT_CATEGORY);

      return res;
    } catch (error) {
      const outgoingMsg = `Outgoing Audit Res: Exception: (${error}) for Req: ${JSON.stringify(createBidDto)}`;
      Logger.error(outgoingMsg, AUDIT_CATEGORY);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
