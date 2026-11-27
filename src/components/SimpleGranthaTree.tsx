import React, { useMemo, useState, useRef, useEffect } from "react";
import { PRESEEDED_GRANTHAS } from "../data";
import { TextEntry } from "../types";
import {
  UNIFORM_TRADITION_TREES,
  TraditionTreeNode,
} from "../traditionTreeData";
import { useBharatiyaLipi } from "../context/BharatiyaLipiContext";
import {
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  BookOpen,
  X,
} from "lucide-react";

interface SimpleGranthaTreeProps {
  onOpenNode: (node: TraditionTreeNode) => void;
  initialTraditionId?: string;
}

interface PositionedNode {
  node: TraditionTreeNode;
  depth: number;
  x: number;
  y: number;
  parentId: string | null;
  hasChildren: boolean;
  isExpanded: boolean;
  isReadable: boolean;
  isMatch: boolean;
}

interface TreeEdge {
  id: string;
  sourceId: string;
  targetId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function collectDefaultSimpleExpanded(root: TraditionTreeNode): Set<string> {
  const expanded = new Set<string>();
  expanded.add(root.id);

  // Depth 1: expand all 4 canonical branches (प्रस्थानत्रयम्, प्र.प्रकरण, स्तोत्र, इतरे)
  root.children?.forEach((branch, idx) => {
    expanded.add(branch.id);
    if (idx === 0 && branch.children) {
      // Under प्रस्थानत्रयम्: expand उपनिषदः, श्रीमद्भगवद्गीता, ब्रह्मसूत्राणि
      branch.children.forEach((ptChild) => {
        expanded.add(ptChild.id);
        if (ptChild.id.endsWith("-upanishads") && ptChild.children) {
          // Expand first 3 Upaniṣads (Īśa, Kena, Kaṭha) and their Bhāṣyas by default
          ptChild.children.slice(0, 3).forEach((up) => {
            expanded.add(up.id);
            up.children?.forEach((bh) => {
              if (bh.children && bh.children.length > 0) {
                expanded.add(bh.id);
              }
            });
          });
        } else if (ptChild.children) {
          // Expand Gītā Bhāṣya and Brahma Sūtra Bhāṣya (1st level)
          ptChild.children.forEach((bh) => {
            if (bh.children && bh.children.length > 0) {
              expanded.add(bh.id);
            }
          });
        }
      });
    }
  });

  return expanded;
}

function collectAllExpandable(node: TraditionTreeNode, out: Set<string>) {
  if (node.children && node.children.length > 0) {
    out.add(node.id);
    node.children.forEach((c) => collectAllExpandable(c, out));
  }
}

function estimateLabelWidth(text: string): number {
  return Math.min(340, Math.max(120, text.length * 7.8 + 26));
}

export default function SimpleGranthaTree({
  onOpenNode,
  initialTraditionId = "advaita",
}: SimpleGranthaTreeProps) {
  const { transliterate, activeLipi, getTypographyStyle } = useBharatiyaLipi();

  const granthaMap = useMemo(() => {
    const map = new Map<string, TextEntry>();
    PRESEEDED_GRANTHAS.forEach((g) => map.set(g.id, g));
    return map;
  }, []);

  const [selectedTraditionId, setSelectedTraditionId] = useState<string>(initialTraditionId);
  const currentTradition = useMemo(() => {
    return (
      UNIFORM_TRADITION_TREES.find((t) => t.id === selectedTraditionId) ||
      UNIFORM_TRADITION_TREES[0]
    );
  }, [selectedTraditionId]);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
    collectDefaultSimpleExpanded(currentTradition.root)
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [zoom, setZoom] = useState<number>(1);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [inspectedNode, setInspectedNode] = useState<TraditionTreeNode | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);

  const handleSelectTradition = (traditionId: string) => {
    setSelectedTraditionId(traditionId);
    setInspectedNode(null);
    setSearchQuery("");
    const target =
      UNIFORM_TRADITION_TREES.find((t) => t.id === traditionId) ||
      UNIFORM_TRADITION_TREES[0];
    setExpandedIds(collectDefaultSimpleExpanded(target.root));
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
  };

  // Search filtering with automatic branch expansion
  const { visibleRoot, autoExpandIds, matchedIds } = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const expandSet = new Set<string>();
    const matchSet = new Set<string>();

