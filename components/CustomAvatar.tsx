'use client'

import { Avatar } from "@radix-ui/themes";

interface CustomAvatarProps {
    image?: string;
    name?: string;
}

export default function CustomAvatar({ image, name }: CustomAvatarProps) {
    const defaultImage = '/path/to/default/image.png';
    const defaultName = 'User';

    return (
        <Avatar src={image ?? defaultImage} fallback={name ?? defaultName} />
    );
}