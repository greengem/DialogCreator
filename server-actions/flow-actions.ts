"use server";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { Node, Edge } from "reactflow";

// Type definitions for the response
interface Response {
  success: boolean;
  message: string;
  flow?: any;
}

// Helper function to get authenticated user
async function getAuthenticatedUser() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const email = session.user.email;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

// Helper function to format nodes
function formatNodes(nodes: Node[]) {
  return nodes.map((node) => ({
    id: node.id,
    type: node.type || "default",
    data: node.data,
    position: { x: node.position.x, y: node.position.y },
  }));
}

// Helper function to format edges
function formatEdges(edges: Edge[]) {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    sourceHandle: edge.sourceHandle,
    target: edge.target,
    targetHandle: edge.targetHandle,
  }));
}

// Save flow
export async function handleSaveFlow(flowName: string, nodes: Node[], edges: Edge[]): Promise<Response> {
  try {
    const user = await getAuthenticatedUser();
    const userId = user.id;

    const formattedNodes = formatNodes(nodes);
    const formattedEdges = formatEdges(edges);

    const existingFlow = await prisma.flow.findFirst({
      where: {
        userId,
        name: flowName,
      },
    });

    let flow;
    if (existingFlow) {
      flow = await prisma.flow.update({
        where: { id: existingFlow.id },
        data: {
          nodes: {
            deleteMany: {},
            create: formattedNodes,
          },
          edges: {
            deleteMany: {},
            create: formattedEdges,
          },
        },
      });
    } else {
      flow = await prisma.flow.create({
        data: {
          userId,
          name: flowName,
          nodes: {
            create: formattedNodes,
          },
          edges: {
            create: formattedEdges,
          },
        },
      });
    }

    revalidatePath("/");

    return { success: true, message: "Flow saved", flow };
  } catch (e: unknown) {
    return { success: false, message: (e as Error).message || "Failed to save flow" };
  }
}

// Delete (reset) flow
export async function handleDeleteFlow(flowName: string): Promise<Response> {
  try {
    const user = await getAuthenticatedUser();
    const email = user.email;

    const existingFlow = await prisma.flow.findFirst({
      where: {
        user: { email },
        name: flowName,
      },
    });

    if (!existingFlow) {
      throw new Error("Flow not found");
    }

    await prisma.$transaction([
      prisma.node.deleteMany({ where: { flowId: existingFlow.id } }),
      prisma.edge.deleteMany({ where: { flowId: existingFlow.id } }),
      prisma.node.create({
        data: {
          type: "characters",
          data: { characters: ["Player", "Narrator"] },
          position: { x: 250, y: 5 },
          flow: { connect: { id: existingFlow.id } },
        },
      }),
    ]);

    revalidatePath("/");

    return { success: true, message: "Flow reset" };
  } catch (e: unknown) {
    return { success: false, message: (e as Error).message || "Failed to reset flow" };
  }
}
