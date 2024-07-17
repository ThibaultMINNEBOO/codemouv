import Title from '@/components/Title';
import { Button } from '@/components/ui/button';
import { LayoutList, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center mt-32 justify-center w-full flex-col gap-10 p-4">
      <Title />
      <p className="text-center max-w-2xl font-extralight">
        Codemouv est la nouvelle plateforme de recherche de cours en ligne.
        Permettant de trouver des cours informatiques créés par des développeurs
        pour des développeurs tout cela gratuitement.
      </p>
      <div className="flex flex-row gap-5 flex-wrap justify-center">
        <Button className="flex gap-3" asChild>
          <Link href="/courses">
            <LayoutList />
            Explorer les cours
          </Link>
        </Button>
        <Button variant="secondary" className="flex gap-3" asChild>
          <Link href="/courses/new">
            <Plus />
            Créer un cours
          </Link>
        </Button>
      </div>
    </div>
  );
}
