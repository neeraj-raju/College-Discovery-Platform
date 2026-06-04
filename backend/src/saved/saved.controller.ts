import { Controller, Get, Post, Delete, Param, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { SavedService } from './saved.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSavedColleges(@Req() req: any) {
    return this.savedService.getSavedColleges(req.user.id);
  }

  @Post(':collegeId')
  @HttpCode(HttpStatus.CREATED)
  async saveCollege(@Req() req: any, @Param('collegeId') collegeId: string) {
    return this.savedService.saveCollege(req.user.id, collegeId);
  }

  @Delete(':collegeId')
  @HttpCode(HttpStatus.OK)
  async unsaveCollege(@Req() req: any, @Param('collegeId') collegeId: string) {
    return this.savedService.unsaveCollege(req.user.id, collegeId);
  }

  @Get(':collegeId/status')
  @HttpCode(HttpStatus.OK)
  async checkSaveStatus(@Req() req: any, @Param('collegeId') collegeId: string) {
    return this.savedService.checkSaveStatus(req.user.id, collegeId);
  }
}
