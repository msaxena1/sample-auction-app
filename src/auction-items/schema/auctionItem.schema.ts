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
  currentBid: number;

  @Prop({ type: Number, required: false })
  bidderName: string;

  @Prop()
  item: Item;
}

export const AuctionItemSchema = SchemaFactory.createForClass(AuctionItem);
