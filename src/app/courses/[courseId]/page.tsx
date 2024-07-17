import { Layout } from '@/components/Layout';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { YoutubePreview } from '@/components/YoutubePreview';
import { prisma } from '@/lib/db';
import { User } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Course({
  params,
}: {
  params: { courseId: number };
}) {
  const course = await prisma.course.findUnique({
    where: {
      id: Number(params.courseId),
    },
    include: {
      user: true,
    },
  });

  if (!course) {
    return notFound();
  }

  return (
    <Layout>
      <Card>
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-center my-6">{course.name}</CardTitle>
          {course.video ? (
            <YoutubePreview url={course.video} />
          ) : (
            <Image
              width={500}
              height={500}
              className="w-auto h-auto"
              src={course.thumbnail}
              alt={course.name}
            />
          )}
        </CardHeader>
        <hr />
        <CardContent className="mt-6">
          <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
        </CardContent>
        <hr />
        <CardFooter className="mt-6 flex gap-3">
          <User />
          <p>
            Créé par{' '}
            <span className="text-primary font-bold">{course.user.name}</span>
          </p>
        </CardFooter>
      </Card>
    </Layout>
  );
}
