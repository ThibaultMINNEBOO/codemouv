import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth, signOut } from '@/lib/auth';
import { ListCollapse, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

export default async function LoggedInDropdown({
  children,
}: PropsWithChildren) {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-center">
        <DropdownMenuLabel>
          Connecté en tant que{' '}
          <span className="font-bold">@{session?.user?.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="w-full flex gap-2 justify-center">
          <Link href="/dashboard">
            <ListCollapse />
            Voir les cours
          </Link>
        </DropdownMenuItem>
        <form>
          <DropdownMenuItem
            asChild
            className="w-full flex gap-2 justify-center"
          >
            <button
              formAction={async () => {
                'use server';
                await signOut();
              }}
            >
              <LogOutIcon />
              Se déconnecter
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
