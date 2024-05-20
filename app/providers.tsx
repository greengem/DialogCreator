'use client'
import { ReactFlowProvider } from "reactflow";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReactFlowProvider>
            {children}
        </ReactFlowProvider>
    )
}