    if (!q) {
      return {
        visibleRoot: currentTradition.root,
        autoExpandIds: expandSet,
        matchedIds: matchSet,
      };
    }

    const filterNode = (node: TraditionTreeNode): TraditionTreeNode | null => {
      const selfMatches =
        node.sanskritTitle.toLowerCase().includes(q) ||
        node.iastTitle.toLowerCase().includes(q) ||
        (node.author?.toLowerCase().includes(q) ?? false);

      const filteredChildren: TraditionTreeNode[] = [];
      if (node.children) {
        for (const child of node.children) {
          const fc = filterNode(child);
          if (fc) filteredChildren.push(fc);
        }
      }

      if (!selfMatches && filteredChildren.length === 0) {
        return null;
      }

      if (selfMatches) {
        matchSet.add(node.id);
      }

      if (filteredChildren.length > 0) {
        expandSet.add(node.id);
      }

      return {
        ...node,
        children: filteredChildren.length > 0 ? filteredChildren : undefined,
      };
    };

    const pruned = filterNode(currentTradition.root) || {
      ...currentTradition.root,
      children: [],
    };
    return { visibleRoot: pruned, autoExpandIds: expandSet, matchedIds: matchSet };
  }, [currentTradition.root, searchQuery]);

  const effectiveExpandedIds = useMemo(() => {
    if (!searchQuery.trim()) return expandedIds;
    const merged = new Set<string>(expandedIds);
    autoExpandIds.forEach((id) => merged.add(id));
    return merged;
  }, [expandedIds, autoExpandIds, searchQuery]);

  // Tidy horizontal dendrogram layout matching Advaita Sharada geometry
  const layout = useMemo(() => {
    const ROW_HEIGHT = 28;
    const PAD_X = 34;
    const PAD_Y = 28;
    const LINK_GAP = 64;

    interface TempNode {
      node: TraditionTreeNode;
      depth: number;
      parentId: string | null;
      y: number;
      hasChildren: boolean;
      isExpanded: boolean;
      isReadable: boolean;
      children: TempNode[];
    }

    let nextLeafIndex = 0;
    const allTempNodes: TempNode[] = [];
    const maxWidthByDepth = new Map<number, number>();

    const buildTemp = (
      node: TraditionTreeNode,
      depth: number,
      parentId: string | null
    ): TempNode => {
      const hasChildren = Boolean(node.children && node.children.length > 0);
      const isExpanded = hasChildren && effectiveExpandedIds.has(node.id);
      const isReadable = Boolean(node.granthaId && granthaMap.has(node.granthaId));

      const childTemps: TempNode[] = [];
      if (isExpanded && node.children) {
        for (const c of node.children) {
          childTemps.push(buildTemp(c, depth + 1, node.id));
        }
      }

      let y: number;
      if (childTemps.length === 0) {
        y = PAD_Y + nextLeafIndex * ROW_HEIGHT;
        nextLeafIndex += 1;
      } else {
        y = (childTemps[0].y + childTemps[childTemps.length - 1].y) / 2;
      }

      const displayTitle = transliterate(node.sanskritTitle, activeLipi);
      const estW = estimateLabelWidth(displayTitle);

      if (childTemps.length > 0) {
        const prev = maxWidthByDepth.get(depth) || 130;
        if (estW > prev) maxWidthByDepth.set(depth, estW);
      }

      const temp: TempNode = {
        node,
        depth,
        parentId,
        y,
        hasChildren,
        isExpanded,
        isReadable,
        children: childTemps,
      };
      allTempNodes.push(temp);
      return temp;
    };

    buildTemp(visibleRoot, 0, null);

    const columnX = new Map<number, number>();
    columnX.set(0, PAD_X);
    const maxDepth = allTempNodes.reduce((m, n) => Math.max(m, n.depth), 0);
    for (let d = 1; d <= maxDepth; d++) {
      const prevX = columnX.get(d - 1) || PAD_X;
      const prevW = maxWidthByDepth.get(d - 1) || 150;
      columnX.set(d, prevX + prevW + LINK_GAP);
    }

    const positionedNodes: PositionedNode[] = [];
    const nodeById = new Map<string, PositionedNode>();
    const edges: TreeEdge[] = [];
    let maxRightEdge = 760;

    for (const t of allTempNodes) {
      const x = columnX.get(t.depth) || PAD_X;
      const displayTitle = transliterate(t.node.sanskritTitle, activeLipi);
      const estW = estimateLabelWidth(displayTitle);
      if (x + estW + 40 > maxRightEdge) {
        maxRightEdge = x + estW + 40;
      }

      const pNode: PositionedNode = {
        node: t.node,
        depth: t.depth,
        x,
        y: t.y,
        parentId: t.parentId,
        hasChildren: t.hasChildren,
        isExpanded: t.isExpanded,
        isReadable: t.isReadable,
        isMatch: matchedIds.has(t.node.id),
      };
      positionedNodes.push(pNode);
      nodeById.set(t.node.id, pNode);
    }

    for (const p of positionedNodes) {
      if (p.parentId) {
        const parent = nodeById.get(p.parentId);
        if (parent) {
          edges.push({
            id: `${parent.node.id}->${p.node.id}`,
            sourceId: parent.node.id,
            targetId: p.node.id,
            x1: parent.x + 6,
            y1: parent.y,
            x2: p.x - 6,
            y2: p.y,
          });
        }
      }
    }

    const totalHeight = Math.max(
      460,
      PAD_Y * 2 + Math.max(1, nextLeafIndex - 1) * ROW_HEIGHT + 24
    );

    return {
      nodes: positionedNodes,
      nodeById,
      edges,
      width: maxRightEdge,
      height: totalHeight,
    };
  }, [visibleRoot, effectiveExpandedIds, granthaMap, activeLipi, transliterate, matchedIds]);

  const highlightedEdgeIds = useMemo(() => {
    const activeId = hoveredNodeId || inspectedNode?.id;
    const set = new Set<string>();
    if (!activeId) return set;
    let cursor = layout.nodeById.get(activeId);
    while (cursor && cursor.parentId) {
      set.add(`${cursor.parentId}->${cursor.node.id}`);
      cursor = layout.nodeById.get(cursor.parentId);
    }
    return set;
  }, [hoveredNodeId, inspectedNode, layout.nodeById]);

  const toggleExpand = (nodeId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    const all = new Set<string>();
    collectAllExpandable(currentTradition.root, all);
    setExpandedIds(all);
  };

  const handleCollapseBranches = () => {
    const minimal = new Set<string>([currentTradition.root.id]);
    currentTradition.root.children?.forEach((c) => minimal.add(c.id));
    setExpandedIds(minimal);
  };

  const handleReset = () => {
    setSearchQuery("");
    setZoom(1);
    setInspectedNode(null);
    setExpandedIds(collectDefaultSimpleExpanded(currentTradition.root));
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
  };

  // Drag-to-pan canvas
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: el.scrollLeft,
      scrollTop: el.scrollTop,
    };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      const el = scrollContainerRef.current;
      const start = dragStartRef.current;
      if (!el || !start) return;
      el.scrollLeft = start.scrollLeft - (e.clientX - start.x);
      el.scrollTop = start.scrollTop - (e.clientY - start.y);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-5 sm:py-7 space-y-4">
      {/* Clean Tradition Switcher & Minimal Toolbar */}
      <div className="bg-[#FFFFFF] border border-[#E4DBCC] rounded-xl px-4 py-3.5 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h1 className="font-serif font-bold text-lg sm:text-xl text-[#1F140A] tracking-tight">
              {transliterate("ग्रन्थ-पाठनम्", activeLipi)}{" "}
              <span className="text-[#735013] font-normal text-sm sm:text-base">
                · Grantha Pāṭhanam
              </span>
            </h1>
            <p className="text-xs text-[#6E5842] mt-0.5">
              Click any <span className="font-mono text-[#7A3E00]">○</span> node to expand or collapse branches. Click any scripture, bhāṣya, or ṭīkā title to open it in the reader.
            </p>
          </div>

          {/* Search & Tree Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8C6011] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter grantha or author..."
                className="w-44 sm:w-56 pl-8 pr-7 py-1.5 bg-[#FAF8F4] border border-[#DFD5C5] rounded-lg text-xs text-[#2D2319] placeholder-[#9C8A72] focus:outline-none focus:border-[#8C6011]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8C6011] hover:text-[#1F140A] cursor-pointer"
                  aria-label="Clear filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleExpandAll}
              className="px-2.5 py-1.5 rounded-lg text-xs font-serif text-[#4A3928] bg-[#FAF8F4] hover:bg-[#F3ECE0] border border-[#DFD5C5] transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
              title="Expand all branches"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#8C6011]" />
              <span>Expand All</span>
            </button>

            <button
              type="button"
              onClick={handleCollapseBranches}
              className="px-2.5 py-1.5 rounded-lg text-xs font-serif text-[#4A3928] bg-[#FAF8F4] hover:bg-[#F3ECE0] border border-[#DFD5C5] transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
              title="Collapse sub-branches"
            >
              <Minimize2 className="w-3.5 h-3.5 text-[#8C6011]" />
              <span>Collapse</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1.5 rounded-lg text-xs font-serif text-[#4A3928] bg-[#FAF8F4] hover:bg-[#F3ECE0] border border-[#DFD5C5] transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
              title="Reset view"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#8C6011]" />
              <span>Reset</span>
            </button>

            <div className="flex items-center border border-[#DFD5C5] rounded-lg bg-[#FAF8F4] px-1 py-0.5">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.75, Number((z - 0.1).toFixed(2))))}
                className="p-1 hover:bg-[#EFE7D8] rounded text-[#7A3E00] cursor-pointer"
                aria-label="Zoom out"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 text-[11px] font-mono tabular-nums text-[#2D2319] min-w-[40px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.25, Number((z + 0.1).toFixed(2))))}
                className="p-1 hover:bg-[#EFE7D8] rounded text-[#7A3E00] cursor-pointer"
                aria-label="Zoom in"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tradition Switcher (Same Canonical Skeleton across all Vedānta Traditions) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#EFE9DE]">
          {UNIFORM_TRADITION_TREES.map((trad) => {
            const isActive = trad.id === currentTradition.id;
            return (
              <button
                key={trad.id}
                type="button"
                onClick={() => handleSelectTradition(trad.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                  isActive
                    ? "bg-[#FAF1E2] text-[#7A3E00] border-[#8C6011] font-bold"
                    : "bg-[#FFFFFF] text-[#5C4731] border-[#E4DBCC] hover:bg-[#FAF8F4] hover:text-[#1F140A]"
                }`}
              >
                <span style={getTypographyStyle()}>
                  {transliterate(trad.sanskritLabel, activeLipi)}
                </span>
                <span className="ml-1.5 text-[11px] opacity-80 hidden sm:inline">
                  ({trad.label})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pure Advaita-Sharada Style Clean White Dendrogram Canvas */}
      <div className="bg-[#FFFFFF] border border-[#E4DBCC] rounded-xl overflow-hidden">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          className={`relative w-full overflow-auto bg-[#FFFFFF] min-h-[520px] max-h-[76vh] select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div
            style={{
              width: Math.ceil(layout.width * zoom),
              height: Math.ceil(layout.height * zoom),
              position: "relative",
            }}
          >
            <div
              style={{
                width: layout.width,
                height: layout.height,
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                position: "relative",
              }}
            >
              {/* Curved Horizontal Bezier Links */}
              <svg
                width={layout.width}
                height={layout.height}
                className="absolute inset-0 pointer-events-none"
              >
                {layout.edges.map((edge) => {
                  const isHighlighted = highlightedEdgeIds.has(edge.id);
                  const midX = (edge.x1 + edge.x2) / 2;
                  const d = `M ${edge.x1} ${edge.y1} C ${midX} ${edge.y1}, ${midX} ${edge.y2}, ${edge.x2} ${edge.y2}`;
                  return (
                    <path
                      key={edge.id}
                      d={d}
                      fill="none"
                      stroke={isHighlighted ? "#8C6011" : "#D0C6B6"}
                      strokeWidth={isHighlighted ? 1.75 : 1.15}
                      className="transition-colors duration-150"
                    />
                  );
                })}
              </svg>

              {/* Tree Nodes (Clean Circle + Indic Title) */}
              {layout.nodes.map((item) => {
                const { node, x, y, hasChildren, isExpanded, isReadable, isMatch } = item;
                const isHovered = hoveredNodeId === node.id;
                const displayTitle = transliterate(node.sanskritTitle, activeLipi);

                return (
                  <div
                    key={node.id}
                    style={{ left: x, top: y }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() =>
                      setHoveredNodeId((curr) => (curr === node.id ? null : curr))
                    }
                    className="absolute -translate-y-1/2 flex items-center gap-2 select-text"
                  >
                    {/* Hollow Circle Toggle / Action Node */}
                    <button
                      type="button"
                      onClick={() => {
                        if (hasChildren) {
                          toggleExpand(node.id);
                        } else if (isReadable) {
                          onOpenNode(node);
                        } else {
                          setInspectedNode(node);
                        }
                      }}
                      title={
                        hasChildren
                          ? `${isExpanded ? "Collapse" : "Expand"} ${node.iastTitle}`
                          : isReadable
                          ? `Read ${node.iastTitle}`
                          : node.iastTitle
                      }
                      aria-label={
                        hasChildren
                          ? `${isExpanded ? "Collapse" : "Expand"} ${node.iastTitle}`
                          : node.iastTitle
                      }
                      className={`relative -ml-[6px] w-[12px] h-[12px] rounded-full shrink-0 transition-transform duration-150 flex items-center justify-center cursor-pointer ${
                        isHovered ? "scale-125" : ""
                      } ${
                        hasChildren && !isExpanded
                          ? "border-[1.6px] border-[#6E5434] bg-[#EFE6D5]"
                          : "border-[1.5px] border-[#8A755B] bg-[#FFFFFF] hover:border-[#7A3E00]"
                      }`}
                    >
                      {hasChildren && !isExpanded && (
                        <span className="w-[4px] h-[4px] rounded-full bg-[#6E5434]" />
                      )}
                    </button>

                    {/* Clean Typography Label */}
                    <button
                      type="button"
                      onClick={() => {
                        if (isReadable) {
                          onOpenNode(node);
                        } else if (hasChildren) {
                          toggleExpand(node.id);
                        } else {
                          setInspectedNode(node);
                        }
                      }}
                      title={
                        isReadable
                          ? `Open ${node.iastTitle} in Reader${node.author ? ` · ${node.author}` : ""}`
                          : `${node.iastTitle}${node.author ? ` · ${node.author}` : ""}`
                      }
                      className={`text-left leading-tight whitespace-nowrap cursor-pointer rounded px-1 py-0.5 transition-colors ${
                        isMatch ? "bg-[#FEF3C7]" : ""
                      }`}
                    >
                      <span
                        className={`font-indic text-[13.5px] ${
                          isReadable
                            ? "text-[#1F140A] font-medium hover:text-[#7A3E00] hover:underline decoration-[#8C6011]/60 underline-offset-2"
                            : hasChildren
                            ? "text-[#2D2319] font-medium hover:text-[#7A3E00]"
                            : "text-[#4A3928] hover:text-[#1F140A]"
                        }`}
                        style={getTypographyStyle()}
                      >
                        {displayTitle}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quiet Single-Line Reference Strip (shown when a node is selected or hovered) */}
        <div className="px-4 py-2.5 border-t border-[#EFE9DE] bg-[#FAF8F4] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C4731]">
          {inspectedNode ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif font-bold text-[#1F140A]" style={getTypographyStyle()}>
                  {transliterate(inspectedNode.sanskritTitle, activeLipi)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="italic">{inspectedNode.iastTitle}</span>
                {inspectedNode.author && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{inspectedNode.author}</span>
                  </>
                )}
                {inspectedNode.century && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{inspectedNode.century}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#735013]">
                  Indexed in canonical syllabus (full text forthcoming)
                </span>
                <button
                  type="button"
                  onClick={() => setInspectedNode(null)}
                  className="text-[#8C6011] hover:text-[#1F140A] cursor-pointer"
                  aria-label="Dismiss selection"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#8C6011]" />
                <span>
                  <strong className="text-[#1F140A]">
                    {transliterate(currentTradition.sanskritLabel, activeLipi)}
                  </strong>{" "}
                  · Uniform 4-branch Grantha Pāṭhanam tree
                </span>
              </div>
              <span className="text-[11px] text-[#735013]">
                Drag canvas to pan · Click ○ to toggle branches · Click text title to read
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
