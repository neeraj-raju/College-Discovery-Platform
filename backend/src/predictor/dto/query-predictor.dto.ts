import { IsString, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryPredictorDto {
  @IsString()
  @IsIn(['JEE Main', 'GATE', 'CAT'], { message: 'Exam must be JEE Main, GATE, or CAT' })
  exam!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'Rank must be a positive number' })
  rank!: number;
}
