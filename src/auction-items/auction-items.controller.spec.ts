import { Test, TestingModule } from '@nestjs/testing';
import { AuctionItemsController } from './auction-items.controller';
import { AuctionItemsService } from './auction-items.service';

describe('AuctionItemsController', () => {
  let controller: AuctionItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionItemsController],
      providers: [AuctionItemsService],
    }).compile();

    controller = module.get<AuctionItemsController>(AuctionItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
