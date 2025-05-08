import { auth } from "@/lib/auth";
import { signIn, signUp } from "@/server/users";
import { headers } from "next/headers";
import SignOut from "./signout";
import { Input } from "@/components/ui/input"
import ImpersonatedBy from "@/components/impersonatedBy";


export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex flex-col gap-3 items-center justify-center p-10">
      <div className="flex gap-3">
        <button
          className="bg-neutral-700 text-white p-2 rounded-md"
          onClick={signIn}
        >
          Sign In
        </button>
        <button
          className="bg-neutral-700 text-white p-2 rounded-md"
          onClick={signUp}
        >
          Sign Up        </button>
      <SignOut />
      </div>
      <ImpersonatedBy 
        session={session}
      />
      
      <div className="flex gap-3">
        <p>{session.session.impersonatedBy ? session?.session.impersonatedBy : "Not impersonating"}</p>
      </div>
      <p>{!session ? "Not authenticated" : session.user.name}</p>
    </main>
  );
}
