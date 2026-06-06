import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PredictorService {
  constructor(private readonly prisma: PrismaService) {}

  async predict(exam: string, rank: number) {
    const matchingCourses = await this.prisma.course.findMany({
      where: {
        exam,
        cutoff: {
          gte: rank, // eligibility: user rank <= cutoff rank (hence cutoff >= rank)
        },
      },
      include: {
        college: true,
      },
      orderBy: [
        {
          college: {
            rating: 'desc',
          },
        },
        {
          cutoff: 'asc', // closer cutoffs first
        },
      ],
    });

    return matchingCourses.map((course) => ({
      courseId: course.id,
      courseName: course.name,
      cutoff: course.cutoff,
      fees: course.fees,
      duration: course.duration,
      seats: course.seats,
      college: {
        id: course.college.id,
        name: course.college.name,
        location: course.college.location,
        type: course.college.type,
        fees: course.college.fees,
        rating: course.college.rating,
        totalReviews: course.college.totalReviews,
        imageUrl: course.college.imageUrl,
      },
    }));
  }
}
