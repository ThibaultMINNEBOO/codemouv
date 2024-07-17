'use server';

import { userAction } from '@/lib/safe-action';
import { CourseSchema } from './course.schema';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export const createCourseAction = userAction
  .schema(CourseSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const course = await prisma.course.create({
      data: {
        ...parsedInput,
        userId: user.id,
      },
    });

    return course;
  });

export const deleteCourseAction = userAction
  .schema(z.number())
  .action(async ({ parsedInput }) => {
    await prisma.course.delete({ where: { id: parsedInput } });
    revalidatePath('/dashboard');
  });
