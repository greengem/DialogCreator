import PageClient from "./page.client";
import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import { Node, Edge } from "reactflow";
import { exampleEdges, exampleNodes } from "@/data/mockData";

// Perform server side data fetching
export default async function PageServer() {
  console.log("**  --  PageServer function started  --  **");

  const session = await auth();

  // If the user is not authenticated, show the default flow with mock data
  if (!session?.user?.email) {
    return (
      <PageClient initialNodes={exampleNodes} initialEdges={exampleEdges} isMockData={true} />
    );
  }

  // Fetch the default-flow for the user
  const email = session.user.email;
  let flow;
  try {
    console.log(`Fetching flow for user: ${email}`);
    flow = await prisma.flow.findFirstOrThrow({
      where: {
        user: {
          email: email,
        },
        name: "default-flow",
      },
      include: {
        nodes: true,
        edges: true,
      },
    });
    console.log("Flow fetched: ", flow.id);
  } catch (error) {
    console.error("Error fetching flow: ", error);
    return <PageClient initialNodes={exampleNodes} initialEdges={exampleEdges} isMockData={true} />;
  }

  // Format the nodes and edges for ReactFlow
  const nodes: Node[] = flow.nodes.map((node) => ({
    id: node.id,
    type: node.type,
    data: node.data as any,
    position: node.position as { x: number; y: number },
  }));

  const edges: Edge[] = flow.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));

  console.log("**  --  PageServer function completed -- **");
  return <PageClient initialNodes={nodes} initialEdges={edges} isMockData={false} />;
}
