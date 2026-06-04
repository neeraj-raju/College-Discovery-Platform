import { Controller, Get, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CollegesService } from './colleges.service';
import { QueryCollegesDto } from './dto/query-colleges.dto';

@Controller('colleges')
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: QueryCollegesDto) {
    return this.collegesService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.collegesService.findOne(id);
  }
}
