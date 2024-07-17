import { requiredCurrentUser } from '@/auth/current-user';
import { Layout } from '@/components/Layout';
import React from 'react';
import { CourseForm } from './CourseForm';

export default async function NewCourse() {
  await requiredCurrentUser();

  return (
    <Layout>
      <CourseForm />
    </Layout>
  );
}
