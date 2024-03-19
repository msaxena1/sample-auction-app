import {
    IsDecimal,
    MinLength,
    IsNotEmpty,
    IsNumber,
    IsString,
  } from 'class-validator';

export class CreateBidDto {

    @IsNumber()

    auctionItemId: number;
    
    @IsDecimal()

    maxAutoBidAmount: number;

    @IsString()
    @MinLength( 1 )
    bidderName: string;
}
