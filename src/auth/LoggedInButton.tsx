import { auth } from '@/lib/auth';
import SignInButton from './SignInButton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import LoggedInDropdown from './LoggedInDropdown';

export default async function LoggedInButton() {
  const session = await auth();

  if (!session?.user) return <SignInButton />;

  return (
    <LoggedInDropdown>
      <Button asChild variant="outline" size="icon">
        <Avatar>
          <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
          {session.user.image && <AvatarImage src={session.user.image} />}
        </Avatar>
      </Button>
    </LoggedInDropdown>
  );
}
