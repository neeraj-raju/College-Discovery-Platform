import { Module } from '@nestjs/common';
import { PredictorService } from './predictor.service';
import { PredictorController } from './predictor.controller';

@Module({
  controllers: [PredictorController],
  providers: [PredictorService],
})
export class PredictorModule {}
