import { IsArray, ArrayMinSize, ArrayMaxSize, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CompareQueryDto {
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((s) => s.trim()).filter(Boolean);
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2, { message: 'Provide between 2 and 3 college IDs' })
  @ArrayMaxSize(3, { message: 'Provide between 2 and 3 college IDs' })
  ids!: string[];
}
