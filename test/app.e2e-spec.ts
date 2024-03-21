import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });
  let itemId;
  const createAuctionItemBody: any = {
    reservePrice: 123,
    item: {
      itemId: 'sample-item-e2e',
      description: 'sample-description for e2e object',
    },
  };

  it('/ (healthcheck)', () => {
    return request(app.getHttpServer())
      .get('/healthcheck')
      .expect(200)
      .expect('sample-auction-app is healthy!');
  });

  it('Should create an item', () => {
    return request(app.getHttpServer())
      .post('/auctionItems')
      .send(createAuctionItemBody)
      .then((result) => {
        expect(result.statusCode).toEqual(201);
        itemId = result.body.auctionItemId;
      });
  });

  it('Should get items', () => {
    return request(app.getHttpServer())
      .get('/auctionItems')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        const ids = result.body.map((item) => item.auctionItemId);
        console.log(ids);

        expect(ids.includes(itemId)).toBeTruthy;
      });
  });
  it('Should get item created above', () => {
    return request(app.getHttpServer())
      .get('/auctionItems/' + itemId)
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body.auctionItemId === itemId).toBeTruthy;
      });
  });

  it('Should place a bid less than reserve price and get ReserveNotMetException exception', () => {
    const createBidBody = {
      auctionItemId: itemId,
      maxAutoBidAmount: '2',
      bidderName: 'e2e bidder',
    };
    return request(app.getHttpServer())
      .post('/bids')
      .send(createBidBody)
      .then((result) => {
        expect(result.statusCode).toEqual(500);
        expect(result.body.message).toContain('ReserveNotMetException');
      });
  });

  it('Should place a bid more than reserver price', () => {
    const createBidBody = {
      auctionItemId: itemId,
      maxAutoBidAmount: '126',
      bidderName: 'e2e bidder',
    };
    return request(app.getHttpServer())
      .post('/bids')
      .send(createBidBody)
      .then((result) => {
        expect(result.statusCode).toEqual(201);
      });
  });

  it('Should place a bid less than current bid price and get an OutbidException exception', () => {
    const createBidBody = {
      auctionItemId: itemId,
      maxAutoBidAmount: '125',
      bidderName: 'e2e bidder another',
    };
    return request(app.getHttpServer())
      .post('/bids')
      .send(createBidBody)
      .then((result) => {
        expect(result.statusCode).toEqual(500);
        expect(result.body.message).toContain('OutbidException');
      });
  });

  it('Should place a bid more than current bid price should be accepted', () => {
    const createBidBody = {
      auctionItemId: itemId,
      maxAutoBidAmount: '130',
      bidderName: 'e2e bidder another',
    };
    return request(app.getHttpServer())
      .post('/bids')
      .send(createBidBody)
      .then((result) => {
        expect(result.statusCode).toEqual(201);
      });
  });
});
