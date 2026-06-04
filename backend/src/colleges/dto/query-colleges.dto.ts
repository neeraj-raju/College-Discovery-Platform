import { IsOptional, IsString, IsNumber, IsEnum, Min, Max, IsInt, MaxLength, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { CollegeType } from '@prisma/client';

export class QueryCollegesDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(CollegeType, { message: 'Type must be GOVERNMENT, PRIVATE, or DEEMED' })
  type?: CollegeType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minFees?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxFees?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  minRating?: number;

  @IsOptional()
  @IsString()
  @IsIn(['name', 'fees', 'rating', 'established'], { message: 'sortBy must be name, fees, rating, or established' })
  sortBy?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'], { message: 'sortOrder must be asc or desc' })
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}
