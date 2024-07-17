import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftFromLine } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout>
      <Card className="flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="text-5xl font-bold text-primary">
            Erreur 404
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 items-center">
          <h2>Page non trouvée</h2>
          <Button asChild className="flex gap-3">
            <Link href="/">
              <ArrowLeftFromLine />
              Retourner à l'accueil
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
}
