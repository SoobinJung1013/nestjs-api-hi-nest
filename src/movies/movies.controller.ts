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

@Controller('movies') //  이 부분이 url의 entry point 역할을 함
export class MoviesController {
  @Get() //그리고 얘네들이 그 라우터들이 됨
  getAll() {
    return 'i`m the best'; //''
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `i can do it`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    // decoratoe를 사용해 요청하면 우리가 원하는 값이 url에 있는거 암.
    return `i'm good at english. param decorator : ${movieId}`; //``
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return 'this will create movie';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this will delete a movie with the id : ${id} `;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateMovie: movieId,
      ...updateData,
    };
  }
}
