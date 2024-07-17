'use client';

import { YoutubePreview } from '@/components/YoutubePreview';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PencilIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { deleteCourseAction } from '../courses/new/course.action';

type Course = {
  id: number;
  name: string;
  thumbnail: string;
  video: string | null;
};

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nom',
  },
  {
    accessorKey: 'thumbnail',
    header: 'Miniature',
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Ouvrir l'image</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{row.original.name}</DialogTitle>
          </DialogHeader>{' '}
          <Image
            src={row.original.thumbnail}
            alt="image of course full screen"
            width={500}
            height={500}
            className="w-auto h-auto"
          />
        </DialogContent>
      </Dialog>
    ),
  },
  {
    accessorKey: 'video',
    header: 'Vidéo',
    cell: ({ row }) => {
      if (!row.original.video) return <p>No data</p>;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link">Ouvrir la visualisation de la vidéo</Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle>{row.original.name}</DialogTitle>
            </DialogHeader>
            <YoutubePreview url={row.original.video} className="w-full h-5xl" />
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild className="flex gap-3">
            <Link href="/courses/id/edit">
              <PencilIcon />
              Modifier
            </Link>
          </DropdownMenuItem>
          <form>
            <DropdownMenuItem asChild className="flex gap-3">
              <button
                formAction={async () => {
                  const { serverError } =
                    (await deleteCourseAction(row.original.id)) ?? {};

                  if (serverError) {
                    toast.error(serverError);
                    return;
                  }

                  toast.success('Cours supprimé avec succès');
                }}
              >
                <Trash />
                Supprimer
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
