import React, { useMemo, useState, useRef, useEffect } from "react";
import { PRESEEDED_GRANTHAS } from "../data";
import { TextEntry, TabType } from "../types";
import {
  VEDANTA_TRADITION_TREE,
  TRADITION_BRANCH_FILTERS,
  TraditionTreeNode,
} from "../traditionTreeData";
import { useBharatiyaLipi } from "../context/BharatiyaLipiContext";
import {
  Search,
  BookOpen,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  CheckCircle2,
  Filter,
  Languages,
  X,
  Scale,
} from "lucide-react";

interface TraditionDendrogramTreeProps {
  onOpenGrantha: (granthaId: string, chapterId?: string) => void;
  onNavigateToTab?: (tab: TabType, payload?: any) => void;
}

interface PositionedNode {
  node: TraditionTreeNode;
  depth: number;
  x: number;
  y: number;
  parentId: string | null;
  hasChildren: boolean;
  isExpanded: boolean;
  isDigitized: boolean;
  grantha?: TextEntry;
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

function collectDefaultExpanded(node: TraditionTreeNode, out: Set<string>) {
  if (node.defaultExpanded) {
    out.add(node.id);
  }
  node.children?.forEach((child) => collectDefaultExpanded(child, out));
}

function collectAllExpandable(node: TraditionTreeNode, out: Set<string>) {
  if (node.children && node.children.length > 0) {
    out.add(node.id);
    node.children.forEach((child) => collectAllExpandable(child, out));
  }
}

function findNodeById(node: TraditionTreeNode, id: string): TraditionTreeNode | null {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

function countUniqueDigitizedGranthas(
  node: TraditionTreeNode,
  granthaMap: Map<string, TextEntry>,
  seen = new Set<string>()
): number {
  if (node.granthaId && granthaMap.has(node.granthaId)) {
    seen.add(node.granthaId);
  }
  node.children?.forEach((c) => countUniqueDigitizedGranthas(c, granthaMap, seen));
  return seen.size;
}

function estimateLabelWidth(
  sanskritText: string,
  subtitleText: string | undefined,
  showSubtitles: boolean,
  isDigitized: boolean
): number {
  const mainLen = sanskritText.length * 7.8 + (isDigitized ? 26 : 12);
  const subLen = showSubtitles && subtitleText ? subtitleText.length * 5.6 : 0;
  return Math.min(360, Math.max(125, Math.max(mainLen, subLen) + 24));
}

export default function TraditionDendrogramTree({
  onOpenGrantha,
  onNavigateToTab,
}: TraditionDendrogramTreeProps) {
  const { transliterate, activeLipi, getTypographyStyle } = useBharatiyaLipi();

  const granthaMap = useMemo(() => {
    const map = new Map<string, TextEntry>();
    PRESEEDED_GRANTHAS.forEach((g) => map.set(g.id, g));
    return map;
  }, []);

  const [selectedScopeId, setSelectedScopeId] = useState<string>("all");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    collectDefaultExpanded(VEDANTA_TRADITION_TREE, initial);
    return initial;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyAvailableOnSite, setOnlyAvailableOnSite] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [zoom, setZoom] = useState<number>(1);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedRefNode, setSelectedRefNode] = useState<TraditionTreeNode | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number } | null>(null);

  // Scoped root node based on selected tradition filter
  const scopedRoot = useMemo(() => {
    const filter = TRADITION_BRANCH_FILTERS.find((f) => f.id === selectedScopeId);
    if (!filter || filter.nodeId === VEDANTA_TRADITION_TREE.id) {
      return VEDANTA_TRADITION_TREE;
    }
    return findNodeById(VEDANTA_TRADITION_TREE, filter.nodeId) || VEDANTA_TRADITION_TREE;
  }, [selectedScopeId]);

  const totalLiveTextsInScope = useMemo(
    () => countUniqueDigitizedGranthas(scopedRoot, granthaMap),
    [scopedRoot, granthaMap]
  );

  // When switching tradition scope, expand its root and first level cleanly
  const handleSelectScope = (scopeId: string) => {
    setSelectedScopeId(scopeId);
    setSelectedRefNode(null);
    if (scopeId === "all") {
      const next = new Set<string>();
      collectDefaultExpanded(VEDANTA_TRADITION_TREE, next);
      setExpandedIds(next);
    } else {
      const filter = TRADITION_BRANCH_FILTERS.find((f) => f.id === scopeId);
      const target = filter ? findNodeById(VEDANTA_TRADITION_TREE, filter.nodeId) : null;
      if (target) {
        const next = new Set<string>([target.id]);
        collectDefaultExpanded(target, next);
        target.children?.forEach((child) => {
          if (child.children && child.children.length > 0) {
            next.add(child.id);
          }
        });
        setExpandedIds(next);
      }
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
  };

  // Filter tree cleanly when "onlyAvailableOnSite" or "searchQuery" is active
  const { visibleRoot, autoExpandIds, matchedIds } = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const expandSet = new Set<string>();
    const matchSet = new Set<string>();

    const filterNode = (node: TraditionTreeNode): TraditionTreeNode | null => {
      const hasLiveSelf = Boolean(node.granthaId && granthaMap.has(node.granthaId));
      const selfMatchesSearch =
        !q ||
        node.sanskritTitle.toLowerCase().includes(q) ||
        node.iastTitle.toLowerCase().includes(q) ||
        (node.englishSubtitle?.toLowerCase().includes(q) ?? false) ||
        (node.author?.toLowerCase().includes(q) ?? false) ||
        (node.granthaId?.toLowerCase().includes(q) ?? false);

      const filteredChildren: TraditionTreeNode[] = [];
      if (node.children) {
        for (const child of node.children) {
          const fc = filterNode(child);
          if (fc) filteredChildren.push(fc);
        }
      }

      if (onlyAvailableOnSite && !hasLiveSelf && filteredChildren.length === 0) {
        return null;
      }

      if (q && !selfMatchesSearch && filteredChildren.length === 0) {
        return null;
      }

      if (q && selfMatchesSearch) {
        matchSet.add(node.id);
      }

      if ((q || onlyAvailableOnSite) && filteredChildren.length > 0) {
        expandSet.add(node.id);
      }

      return {
        ...node,
        children: filteredChildren.length > 0 ? filteredChildren : undefined,
      };
    };

    const pruned = filterNode(scopedRoot) || { ...scopedRoot, children: [] };
    return { visibleRoot: pruned, autoExpandIds: expandSet, matchedIds: matchSet };
  }, [scopedRoot, searchQuery, onlyAvailableOnSite, granthaMap]);

  const effectiveExpandedIds = useMemo(() => {
    if (!searchQuery.trim() && !onlyAvailableOnSite) {
      return expandedIds;
    }
    const merged = new Set<string>(expandedIds);
    autoExpandIds.forEach((id) => merged.add(id));
    return merged;
  }, [expandedIds, autoExpandIds, searchQuery, onlyAvailableOnSite]);

  // Compute tidy dendrogram layout (Reingold-Tilford style leaf spacing + dynamic depth column X)
  const layout = useMemo(() => {
    const ROW_HEIGHT = showSubtitles ? 46 : 33;
    const PAD_X = 36;
    const PAD_Y = 32;
    const LINK_GAP = 68;

    interface TempNode {
      node: TraditionTreeNode;
      depth: number;
      parentId: string | null;
      y: number;
      hasChildren: boolean;
      isExpanded: boolean;
      isDigitized: boolean;
      grantha?: TextEntry;
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
      const grantha = node.granthaId ? granthaMap.get(node.granthaId) : undefined;
      const isDigitized = Boolean(grantha);

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
      const subText = node.englishSubtitle || node.iastTitle;
      const estW = estimateLabelWidth(displayTitle, subText, showSubtitles, isDigitized);

      // Only expanded parents need horizontal column clearance before their children
      if (childTemps.length > 0) {
        const prev = maxWidthByDepth.get(depth) || 140;
        if (estW > prev) maxWidthByDepth.set(depth, estW);
      }

      const temp: TempNode = {
        node,
        depth,
        parentId,
        y,
        hasChildren,
        isExpanded,
        isDigitized,
        grantha,
        children: childTemps,
      };
      allTempNodes.push(temp);
      return temp;
    };

    buildTemp(visibleRoot, 0, null);

    // Compute exact column X for each depth
    const columnX = new Map<number, number>();
    columnX.set(0, PAD_X);
    const maxDepth = allTempNodes.reduce((m, n) => Math.max(m, n.depth), 0);
    for (let d = 1; d <= maxDepth; d++) {
      const prevX = columnX.get(d - 1) || PAD_X;
      const prevW = maxWidthByDepth.get(d - 1) || 160;
      columnX.set(d, prevX + prevW + LINK_GAP);
    }

    const positionedNodes: PositionedNode[] = [];
    const nodeById = new Map<string, PositionedNode>();
    const edges: TreeEdge[] = [];

    let maxRightEdge = 760;

    for (const t of allTempNodes) {
      const x = columnX.get(t.depth) || PAD_X;
      const displayTitle = transliterate(t.node.sanskritTitle, activeLipi);
      const estW = estimateLabelWidth(
        displayTitle,
        t.node.englishSubtitle || t.node.iastTitle,
        showSubtitles,
        t.isDigitized
      );
      if (x + estW + 48 > maxRightEdge) {
        maxRightEdge = x + estW + 48;
      }

      const pNode: PositionedNode = {
        node: t.node,
        depth: t.depth,
        x,
        y: t.y,
        parentId: t.parentId,
        hasChildren: t.hasChildren,
        isExpanded: t.isExpanded,
        isDigitized: t.isDigitized,
        grantha: t.grantha,
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
            x1: parent.x + 8,
            y1: parent.y,
            x2: p.x - 8,
            y2: p.y,
          });
        }
      }
    }

    const totalHeight = Math.max(420, PAD_Y * 2 + Math.max(1, nextLeafIndex - 1) * ROW_HEIGHT + 24);
    return {
      nodes: positionedNodes,
      nodeById,
      edges,
      width: maxRightEdge,
      height: totalHeight,
    };
  }, [visibleRoot, effectiveExpandedIds, granthaMap, showSubtitles, activeLipi, transliterate, matchedIds]);

  // Trace active ancestor edge IDs for hover highlight
  const highlightedEdgeIds = useMemo(() => {
    const activeId = hoveredNodeId || selectedRefNode?.id;
    const set = new Set<string>();
    if (!activeId) return set;
    let cursor = layout.nodeById.get(activeId);
    while (cursor && cursor.parentId) {
      set.add(`${cursor.parentId}->${cursor.node.id}`);
      cursor = layout.nodeById.get(cursor.parentId);
    }
    return set;
  }, [hoveredNodeId, selectedRefNode, layout.nodeById]);

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
    collectAllExpandable(scopedRoot, all);
    setExpandedIds(all);
  };

  const handleCollapseAll = () => {
    setExpandedIds(new Set<string>([scopedRoot.id]));
  };

  const handleResetDefault = () => {
    setSearchQuery("");
    setOnlyAvailableOnSite(false);
    setZoom(1);
    handleSelectScope(selectedScopeId);
  };

  const activeInspectorNode: PositionedNode | undefined = useMemo(() => {
    const targetId = hoveredNodeId || selectedRefNode?.id;
    return targetId ? layout.nodeById.get(targetId) : undefined;
  }, [hoveredNodeId, selectedRefNode, layout.nodeById]);

  // Smooth drag-to-pan on empty canvas space
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
    <div className="bg-[#FFFDF9] rounded-2xl border border-[#bf953f]/40 shadow-[0_8px_30px_rgba(140,96,17,0.08)] overflow-hidden">
      {/* Top Curatorial Control Bar */}
      <div className="p-4 sm:p-5 border-b border-[#bf953f]/25 bg-gradient-to-b from-[#FAF5ED] to-[#FFFDF9] space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#8c6011]">
              {transliterate("अद्वैतादि-सकल-वेदान्त-वाङ्मय-वृक्षः", activeLipi)} • Interactive Dendrogram
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2D2319] mt-0.5">
              Vedānta Grantha &amp; Sampradāya Tree
            </h3>
            <p className="text-xs text-[#5c4731] mt-0.5">
              Click any circular node (<span className="font-mono text-[#8c6011]">○</span>) to expand or collapse branches. Click any highlighted Grantha title to open that exact text in the reader.
            </p>
          </div>

          {/* Utility Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setOnlyAvailableOnSite(!onlyAvailableOnSite)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-serif font-bold border transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                onlyAvailableOnSite
                  ? "bg-[#14532D] text-white border-[#14532D] shadow-xs"
                  : "bg-white hover:bg-[#FAF1E2] text-[#2D2319] border-[#bf953f]/35"
              }`}
              title="Show only branches leading to texts currently digitized on the site"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Available on Site ({totalLiveTextsInScope})</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-serif font-bold border transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                showSubtitles
                  ? "bg-[#8c6011] text-white border-[#8c6011]"
                  : "bg-white hover:bg-[#FAF1E2] text-[#5c4731] border-[#bf953f]/35"
              }`}
              title="Toggle IAST / English titles beside Devanāgarī"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>IAST / English</span>
            </button>

            <button
              type="button"
              onClick={handleExpandAll}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white hover:bg-[#FAF1E2] text-[#5c4731] border border-[#bf953f]/35 transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
              title="Expand all branches in the current scope"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#8c6011]" />
              <span>Expand All</span>
            </button>

            <button
              type="button"
              onClick={handleCollapseAll}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white hover:bg-[#FAF1E2] text-[#5c4731] border border-[#bf953f]/35 transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
              title="Collapse all branches back to the root"
            >
              <Minimize2 className="w-3.5 h-3.5 text-[#8c6011]" />
              <span>Collapse</span>
            </button>

            <button
              type="button"
              onClick={handleResetDefault}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white hover:bg-[#FAF1E2] text-[#5c4731] border border-[#bf953f]/35 transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
              title="Reset tree filters and zoom"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#8c6011]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Tradition Scope Selector */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {TRADITION_BRANCH_FILTERS.map((trad) => {
            const isSelected = selectedScopeId === trad.id;
            return (
              <button
                key={trad.id}
                type="button"
                onClick={() => handleSelectScope(trad.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-serif transition cursor-pointer whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? "bg-[#FAF1E2] text-[#7A3E00] border-[#8c6011] font-bold shadow-2xs"
                    : "bg-white/80 hover:bg-[#FAF5ED] text-[#5c4731] border-[#bf953f]/25"
                }`}
              >
                {trad.label}
              </button>
            );
          })}
        </div>

        {/* Search & Zoom Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-[#8c6011] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any Grantha, Bhāṣya, Upaniṣad, or Ācārya (e.g. माण्डूक्य, Bhāmatī, Śrībhāṣya, Tattvabodha)..."
              className="w-full bg-white border border-[#bf953f]/35 rounded-lg pl-9 pr-8 py-1.5 text-xs text-[#2D2319] placeholder-[#9c8266] focus:outline-none focus:ring-1 focus:ring-[#8c6011]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c6011] hover:text-[#2D2319] cursor-pointer"
                aria-label="Clear tree search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] font-mono text-[#6e5842]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-[#14532D] bg-[#ECFDF5] inline-block" />
                <span className="text-[#14532D] font-semibold">Live on Site (Click Title)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-[#8c6011] bg-[#FAF1E2] inline-block" />
                <span>Branch (Click ○)</span>
              </span>
            </div>

            <div className="flex items-center gap-1 border border-[#bf953f]/30 rounded-lg bg-white px-1 py-0.5">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.1).toFixed(2))))}
                className="p-1 hover:bg-[#FAF1E2] rounded text-[#8c6011] cursor-pointer"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 text-[11px] font-mono text-[#2D2319] min-w-[42px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.3, Number((z + 0.1).toFixed(2))))}
                className="p-1 hover:bg-[#FAF1E2] rounded text-[#8c6011] cursor-pointer"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dendrogram Archival Canvas */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        className={`relative w-full overflow-auto bg-[#FFFDF9] min-h-[500px] max-h-[72vh] select-none ${
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
            {/* SVG Cubic Bezier Connectors */}
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
                    stroke={isHighlighted ? "#9A3412" : "#D3C2A8"}
                    strokeWidth={isHighlighted ? 2 : 1.25}
                    className="transition-colors duration-150"
                  />
                );
              })}
            </svg>

            {/* Interactive Nodes */}
            {layout.nodes.map((item) => {
              const { node, x, y, hasChildren, isExpanded, isDigitized, isMatch } = item;
              const isHovered = hoveredNodeId === node.id;
              const displaySanskrit = transliterate(node.sanskritTitle, activeLipi);
              const subLabel = node.englishSubtitle || node.iastTitle;

              return (
                <div
                  key={node.id}
                  style={{ left: x, top: y }}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId((curr) => (curr === node.id ? null : curr))}
                  className="absolute -translate-y-1/2 flex items-center gap-2 select-text"
                >
                  {/* Circle Node Button (Expand/Collapse or Inspect) */}
                  <button
                    type="button"
                    onClick={() => {
                      if (hasChildren) {
                        toggleExpand(node.id);
                      } else if (isDigitized && node.granthaId) {
                        onOpenGrantha(node.granthaId, node.chapterId);
                      } else {
                        setSelectedRefNode(node);
                      }
                    }}
                    title={
                      hasChildren
                        ? isExpanded
                          ? `Collapse ${node.iastTitle}`
                          : `Expand ${node.iastTitle} (${node.children?.length || 0})`
                        : isDigitized
                        ? `Open ${node.iastTitle} in Reader`
                        : node.iastTitle
                    }
                    aria-label={
                      hasChildren
                        ? `${isExpanded ? "Collapse" : "Expand"} ${node.iastTitle}`
                        : node.iastTitle
                    }
                    className={`relative -ml-[7px] w-[14px] h-[14px] rounded-full shrink-0 transition-transform duration-150 flex items-center justify-center cursor-pointer ${
                      isHovered ? "scale-125" : ""
                    } ${
                      isDigitized
                        ? "border-2 border-[#14532D] bg-[#ECFDF5] hover:bg-[#D1FAE5]"
                        : hasChildren
                        ? isExpanded
                          ? "border-[1.8px] border-[#8c6011] bg-[#FFFDF9] hover:bg-[#FAF1E2]"
                          : "border-2 border-[#8c6011] bg-[#F3E3C3] hover:bg-[#ebd1a1]"
                        : "border-[1.5px] border-[#9C8A72] bg-[#FFFDF9] hover:border-[#8c6011]"
                    }`}
                  >
                    {hasChildren && !isExpanded && (
                      <span className="w-[4px] h-[4px] rounded-full bg-[#8c6011]" />
                    )}
                    {!hasChildren && isDigitized && (
                      <span className="w-[4px] h-[4px] rounded-full bg-[#14532D]" />
                    )}
                  </button>

                  {/* Title Label Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isDigitized && node.granthaId) {
                        onOpenGrantha(node.granthaId, node.chapterId);
                      } else if (hasChildren) {
                        toggleExpand(node.id);
                      } else {
                        setSelectedRefNode(node);
                      }
                    }}
                    className={`group text-left leading-tight transition-colors cursor-pointer rounded px-1 py-0.5 ${
                      isMatch ? "bg-[#FEF3C7] ring-1 ring-[#D97706]/50" : ""
                    }`}
                    title={
                      isDigitized
                        ? `${node.iastTitle}${node.readerNote ? ` — ${node.readerNote}` : ""} (Click to read text)`
                        : hasChildren
                        ? `${node.iastTitle} (Click to ${isExpanded ? "collapse" : "expand"})`
                        : `${node.iastTitle}${node.author ? ` — ${node.author}` : ""}`
                    }
                  >
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span
                        className={`font-indic text-[14px] ${
                          isDigitized
                            ? "font-semibold text-[#14532D] group-hover:text-[#0F3D21] group-hover:underline decoration-[#14532D]/60 underline-offset-2"
                            : hasChildren
                            ? "font-semibold text-[#2D2319] group-hover:text-[#7A3E00]"
                            : "text-[#5c4731] group-hover:text-[#2D2319]"
                        }`}
                        style={getTypographyStyle()}
                      >
                        {displaySanskrit}
                      </span>

                      {isDigitized && (
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#14532D] opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      )}

                      {hasChildren && !isExpanded && (
                        <span className="text-[10px] font-mono text-[#8c6011] opacity-80">
                          ({node.children?.length})
                        </span>
                      )}
                    </div>

                    {showSubtitles && subLabel && (
                      <div className="text-[11px] font-serif text-[#6e5842] whitespace-nowrap">
                        {subLabel}
                        {node.author ? ` • ${node.author}` : ""}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Clean Curatorial Footer / Inspector Strip */}
      <div className="px-4 py-3 border-t border-[#bf953f]/25 bg-[#FAF5ED] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        {activeInspectorNode ? (
          <>
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <span
                className="font-indic font-bold text-sm text-[#2D2319]"
                style={getTypographyStyle()}
              >
                {transliterate(activeInspectorNode.node.sanskritTitle, activeLipi)}
              </span>
              <span className="text-[#6e5842] font-serif">
                ({activeInspectorNode.node.iastTitle})
              </span>
              {activeInspectorNode.node.author && (
                <span className="text-[#8c6011] font-mono text-[11px]">
                  • {activeInspectorNode.node.author}
                  {activeInspectorNode.node.century ? ` (${activeInspectorNode.node.century})` : ""}
                </span>
              )}
              {activeInspectorNode.node.readerNote && (
                <span className="text-[#5c4731] italic">
                  — {activeInspectorNode.node.readerNote}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeInspectorNode.isDigitized && activeInspectorNode.node.granthaId ? (
                <button
                  type="button"
                  onClick={() =>
                    onOpenGrantha(
                      activeInspectorNode.node.granthaId!,
                      activeInspectorNode.node.chapterId
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#14532D] hover:bg-[#0F3D21] text-white font-serif font-bold text-xs flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open in Reader</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#6e5842]">
                    {activeInspectorNode.hasChildren
                      ? "Branch node — click circle to toggle"
                      : "Canonical reference (not yet digitized)"}
                  </span>
                  {!activeInspectorNode.hasChildren && onNavigateToTab && (
                    <button
                      type="button"
                      onClick={() =>
                        onNavigateToTab("sastrartha", {
                          prompt: `Provide a scholarly summary of "${activeInspectorNode.node.iastTitle}"${
                            activeInspectorNode.node.author
                              ? ` by ${activeInspectorNode.node.author}`
                              : ""
                          } within Vedānta.`,
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#FAF1E2] border border-[#bf953f]/40 text-[#8c6011] font-serif font-bold text-xs flex items-center gap-1 transition cursor-pointer whitespace-nowrap"
                    >
                      <Scale className="w-3 h-3" />
                      <span>Ask Śāstrārtha</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-wrap items-center justify-between w-full gap-2 text-[#6e5842]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#14532D]" />
              <span>
                <strong className="text-[#14532D]">{totalLiveTextsInScope}</strong> texts in this view link directly to the site reader. Drag canvas to pan.
              </span>
            </span>
            <span className="font-mono text-[11px] text-[#8c6011]">
              Hover any node for details • Click ○ to expand/collapse
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
