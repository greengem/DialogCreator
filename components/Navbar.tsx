import CustomAvatar from "./CustomAvatar";
import { auth } from "@/auth";

export default async function Navbar() {
    const session = await auth();
    const image = session?.user?.image ?? undefined;
    const name = session?.user?.id ?? undefined;

    return (
        <nav className="h-16 bg-zinc-950 flex  items-center px-5 border-b-2 border-zinc-700 justify-between text-white tracking-tight">
            <p className="text-2xl font-light">DialogueDesigner</p>
            {session?.user?.email && (
                <CustomAvatar image={image} name={name} />
            )}
        </nav>
    )
}
