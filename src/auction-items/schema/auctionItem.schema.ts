import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuctionItemDocument = HydratedDocument<AuctionItem>;

class Item {
  @Prop()
  itemId: string;

  @Prop()
  description: string;
}

@Schema()
export class AuctionItem {
  @Prop()
  reservePrice: number;

  @Prop()
  item: Item;
}

export const AuctionItemSchema = SchemaFactory.createForClass(AuctionItem);
