import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryCollegesDto } from './dto/query-colleges.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CollegesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryCollegesDto) {
    const {
      search,
      location,
      type,
      minFees,
      maxFees,
      minRating,
      sortBy = 'name',
      sortOrder = 'asc',
      page = 1,
      limit = 10,
    } = query;

    if (minFees !== undefined && maxFees !== undefined && minFees > maxFees) {
      throw new BadRequestException('minFees cannot be greater than maxFees');
    }

    const where: Prisma.CollegeWhereInput = {};

    // Build search conditions
    if (search && search.trim() !== '') {
      const searchPattern = search.trim();
      where.OR = [
        { name: { contains: searchPattern, mode: 'insensitive' } },
        { location: { contains: searchPattern, mode: 'insensitive' } },
        { city: { contains: searchPattern, mode: 'insensitive' } },
      ];
    }

    // Build filter conditions
    if (type) {
      where.type = type;
    }

    if (location && location.trim() !== '') {
      where.state = { contains: location.trim(), mode: 'insensitive' };
    }

    if (minFees !== undefined || maxFees !== undefined) {
      where.fees = {};
      if (minFees !== undefined) {
        where.fees.gte = minFees;
      }
      if (maxFees !== undefined) {
        where.fees.lte = maxFees;
      }
    }

    if (minRating !== undefined) {
      where.rating = { gte: minRating };
    }

    // Sorting
    const orderBy: Prisma.CollegeOrderByWithRelationInput = {};
    if (sortBy) {
      orderBy[sortBy as keyof Prisma.CollegeOrderByWithRelationInput] = sortOrder;
    }

    // Pagination
    const skip = (page - 1) * limit;
    const take = limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.college.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.prisma.college.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext,
        hasPrev,
      },
    };
  }

  async findOne(id: string) {
    const college = await this.prisma.college.findUnique({
      where: { id },
      include: {
        courses: {
          orderBy: {
            fees: 'asc',
          },
        },
        placements: {
          orderBy: {
            year: 'desc',
          },
        },
        reviews: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!college) {
      throw new NotFoundException(`College with ID "${id}" not found`);
    }

    return college;
  }
}
