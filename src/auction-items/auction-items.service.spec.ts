import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionItemsService } from './auction-items.service';
import { AuctionItem } from './schema/auctionItem.schema';
import {
  ITEM_NOT_FOUND_EXCEPTION,
  OUTBID_EXCEPTION,
  RESERVE_NOT_MET_EXCEPTION,
} from './constants';

describe('AuctionItemsService', () => {
  let service: AuctionItemsService;
  let model: Model<AuctionItem>;
  const mockAuctionItem = {
    auctionItemId: '1234',
    reservePrice: 123,
    currentBid: 0,
    item: {
      itemId: 'sample-item',
      description: 'sample-description',
    },
  };

  const mockAuctionItemDb = {
    _id: '1234',
    reservePrice: 123,
    currentBid: 0,
    item: {
      itemId: 'sample-item',
      description: 'sample-description',
    },
  };

  const mockActionItemArray = [mockAuctionItem];
  const mockAuctionItemRes = {
    auctionItemId: '1234',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionItemsService,
        {
          provide: getModelToken('AuctionItem'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockAuctionItem),
            constructor: jest.fn().mockResolvedValue(mockAuctionItem),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuctionItemsService>(AuctionItemsService);
    model = module.get<Model<AuctionItem>>(getModelToken('AuctionItem'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new auction item', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve({ _id: '1234' } as any));
    const newItem = await service.create(mockAuctionItem);
    expect(newItem).toEqual(mockAuctionItemRes);
  });

  it('should return all auction items', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockAuctionItemDb]),
    } as any);

    const allItems = await service.findAll();
    expect(allItems).toEqual(mockActionItemArray);
  });

  it('should return one auction items', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockAuctionItemDb),
    } as any);

    const item = await service.findOne('1234');
    expect(item).toEqual(mockAuctionItem);
  });

  it('should update currentBid on auction items', async () => {
    const payload = {
      auctionItemId: '1234',
      maxAutoBidAmount: 150,
      bidderName: 'test bidder',
    };

    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValueOnce({
          ...mockAuctionItemDb,
          currentBid: payload.maxAutoBidAmount,
        }),
    } as any);

    const item = await service.updateBid(payload);
    expect(item).toEqual(
      `Your Bid of ${payload.maxAutoBidAmount} Accepted for item: ${payload.auctionItemId}`,
    );
  });

  it('should throw RESERVE_NOT_MET_EXCEPTION when maxAutoBidAmount < reservePrice', async () => {
    const payload = {
      auctionItemId: '1234',
      maxAutoBidAmount: 50,
      bidderName: 'test bidder',
    };

    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValueOnce({
          ...mockAuctionItemDb,
          currentBid: payload.maxAutoBidAmount,
        }),
    } as any);

    try {
      const item = await service.updateBid(payload);
    } catch (error) {
      expect(error).toEqual(RESERVE_NOT_MET_EXCEPTION);
    }
  });

  it('should throw OUTBID_EXCEPTION when maxAutoBidAmount < currentBid', async () => {
    const payload = {
      auctionItemId: '1234',
      maxAutoBidAmount: 150,
      bidderName: 'test bidder',
    };

    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValueOnce({
          ...mockAuctionItemDb,
          currentBid: payload.maxAutoBidAmount + 2,
        }),
    } as any);

    try {
      const item = await service.updateBid(payload);
    } catch (error) {
      expect(error).toEqual(OUTBID_EXCEPTION);
    }
  });

  it('should throw ITEM_NOT_FOUND_EXCEPTION for a bad auctionItemId', async () => {
    const payload = {
      auctionItemId: 'BadItemId',
      maxAutoBidAmount: 150,
      bidderName: 'test bidder',
    };

    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    try {
      const item = await service.updateBid(payload);
    } catch (error) {
      expect(error).toEqual(ITEM_NOT_FOUND_EXCEPTION);
    }
  });
});
