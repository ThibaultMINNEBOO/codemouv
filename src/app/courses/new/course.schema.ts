import { z } from 'zod';

export const CourseSchema = z.object({
  name: z
    .string({
      message: 'Le nom du cours est requis.',
    })
    .min(3, 'Le nom du cours doit contenir au moins 3 caractères.')
    .max(150, 'Le nom du cours ne peut pas dépasser 150 caractères.'),
  description: z.string({
    message: 'Le contenu du cours est requis',
  }),
  thumbnail: z
    .any()
    .refine(
      (files) =>
        ['image/png'].includes(files?.[0]?.type) || typeof files === 'string',
      'Format .png seulement accepté'
    ),
  video: z.string().url().optional(),
});

export type CourseType = z.infer<typeof CourseSchema>;
