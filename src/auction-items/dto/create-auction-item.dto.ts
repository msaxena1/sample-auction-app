import {
  IsDecimal,
  MinLength,
  IsNotEmpty,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

class Item {
  @MinLength(1)
  itemId: string;

  @MinLength(1)
  description: string;
}
export class CreateAuctionItemDto {
  @IsDecimal()
  reservePrice: number;

  // TBD!!!: Why nested validation is not working
  @ValidateNested()
  @IsNotEmptyObject()
  item: Item;
}
