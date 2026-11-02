import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Edge, Node } from "@xyflow/react";
import type { Person, PersonRelation } from "@/types/history";
import { PersonGraph } from "@/features/people/person-graph";

const capture = vi.hoisted(() => ({ nodes: [] as Node[], edges: [] as Edge[] }));
vi.mock("@xyflow/react", () => ({
  Position: { Top: "top", Bottom: "bottom", Left: "left", Right: "right" },
  MarkerType: { ArrowClosed: "arrowclosed" },
  Handle: () => null, Background: () => null, Controls: () => null,
  ReactFlow: ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
    capture.nodes = nodes; capture.edges = edges;
    return <div data-testid="relationship-graph" />;
  },
}));

afterEach(() => vi.unstubAllGlobals());
describe("three related people layout", () => {
  it("aligns left and right peers with the center and puts the remaining peer below", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    const people = ["center", "first", "second", "third"].map(id => ({ id, name: id }) as Person);
    const relations = people.slice(1).map((p, i) => ({ id: `relation-${i}`, sourcePersonId: "center", targetPersonId: p.id, type: "political" }) as PersonRelation);
    render(<PersonGraph center={people[0]} people={people} relations={relations} onFocus={vi.fn()} />);
    expect(screen.getByTestId("relationship-graph")).toBeInTheDocument();
    const center = capture.nodes.find(n => n.id === "center")!.position;
    const peers = capture.nodes.filter(n => n.id !== "center");
    expect(peers).toHaveLength(3);
    expect(peers.filter(n => Math.abs(n.position.y - center.y) < 1)).toHaveLength(2);
    expect(peers.filter(n => Math.abs(n.position.x - center.x) < 1 && n.position.y > center.y)).toHaveLength(1);
    expect(peers.some(n => n.position.x < center.x - 112)).toBe(true);
    expect(peers.some(n => n.position.x > center.x + 112)).toBe(true);
    expect(capture.edges.map(e => e.sourceHandle).sort()).toEqual(["source-bottom", "source-left", "source-right"]);
  });
});
