import { IconArtboard, IconArtboardFilled } from "@tabler/icons-react";
import CustomAvatar from "./CustomAvatar";
import { auth } from "@/auth";

export default async function Navbar() {
    const session = await auth();
    const image = session?.user?.image ?? undefined;
    const name = session?.user?.id ?? undefined;

    return (
        <nav className="bg-zinc-950 flex  items-center px-4 justify-between py-3">
            <div className="text-3xl tracking-tighter text-zinc-300 flex gap-2 items-center">
                <IconArtboardFilled size={30} />
                <p>Dialogue Creator</p>
            </div>
            {session?.user?.email && (
                <CustomAvatar image={image} name={name} />
            )}
        </nav>
    )
}
