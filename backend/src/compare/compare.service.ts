import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompareService {
  constructor(private readonly prisma: PrismaService) {}

  async compareColleges(ids: string[]) {
    // Check for duplicates
    if (new Set(ids).size !== ids.length) {
      throw new BadRequestException('Duplicate college IDs are not allowed');
    }

    // Fetch colleges with placements and course counts
    const colleges = await this.prisma.college.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        courses: {
          select: { id: true },
        },
        placements: {
          orderBy: {
            year: 'desc',
          },
        },
      },
    });

    // Check if all colleges were found
    if (colleges.length !== ids.length) {
      const foundIds = colleges.map((c) => c.id);
      const missingIds = ids.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(`Colleges with IDs: [${missingIds.join(', ')}] not found`);
    }

    // Sort to match original input IDs order
    const sortedColleges = ids.map((id) => colleges.find((c) => c.id === id)!);

    return sortedColleges.map((college) => {
      const latestPlacement = college.placements[0] || null;

      return {
        id: college.id,
        name: college.name,
        location: college.location,
        type: college.type,
        fees: college.fees,
        rating: college.rating,
        totalReviews: college.totalReviews,
        courseCount: college.courses.length,
        latestPlacement: latestPlacement
          ? {
              year: latestPlacement.year,
              avgPackage: latestPlacement.avgPackage,
              highestPackage: latestPlacement.highestPackage,
              placementRate: latestPlacement.placementRate,
              topRecruiters: latestPlacement.topRecruiters,
            }
          : null,
      };
    });
  }
}
