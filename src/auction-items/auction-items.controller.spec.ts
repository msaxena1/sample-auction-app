import { Test, TestingModule } from '@nestjs/testing';
import { AuctionItemsController } from './auction-items.controller';
import { AuctionItemsService } from './auction-items.service';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto';

describe('AuctionItemsController', () => {
  let controller: AuctionItemsController;
  let service: AuctionItemsService;
  const createAuctionItemDto: CreateAuctionItemDto = {
    reservePrice: 123,
    item: {
      itemId: 'sample-item',
      description: 'sample-description'
    }
  };
  const mockAuctionItem = {
    auctionItemId: '1234',
    reservePrice: 123,
    currentBid: 0,
    item: {
      itemId: 'sample-item',
      description: 'sample-description'
    }
  };

  const mockAuctionItemRes = {
    auctionItemId: '1234'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionItemsController],
      providers: [{
        provide: AuctionItemsService,
        useValue: {
          create: jest.fn().mockResolvedValue(mockAuctionItemRes),
          findAll: jest.fn().mockResolvedValue([mockAuctionItem]),
          findOne: jest.fn().mockResolvedValue(mockAuctionItem),
        }
      }],
    }).compile();

    controller = module.get<AuctionItemsController>(AuctionItemsController);
    service = module.get<AuctionItemsService>(AuctionItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

    it('should create a new auction item', async () => {
    const createSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValueOnce(mockAuctionItemRes);

    await controller.create(createAuctionItemDto);
    expect(createSpy).toHaveBeenCalledWith(createAuctionItemDto);
  });

  it('should return auction items', async () => {
    const createSpy = jest
      .spyOn(service, 'findAll')
      .mockResolvedValueOnce([mockAuctionItem]);

    await controller.findAll();
    expect(createSpy).toHaveBeenCalledWith();
  });

  it('should return auction item', async () => {
    const createSpy = jest
      .spyOn(service, 'findOne')
      .mockResolvedValueOnce(mockAuctionItem);

    await controller.findOne('1234');
    expect(createSpy).toHaveBeenCalledWith('1234');
  });
});
