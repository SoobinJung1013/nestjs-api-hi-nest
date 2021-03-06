import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  // create와 다른 점은 모든 점이 필수가 아니라는 점이다.
  @IsString()
  readonly title?: string;
  @IsNumber()
  readonly year?: number;
  @IsOptional()
  @IsString({ each: true })
  readonly genres?: string[];
}
