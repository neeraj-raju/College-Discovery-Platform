import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedService {
  constructor(private readonly prisma: PrismaService) {}

  async getSavedColleges(userId: string) {
    const saved = await this.prisma.savedCollege.findMany({
      where: { userId },
      include: {
        college: true,
      },
      orderBy: {
        savedAt: 'desc',
      },
    });

    return saved.map((s) => s.college);
  }

  async saveCollege(userId: string, collegeId: string) {
    // Check if college exists
    const college = await this.prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      throw new NotFoundException(`College with ID "${collegeId}" not found`);
    }

    // Check if already saved
    const existing = await this.prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: { userId, collegeId },
      },
    });

    if (existing) {
      throw new ConflictException('College is already saved');
    }

    try {
      return await this.prisma.savedCollege.create({
        data: {
          userId,
          collegeId,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('College is already saved');
      }
      throw error;
    }
  }

  async unsaveCollege(userId: string, collegeId: string) {
    const record = await this.prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: { userId, collegeId },
      },
    });

    if (!record) {
      throw new NotFoundException('College is not in your saved list');
    }

    await this.prisma.savedCollege.delete({
      where: {
        id: record.id,
      },
    });

    return { message: 'College removed from saved list successfully' };
  }

  async checkSaveStatus(userId: string, collegeId: string) {
    const record = await this.prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: { userId, collegeId },
      },
    });

    return { isSaved: !!record };
  }
}
