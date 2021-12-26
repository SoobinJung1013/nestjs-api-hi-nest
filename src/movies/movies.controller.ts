import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies') //  이 부분이 url의 entry point 역할을 함
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  //NestJS가 MoviesService 를 import 하고 Controller에 injection 할거임

  @Get() //그리고 얘네들이 그 라우터들이 됨
  //   getAll() {
  //     return 'i`m the best';
  //   }
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  //   @Get('search')
  //   search(@Query('year') searchingYear: string) {
  //     return `i can do it`;
  //   }

  @Get(':id')
  //   getOne(@Param('id') movieId: string) {
  //     // decoratoe를 사용해 요청하면 우리가 원하는 값이 url에 있는거 암.
  //     return `i'm good at english. param decorator : ${movieId}`; //``
  //   }
  getOne(@Param('id') movieId: number): Movie {
    console.log(typeof movieId);
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    //:이게 리턴하는거 그리고 타입 대충 이렇게 뒤에 따라오는듯
    console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
