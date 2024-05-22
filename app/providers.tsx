'use client'
import { ReactFlowProvider } from "reactflow";
import { SessionProvider } from "next-auth/react";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ReactFlowProvider>
                {children}
            </ReactFlowProvider>
        </SessionProvider>
    )
}