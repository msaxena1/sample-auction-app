import {
  IsDecimal,
  MinLength,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBidDto {
  @IsString()
  @MinLength(1)
  auctionItemId: string;

  @IsDecimal()
  maxAutoBidAmount: number;

  @IsString()
  @MinLength(1)
  bidderName: string;
}
