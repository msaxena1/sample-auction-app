import { Test, TestingModule } from '@nestjs/testing';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { HttpException } from '@nestjs/common';

describe('BidsController', () => {
  let controller: BidsController;
  let service: BidsService;
  const mockBidRes = 'Your Bid is placed';
  const payload = {
    auctionItemId: '1234',
    maxAutoBidAmount: 150,
    bidderName: 'test bidder',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidsController],
      providers: [
        {
          provide: BidsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockBidRes),
          },
        },
      ],
    }).compile();

    controller = module.get<BidsController>(BidsController);
    service = module.get<BidsService>(BidsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should place a new bid', async () => {
    const createSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValueOnce(mockBidRes);

    await controller.create(payload);
    expect(createSpy).toHaveBeenCalledWith(payload);
  });

  it('should throw HttpException exception', async () => {
    const createSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValueOnce(Promise.reject('some exception'));

    try {
      await controller.create(payload);
    } catch (error) {
      expect(typeof error === 'object');
      expect(error.name === 'HttpException');
    }
  });
});
