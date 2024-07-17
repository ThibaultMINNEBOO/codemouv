import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';

export default function SignInButton() {
  return (
    <form>
      <Button
        formAction={async () => {
          'use server';
          await signIn();
        }}
      >
        Se connecter
      </Button>
    </form>
  );
}
