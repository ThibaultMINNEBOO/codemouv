'use client';

import { signInAction } from '@/auth/actions/signInAction';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Error() {
  return (
    <Layout>
      <Card className="flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle>Veuillez vous connecter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 items-center">
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <Button
            onClick={async () => {
              await signInAction();
            }}
          >
            Se connecter
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
}
