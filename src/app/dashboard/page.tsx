import { requiredCurrentUser } from '@/auth/current-user';
import { Layout } from '@/components/Layout';
import { prisma } from '@/lib/db';
import { DataTable } from './data-table';
import { columns } from './columns';

export default async function Dashboard() {
  const user = await requiredCurrentUser();
  const courses = await prisma.course.findMany({
    where: {
      user: {
        id: user.id,
      },
    },
    select: {
      id: true,
      name: true,
      thumbnail: true,
      video: true,
    },
  });

  return (
    <Layout>
      <DataTable columns={columns} data={courses} />
    </Layout>
  );
}
