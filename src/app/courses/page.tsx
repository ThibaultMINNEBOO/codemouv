import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/db';
import { Book, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Courses() {
  const courses = await prisma.course.findMany({
    include: {
      user: true,
    },
  });

  return (
    <Layout className="flex-wrap">
      <h1 className="text-4xl font-extrabold text-center my-4">
        Voici la liste des cours
      </h1>
      <div className="flex flex-row flex-wrap gap-3 justify-center">
        {courses.map((course) => {
          return (
            <Card
              key={course.id}
              className="flex items-center flex-col justify-center"
            >
              <CardHeader className="flex items-center gap-3">
                <CardTitle className="text-center">{course.name}</CardTitle>
                <Image
                  src={course.thumbnail}
                  alt={course.name}
                  width={250}
                  height={250}
                  className="max-w-64 rounded-lg"
                />
              </CardHeader>
              <CardContent className="flex items-end justify-center">
                <Button className="flex gap-2" size="sm" asChild>
                  <Link href={`/courses/${course.id}`}>
                    <Book />
                    Lire le cours
                  </Link>
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-3">
                  <User />
                  {course.user.name}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
}
