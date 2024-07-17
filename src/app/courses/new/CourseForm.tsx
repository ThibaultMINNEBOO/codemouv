'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from '@/components/ui/form';
import { useState } from 'react';
import { CourseSchema, CourseType } from './course.schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Tiptap from './Tiptap';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { createCourseAction } from './course.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getYoutubeId } from '@/utils/getYoutubeId';
import Image from 'next/image';
import { PutBlobResult } from '@vercel/blob';
import { Edit, Plus } from 'lucide-react';

export type CourseFormProps = {
  defaultValues?: CourseType;
};

export function CourseForm({ defaultValues }: CourseFormProps) {
  const form = useZodForm({
    schema: CourseSchema,
    defaultValues,
  });
  const [videoId, setVideoId] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: CourseType) => {
      if (values.thumbnail) {
        const response = await fetch(
          `/api/course/upload?filename=${values.thumbnail?.[0]?.name}`,
          {
            method: 'POST',
            body: values.thumbnail?.[0],
            credentials: 'include',
          }
        );

        const newBlob = (await response.json()) as PutBlobResult;

        values.thumbnail = newBlob.url;
      }

      const { data, serverError } = (await createCourseAction(values)) ?? {};

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      toast.success('Cours créé avec succès');

      router.push(`/courses/${data.id}`);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {!defaultValues
            ? 'Créer un cours'
            : `Modifier le cours ${defaultValues.name}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          form={form}
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du cours..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu</FormLabel>
                <FormControl>
                  <Tiptap val={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="thumbnail"
            render={() => (
              <FormItem>
                <FormLabel>Contenu</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".png"
                    {...form.register('thumbnail')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setUploadedImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                </FormControl>
                {uploadedImage && (
                  <Image
                    src={uploadedImage}
                    alt="uploadedImagez"
                    width={250}
                    height={250}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vidéo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Entrer une URL youtube"
                    {...field}
                    onChange={(e) => {
                      setVideoId(getYoutubeId(e.target.value));
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
                {videoId && (
                  <iframe
                    className="w-full h-[513px]"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" className="flex gap-3">
            {defaultValues ? (
              <>
                <Edit />
                Modifier le cours
              </>
            ) : (
              <>
                <Plus />
                Créer le cours
              </>
            )}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
