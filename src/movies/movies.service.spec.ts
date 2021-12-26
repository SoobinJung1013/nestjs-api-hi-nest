import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', () => {
      const berforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie2',
        genres: ['test'],
        year: 2001,
      });
      const afterCreate = service.getAll().length;
      // expect(service.getOne(1)).toBeDefined();
      console.log(service.getAll());
      expect(afterCreate).toEqual(berforeCreate + 1);
    });
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
      // result가 instance 배열인지 테스트하는거임
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      // service.create({
      //   title: 'Test Movie',
      //   genres: ['test'],
      //   year: 2000,
      // });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      // expect(movie.id).toEqual(1);
      // expect(movie.title).toEqual('Test Movie');
      // expect(movie.genres).toEqual(['test']);
      // expect(movie.year).toEqual(2000);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found.`);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      // service.create({
      //   title: 'Test Movie',
      //   genres: ['test'],
      //   year: 2000,
      // });
      // console.log(service.getAll());
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      // console.log(allMovies);
      // console.log(afterDelete);
      expect(afterDelete).toEqual(allMovies - 1);
    });
    it('should return 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found.`);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      // service.create({
      //   title: 'Test Movie',
      //   genres: ['test'],
      //   year: 2000,
      // });
      service.update(1, { year: 2004 });
      const updated = service.getOne(1);
      expect(updated.year).toEqual(2004);
    });
    it('should throw 404 error', () => {
      try {
        service.update(999, { year: 2004 });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found.`);
      }
    });
  });
});
