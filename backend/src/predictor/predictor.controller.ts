import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PredictorService } from './predictor.service';
import { QueryPredictorDto } from './dto/query-predictor.dto';

@Controller('predictor')
export class PredictorController {
  constructor(private readonly predictorService: PredictorService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async predict(@Query() query: QueryPredictorDto) {
    return this.predictorService.predict(query.exam, query.rank);
  }
}
