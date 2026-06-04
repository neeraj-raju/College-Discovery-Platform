import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CompareService } from './compare.service';
import { CompareQueryDto } from './dto/compare-query.dto';

@Controller('compare')
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async compare(@Query() query: CompareQueryDto) {
    return this.compareService.compareColleges(query.ids);
  }
}
