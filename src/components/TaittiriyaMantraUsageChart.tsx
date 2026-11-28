import { useState, useMemo, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart as PieChartIcon,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ExternalLink,
  ChevronsDownUp,
  ChevronsUpDown,
} from "lucide-react";
import {
  GRANTHA_ULLEKHA_DATASETS,
  getTaittiriyaMantraUsageAcrossCorpus,
  getTaittiriyaUsageInUpanisadBhashyas,
  CorpusTaittiriyaUsageItem,
  UpanisadBhashyaTaittiriyaSummaryItem,
  UllekhaSourceCategory,
} from "../taittiriyaUsageAnalyticsData";
import { useBharatiyaLipi } from "../context/BharatiyaLipiContext";

interface TaittiriyaMantraUsageChartProps {
  activeGranthaId?: string;
  onOpenGrantha?: (granthaId: string) => void;
  compactCollapsible?: boolean;
  defaultOpen?: boolean;
  defaultView?: "corpus_usage" | "bhashya_ullekhas";
}

interface CustomTooltipPayloadItem {
  name?: string;
  value?: number;
  payload?: {
    displayName: string;
    sanskritName?: string;
    count: number;
    percentageDisplay: string;
    color: string;
    subtitle?: string;
  };
}

function ArchivalPieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: CustomTooltipPayloadItem[];
}) {
  if (!active || !payload || payload.length === 0 || !payload[0].payload) {
    return null;
  }
  const d = payload[0].payload;
  return (
    <div className="bg-[#FFFDF8] border border-[#bf953f]/60 shadow-lg px-3 py-2 rounded-lg text-xs text-[#2D2319] max-w-[240px]">
      <div className="flex items-center gap-2 font-bold text-[#2D2319]">
        <span
          className="w-2.5 h-2.5 shrink-0 inline-block rounded-xs"
          style={{ backgroundColor: d.color }}
        />
        <span className="font-serif truncate">{d.displayName}</span>
      </div>
      {d.sanskritName && d.sanskritName !== d.displayName && (
        <div className="text-[11px] text-[#735013] font-serif mt-0.5 truncate">
          {d.sanskritName}
        </div>
      )}
      <div className="mt-1 pt-1 border-t border-[#bf953f]/25 flex items-center justify-between gap-4 font-mono tabular-nums text-[11px]">
        <span className="text-[#5c4731]">{d.subtitle || "Citations"}:</span>
        <span className="font-bold text-[#8c6011]">
          {d.count} ({d.percentageDisplay})
        </span>
      </div>
    </div>
  );
}

export default function TaittiriyaMantraUsageChart({
  activeGranthaId,
  onOpenGrantha,
  compactCollapsible = false,
  defaultOpen = true,
  defaultView,
}: TaittiriyaMantraUsageChartProps) {
  const { activeLipi, transliterate } = useBharatiyaLipi();

  const matchingDatasetId = useMemo(() => {
    if (
      activeGranthaId &&
      GRANTHA_ULLEKHA_DATASETS.some((d) => d.granthaId === activeGranthaId)
    ) {
      return activeGranthaId;
    }
    return "taittiriyopanisad";
  }, [activeGranthaId]);

  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [activeTab, setActiveTab] = useState<"corpus_usage" | "bhashya_ullekhas">(
    defaultView ||
      (activeGranthaId && activeGranthaId !== "taittiriyopanisad"
        ? "bhashya_ullekhas"
        : "corpus_usage")
  );
  const [corpusMode, setCorpusMode] = useState<"full_corpus" | "bhashya_summary">(
    "full_corpus"
  );

  const [selectedUllekhaGranthaId, setSelectedUllekhaGranthaId] =
    useState<string>(matchingDatasetId);

  useEffect(() => {
    setSelectedUllekhaGranthaId(matchingDatasetId);
    if (defaultView) {
      setActiveTab(defaultView);
    }
  }, [matchingDatasetId, defaultView]);

  const corpusUsage = useMemo(() => getTaittiriyaMantraUsageAcrossCorpus(), []);
  const bhashyaSummary = useMemo(() => getTaittiriyaUsageInUpanisadBhashyas(), []);

  const [selectedCorpusGranthaId, setSelectedCorpusGranthaId] = useState<string>(
    () => corpusUsage[0]?.granthaId || ""
  );
  const [selectedBhashyaId, setSelectedBhashyaId] = useState<string>(
    "taittiriyopanisad"
  );

  const activeUllekhaDataset = useMemo(() => {
    return (
      GRANTHA_ULLEKHA_DATASETS.find(
        (d) => d.granthaId === selectedUllekhaGranthaId
      ) || GRANTHA_ULLEKHA_DATASETS[0]
    );
  }, [selectedUllekhaGranthaId]);

  const [selectedSourceName, setSelectedSourceName] = useState<string | null>(
    null
  );
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>(
    () => ({
      तैत्तिरीयोपनिषत्: true,
    })
  );

  useEffect(() => {
    // Default expand Taittirīya if present, otherwise first category
    const hasTaittiriya = activeUllekhaDataset.categories.some(
      (c) => c.sourceName === "तैत्तिरीयोपनिषत्"
    );
    const defaultSource = hasTaittiriya
      ? "तैत्तिरीयोपनिषत्"
      : activeUllekhaDataset.categories[0]?.sourceName || null;
    setSelectedSourceName(defaultSource);
    setExpandedSources(defaultSource ? { [defaultSource]: true } : {});
  }, [activeUllekhaDataset]);

  // Derived Corpus chart & detail data
  const corpusGrandTotal = useMemo(
    () => corpusUsage.reduce((acc, item) => acc + item.totalHits, 0),
    [corpusUsage]
  );

  const selectedCorpusItem: CorpusTaittiriyaUsageItem | undefined = useMemo(
    () =>
      corpusUsage.find((c) => c.granthaId === selectedCorpusGranthaId) ||
      corpusUsage[0],
    [corpusUsage, selectedCorpusGranthaId]
  );

  const corpusPieData = useMemo(() => {
    return corpusUsage.map((item) => ({
      id: item.granthaId,
      name: item.granthaTitle,
      displayName: item.granthaTitle,
      sanskritName: transliterate(item.granthaSanskrit, activeLipi),
      count: item.totalHits,
      percentageDisplay: `${item.percentage}%`,
      color: item.color,
      subtitle: "Taittirīya Mantra Hits",
    }));
  }, [corpusUsage, activeLipi, transliterate]);

  // Derived Upaniṣad-Bhāṣya Taittirīya citation data (nonzero slices for pie)
  const bhashyaTotalTaittiriyaHits = useMemo(
    () => bhashyaSummary.reduce((acc, b) => acc + b.taittiriyaCount, 0),
    [bhashyaSummary]
  );

  const bhashyaPieData = useMemo(() => {
    const total = bhashyaTotalTaittiriyaHits || 1;
    return bhashyaSummary
      .filter((b) => b.taittiriyaCount > 0)
      .map((b) => ({
        id: b.granthaId,
        name: b.granthaTitle,
        displayName: b.granthaTitle,
        sanskritName: transliterate(b.granthaSanskrit, activeLipi),
        count: b.taittiriyaCount,
        percentageDisplay: `${Math.round((b.taittiriyaCount / total) * 100)}%`,
        color: b.color,
        subtitle: "Taittirīya Citations",
      }));
  }, [bhashyaSummary, bhashyaTotalTaittiriyaHits, activeLipi, transliterate]);

  const selectedBhashyaItem: UpanisadBhashyaTaittiriyaSummaryItem | undefined =
    useMemo(
      () =>
        bhashyaSummary.find((b) => b.granthaId === selectedBhashyaId) ||
        bhashyaSummary[0],
      [bhashyaSummary, selectedBhashyaId]
    );

  // Derived Ullekhāḥ chart data for active Bhāṣya
  const ullekhaPieData = useMemo(() => {
    return activeUllekhaDataset.categories.map((cat) => ({
      id: cat.sourceName,
      name: transliterate(cat.sourceName, activeLipi),
      displayName: transliterate(cat.sourceName, activeLipi),
      sanskritName: cat.sourceName,
      count: cat.count,
      percentageDisplay: cat.percentageLabel || `${cat.percentage}%`,
      color: cat.color,
      subtitle: "उल्लेखाः",
    }));
  }, [activeUllekhaDataset, activeLipi, transliterate]);

  const allExpanded = useMemo(() => {
    return (
      activeUllekhaDataset.categories.length > 0 &&
      activeUllekhaDataset.categories.every((c) => expandedSources[c.sourceName])
    );
  }, [activeUllekhaDataset, expandedSources]);

  const toggleAllSources = () => {
    const nextState = !allExpanded;
    const map: Record<string, boolean> = {};
    for (const c of activeUllekhaDataset.categories) {
      map[c.sourceName] = nextState;
    }
    setExpandedSources(map);
  };

  const handleToggleSingleSource = (sourceName: string) => {
    setSelectedSourceName(sourceName);
    setExpandedSources((prev) => ({
      ...prev,
      [sourceName]: !prev[sourceName],
    }));
  };

  return (
    <section
      aria-label="Taittirīya Mantra Cross-Reference & Ullekhāḥ Concordance"
      className="bg-[#FFFDF8] border border-[#bf953f]/35 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Editorial Section Header */}
      <div className="px-4 sm:px-5 py-3.5 bg-[#FAF5ED] border-b border-[#bf953f]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-[#8c6011] text-[#FFFDF8] shrink-0 mt-0.5">
            <PieChartIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#2D2319]">
                Taittirīya Mantra Citation Concordance &amp; Śāstra Ullekhāḥ
              </h3>
              <span className="text-xs font-serif text-[#8c6011]">
                · {transliterate("तैत्तिरीय-मन्त्र-उल्लेख-सारणी", activeLipi)}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#5c4731] mt-0.5">
              Distribution of Taittirīya Upaniṣad mantras across Vedānta Śāstras and comparative Upaniṣad-Bhāṣya citation breakdown.
            </p>
          </div>
        </div>

        {compactCollapsible && (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg border border-[#bf953f]/40 bg-[#FFFDF8] hover:bg-[#f3e5ce] text-[#735013] text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
          >
            {isOpen ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Hide Chart</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Show Pie Chart ({activeUllekhaDataset.totalCount} उल्लेखाः)</span>
              </>
            )}
          </button>
        )}
      </div>

      {(!compactCollapsible || isOpen) && (
        <div className="p-4 sm:p-5 space-y-5">
          {/* Primary View Mode Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#bf953f]/25 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("corpus_usage")}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition cursor-pointer border ${
                  activeTab === "corpus_usage"
                    ? "bg-[#8c6011] text-[#FFFDF8] border-[#735013] shadow-xs"
                    : "bg-[#FAF5ED] text-[#5c4731] border-[#bf953f]/30 hover:bg-[#f3e5ce]"
                }`}
              >
                Taittirīya in Vedānta Śāstras ({corpusGrandTotal} Corpus Hits)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bhashya_ullekhas")}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition cursor-pointer border ${
                  activeTab === "bhashya_ullekhas"
                    ? "bg-[#8c6011] text-[#FFFDF8] border-[#735013] shadow-xs"
                    : "bg-[#FAF5ED] text-[#5c4731] border-[#bf953f]/30 hover:bg-[#f3e5ce]"
                }`}
              >
                Śāstra Ullekhāḥ Concordance (7 Upaniṣad Bhāṣyas)
              </button>
            </div>

            {activeTab === "corpus_usage" && (
              <div className="flex items-center gap-1.5 bg-[#FAF5ED] p-1 rounded-lg border border-[#bf953f]/30">
                <button
                  type="button"
                  onClick={() => setCorpusMode("full_corpus")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition cursor-pointer ${
                    corpusMode === "full_corpus"
                      ? "bg-[#FFFDF8] text-[#2D2319] border border-[#bf953f]/40 shadow-2xs"
                      : "text-[#6e5842] hover:text-[#2D2319]"
                  }`}
                >
                  Full Vedānta Corpus ({corpusUsage.length} Works)
                </button>
                <button
                  type="button"
                  onClick={() => setCorpusMode("bhashya_summary")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition cursor-pointer ${
                    corpusMode === "bhashya_summary"
                      ? "bg-[#FFFDF8] text-[#2D2319] border border-[#bf953f]/40 shadow-2xs"
                      : "text-[#6e5842] hover:text-[#2D2319]"
                  }`}
                >
                  Śāṅkara Bhāṣya Ullekhāḥ ({bhashyaTotalTaittiriyaHits} Refs)
                </button>
              </div>
            )}
          </div>

          {/* VIEW 1: TAITTIRIYA MANTRAS ACROSS VEDANTA SASTRAS */}
          {activeTab === "corpus_usage" && (
            <div className="space-y-5">
              {corpusMode === "full_corpus" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Left: Donut Chart */}
                  <div className="lg:col-span-5 bg-[#FAF5ED]/70 border border-[#bf953f]/25 rounded-xl p-4 flex flex-col items-center">
                    <div className="w-full flex items-baseline justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8c6011]">
                        Corpus Distribution
                      </span>
                      <span className="text-xs font-mono tabular-nums text-[#5c4731]">
                        {corpusGrandTotal} mantra hits · {corpusUsage.length} śāstras
                      </span>
                    </div>

                    <div className="relative w-full h-[290px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={corpusPieData}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={62}
                            outerRadius={106}
                            paddingAngle={2}
                            stroke="#FFFDF8"
                            strokeWidth={2}
                            onClick={(_, index) => {
                              const target = corpusPieData[index];
                              if (target?.id) setSelectedCorpusGranthaId(target.id);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {corpusPieData.map((entry) => {
                              const isSelected =
                                entry.id === selectedCorpusItem?.granthaId;
                              return (
                                <Cell
                                  key={entry.id}
                                  fill={entry.color}
                                  opacity={
                                    selectedCorpusItem && !isSelected ? 0.72 : 1
                                  }
                                />
                              );
                            })}
                          </Pie>
                          <Tooltip content={<ArchivalPieTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>

                      {/* Center Summary Readout */}
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <span className="text-2xl font-serif font-bold text-[#2D2319] tabular-nums leading-none">
                          {corpusGrandTotal}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8c6011] mt-1">
                          Mantra Hits
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#6e5842] text-center mt-1">
                      Click any chart segment or treatise row to inspect exact Taittirīya mantras cited.
                    </p>
                  </div>

                  {/* Right: Tabular Breakdown + Mantra Detail */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="border border-[#bf953f]/25 rounded-xl overflow-hidden bg-[#FFFDF8]">
                      <div className="px-3.5 py-2 bg-[#FAF5ED] border-b border-[#bf953f]/25 grid grid-cols-12 text-[10px] font-mono font-bold uppercase tracking-wider text-[#735013]">
                        <span className="col-span-7">Vedānta Śāstra</span>
                        <span className="col-span-3 text-right">Occurrences</span>
                        <span className="col-span-2 text-right">Share</span>
                      </div>
                      <div className="max-h-[220px] overflow-y-auto divide-y divide-[#bf953f]/15">
                        {corpusUsage.map((item) => {
                          const isSelected =
                            item.granthaId === selectedCorpusItem?.granthaId;
                          return (
                            <button
                              key={item.granthaId}
                              type="button"
                              onClick={() =>
                                setSelectedCorpusGranthaId(item.granthaId)
                              }
                              className={`w-full px-3.5 py-2 grid grid-cols-12 items-center text-left transition cursor-pointer ${
                                isSelected
                                  ? "bg-[#f3e5ce]/75 text-[#2D2319]"
                                  : "hover:bg-[#FAF5ED] text-[#2D2319]"
                              }`}
                            >
                              <div className="col-span-7 flex items-center gap-2 pr-2 min-w-0">
                                <span
                                  className="w-2.5 h-2.5 rounded-xs shrink-0"
                                  style={{ backgroundColor: item.color }}
                                />
                                <div className="min-w-0">
                                  <div className="text-xs font-serif font-bold truncate">
                                    {item.granthaTitle}
                                  </div>
                                  <div className="text-[10px] text-[#735013] truncate">
                                    {item.school}
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-3 text-right font-mono text-xs font-bold tabular-nums text-[#2D2319]">
                                {item.totalHits}
                              </div>
                              <div className="col-span-2 text-right font-mono text-xs tabular-nums text-[#8c6011]">
                                {item.percentage}%
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Selected Work Mantra Breakdown */}
                    {selectedCorpusItem && (
                      <div className="p-4 rounded-xl bg-[#FAF5ED]/80 border border-[#bf953f]/35 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#bf953f]/25 pb-2.5">
                          <div>
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8c6011]">
                              Taittirīya Mantras Cited in Selected Text
                            </div>
                            <h4 className="font-serif font-bold text-sm text-[#2D2319] mt-0.5">
                              {selectedCorpusItem.granthaTitle} ·{" "}
                              <span className="font-mono tabular-nums text-[#8c6011]">
                                {selectedCorpusItem.totalHits} hits (
                                {selectedCorpusItem.percentage}%)
                              </span>
                            </h4>
                          </div>

                          {onOpenGrantha && (
                            <button
                              type="button"
                              onClick={() =>
                                onOpenGrantha(selectedCorpusItem.granthaId)
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#8c6011] hover:bg-[#735013] text-[#FFFDF8] text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Open in Reader</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedCorpusItem.mantraBreakdown.map((m) => (
                            <div
                              key={m.phrase}
                              className="p-2.5 rounded-lg bg-[#FFFDF8] border border-[#bf953f]/25 flex items-start justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <div className="font-serif text-sm font-bold text-[#2D2319] leading-snug">
                                  {transliterate(m.phrase, activeLipi)}
                                </div>
                                <div className="text-[11px] text-[#6e5842] mt-0.5">
                                  Tai. Up. {m.ref} · {m.label}
                                </div>
                              </div>
                              <span className="font-mono text-xs font-bold tabular-nums text-[#8c6011] shrink-0">
                                ×{m.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* SUB-MODE B: SHANKARA UPANISHAD BHASHYA TAITTIRIYA SUMMARY */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  <div className="lg:col-span-5 bg-[#FAF5ED]/70 border border-[#bf953f]/25 rounded-xl p-4 flex flex-col items-center">
                    <div className="w-full flex items-baseline justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8c6011]">
                        Śāṅkara Bhāṣya Concordance
                      </span>
                      <span className="text-xs font-mono tabular-nums text-[#5c4731]">
                        {bhashyaTotalTaittiriyaHits} Taittirīya citations
                      </span>
                    </div>

                    <div className="relative w-full h-[290px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={bhashyaPieData}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={62}
                            outerRadius={106}
                            paddingAngle={2}
                            stroke="#FFFDF8"
                            strokeWidth={2}
                            onClick={(_, index) => {
                              const target = bhashyaPieData[index];
                              if (target?.id) setSelectedBhashyaId(target.id);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {bhashyaPieData.map((entry) => (
                              <Cell
                                key={entry.id}
                                fill={entry.color}
                                opacity={
                                  selectedBhashyaItem &&
                                  entry.id !== selectedBhashyaItem.granthaId
                                    ? 0.7
                                    : 1
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<ArchivalPieTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <span className="text-2xl font-serif font-bold text-[#2D2319] tabular-nums leading-none">
                          {bhashyaTotalTaittiriyaHits}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8c6011] mt-1">
                          Tai. Citations
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#6e5842] text-center mt-1">
                      Taittirīya Upaniṣad quotations indexed across the 7 Śāṅkara Upaniṣad-Bhāṣyas.
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div className="border border-[#bf953f]/25 rounded-xl overflow-hidden bg-[#FFFDF8]">
                      <div className="px-3.5 py-2 bg-[#FAF5ED] border-b border-[#bf953f]/25 grid grid-cols-12 text-[10px] font-mono font-bold uppercase tracking-wider text-[#735013]">
                        <span className="col-span-6">Upaniṣad-Bhāṣya</span>
                        <span className="col-span-3 text-right">Tai. / Total</span>
                        <span className="col-span-3 text-right">Share in Bhāṣya</span>
                      </div>
                      <div className="divide-y divide-[#bf953f]/15">
                        {bhashyaSummary.map((b) => {
                          const isSelected =
                            b.granthaId === selectedBhashyaItem?.granthaId;
                          return (
                            <button
                              key={b.granthaId}
                              type="button"
                              onClick={() => setSelectedBhashyaId(b.granthaId)}
                              className={`w-full px-3.5 py-2 grid grid-cols-12 items-center text-left transition cursor-pointer ${
                                isSelected
                                  ? "bg-[#f3e5ce]/75 text-[#2D2319]"
                                  : "hover:bg-[#FAF5ED] text-[#2D2319]"
                              }`}
                            >
                              <div className="col-span-6 flex items-center gap-2 pr-2 min-w-0">
                                <span
                                  className="w-2.5 h-2.5 rounded-xs shrink-0"
                                  style={{ backgroundColor: b.color }}
                                />
                                <div className="min-w-0">
                                  <div className="text-xs font-serif font-bold truncate">
                                    {b.granthaTitle}
                                  </div>
                                  <div className="text-[10px] text-[#735013] truncate">
                                    {transliterate(b.granthaSanskrit, activeLipi)}
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-3 text-right font-mono text-xs tabular-nums text-[#2D2319]">
                                <strong className="text-[#8c6011]">
                                  {b.taittiriyaCount}
                                </strong>{" "}
                                / {b.totalUllekhas}
                              </div>
                              <div className="col-span-3 text-right font-mono text-xs tabular-nums text-[#5c4731]">
                                {b.percentageOfTotal}%
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedBhashyaItem && (
                      <div className="p-4 rounded-xl bg-[#FAF5ED]/80 border border-[#bf953f]/35 space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#bf953f]/25 pb-2">
                          <div>
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8c6011]">
                              Verbatim Taittirīya Quotations in{" "}
                              {selectedBhashyaItem.granthaTitle}
                            </div>
                            <div className="text-xs text-[#5c4731] font-mono tabular-nums mt-0.5">
                              {selectedBhashyaItem.taittiriyaCount} of{" "}
                              {selectedBhashyaItem.totalUllekhas} total citations (
                              {selectedBhashyaItem.percentageOfTotal}%)
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedUllekhaGranthaId(
                                  selectedBhashyaItem.granthaId
                                );
                                setActiveTab("bhashya_ullekhas");
                              }}
                              className="px-2.5 py-1 rounded-lg border border-[#bf953f]/40 bg-[#FFFDF8] hover:bg-[#f3e5ce] text-[#735013] text-[11px] font-mono font-bold transition cursor-pointer"
                            >
                              View Full Ullekhāḥ Pie
                            </button>
                            {onOpenGrantha && (
                              <button
                                type="button"
                                onClick={() =>
                                  onOpenGrantha(selectedBhashyaItem.granthaId)
                                }
                                className="px-2.5 py-1 rounded-lg bg-[#8c6011] hover:bg-[#735013] text-[#FFFDF8] text-[11px] font-mono font-bold flex items-center gap-1 transition cursor-pointer"
                              >
                                <span>Open Reader</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>

                        {selectedBhashyaItem.quotes.length === 0 ? (
                          <p className="text-xs text-[#6e5842] italic py-2">
                            No direct Taittirīya Upaniṣad quotations are recorded in the Ullekhāḥ index for {selectedBhashyaItem.granthaTitle}.
                          </p>
                        ) : (
                          <ul className="max-h-[200px] overflow-y-auto space-y-1.5 pr-1">
                            {selectedBhashyaItem.quotes.map((q, idx) => (
                              <li
                                key={`${selectedBhashyaItem.granthaId}-q-${idx}`}
                                className="text-xs sm:text-sm font-serif text-[#2D2319] bg-[#FFFDF8] border border-[#bf953f]/20 rounded-lg px-3 py-1.5 flex items-baseline gap-2"
                              >
                                <span className="font-mono text-[10px] tabular-nums text-[#8c6011] shrink-0">
                                  {idx + 1}.
                                </span>
                                <span>{transliterate(q, activeLipi)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: SASTRA ULLEKHAH CONCORDANCE (ALL 7 BHASYAS) */}
          {activeTab === "bhashya_ullekhas" && (
            <div className="space-y-5">
              {/* Bhāṣya Switcher Bar */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8c6011]">
                  Select Upaniṣad-Bhāṣya Ullekhāḥ Dataset:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {GRANTHA_ULLEKHA_DATASETS.map((ds) => {
                    const isSelected = ds.granthaId === activeUllekhaDataset.granthaId;
                    return (
                      <button
                        key={ds.granthaId}
                        type="button"
                        onClick={() => setSelectedUllekhaGranthaId(ds.granthaId)}
                        className={`px-3 py-1.5 rounded-lg border text-xs transition cursor-pointer flex items-baseline gap-1.5 ${
                          isSelected
                            ? "bg-[#8c6011] text-[#FFFDF8] border-[#735013] font-bold shadow-xs"
                            : "bg-[#FAF5ED] text-[#2D2319] border-[#bf953f]/30 hover:bg-[#f3e5ce]"
                        }`}
                      >
                        <span className="font-serif">
                          {transliterate(ds.granthaSanskrit, activeLipi)}
                        </span>
                        <span
                          className={`font-mono text-[11px] tabular-nums ${
                            isSelected ? "text-[#fcf6ba]" : "text-[#8c6011]"
                          }`}
                        >
                          · {ds.totalCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pie Chart + Interactive Source Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left: Pie Chart */}
                <div className="lg:col-span-5 bg-[#FAF5ED]/70 border border-[#bf953f]/25 rounded-xl p-4 flex flex-col items-center">
                  <div className="w-full flex items-baseline justify-between mb-1">
                    <span className="font-serif font-bold text-sm text-[#2D2319]">
                      {activeUllekhaDataset.granthaTitle}
                    </span>
                    <span className="font-mono text-xs font-bold tabular-nums text-[#8c6011]">
                      {activeUllekhaDataset.totalCount}{" "}
                      {transliterate("उल्लेखाः", activeLipi)}
                    </span>
                  </div>

                  <div className="relative w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ullekhaPieData}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={64}
                          outerRadius={110}
                          paddingAngle={1.5}
                          stroke="#FFFDF8"
                          strokeWidth={2}
                          onClick={(_, index) => {
                            const target = ullekhaPieData[index];
                            if (target?.id) {
                              setSelectedSourceName(target.id);
                              setExpandedSources((prev) => ({
                                ...prev,
                                [target.id]: true,
                              }));
                            }
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {ullekhaPieData.map((entry) => {
                            const isSelected =
                              entry.id === selectedSourceName;
                            return (
                              <Cell
                                key={entry.id}
                                fill={entry.color}
                                opacity={
                                  selectedSourceName && !isSelected ? 0.68 : 1
                                }
                              />
                            );
                          })}
                        </Pie>
                        <Tooltip content={<ArchivalPieTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Center Label */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                      <span className="text-3xl font-serif font-bold text-[#2D2319] tabular-nums leading-none">
                        {activeUllekhaDataset.totalCount}
                      </span>
                      <span className="text-xs font-serif text-[#8c6011] mt-1">
                        {transliterate("उल्लेखाः", activeLipi)}
                      </span>
                    </div>
                  </div>

                  {onOpenGrantha && (
                    <button
                      type="button"
                      onClick={() => onOpenGrantha(activeUllekhaDataset.granthaId)}
                      className="mt-2 px-3 py-1.5 rounded-lg border border-[#bf953f]/40 bg-[#FFFDF8] hover:bg-[#f3e5ce] text-[#735013] text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open {activeUllekhaDataset.granthaTitle} in Reader</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Right: Clean Tabular Source Legend */}
                <div className="lg:col-span-7 border border-[#bf953f]/25 rounded-xl overflow-hidden bg-[#FFFDF8]">
                  <div className="px-3.5 py-2.5 bg-[#FAF5ED] border-b border-[#bf953f]/25 grid grid-cols-12 text-[10px] font-mono font-bold uppercase tracking-wider text-[#735013]">
                    <span className="col-span-7">
                      Cited Source Śāstra ({activeUllekhaDataset.categories.length})
                    </span>
                    <span className="col-span-3 text-right">
                      {transliterate("उल्लेखाः", activeLipi)}
                    </span>
                    <span className="col-span-2 text-right">Share</span>
                  </div>

                  <div className="divide-y divide-[#bf953f]/15">
                    {activeUllekhaDataset.categories.map((cat) => {
                      const isSelected = cat.sourceName === selectedSourceName;
                      const isTaittiriya = cat.sourceName === "तैत्तिरीयोपनिषत्";
                      return (
                        <button
                          key={cat.sourceName}
                          type="button"
                          onClick={() => handleToggleSingleSource(cat.sourceName)}
                          className={`w-full px-3.5 py-2.5 grid grid-cols-12 items-center text-left transition cursor-pointer ${
                            isSelected
                              ? "bg-[#f3e5ce]/75"
                              : isTaittiriya
                              ? "bg-[#FAF5ED]/70 hover:bg-[#f3e5ce]/50"
                              : "hover:bg-[#FAF5ED]"
                          }`}
                        >
                          <div className="col-span-7 flex items-center gap-2.5 pr-2 min-w-0">
                            <span
                              className="w-3 h-3 rounded-xs shrink-0"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span
                              className={`text-xs sm:text-sm font-serif truncate ${
                                isTaittiriya
                                  ? "font-bold text-[#8c6011]"
                                  : "font-medium text-[#2D2319]"
                              }`}
                            >
                              {transliterate(cat.sourceName, activeLipi)}
                            </span>
                          </div>
                          <div className="col-span-3 text-right font-mono text-xs font-bold tabular-nums text-[#2D2319]">
                            {cat.count}
                          </div>
                          <div className="col-span-2 text-right font-mono text-xs tabular-nums text-[#735013]">
                            {cat.percentageLabel || `${cat.percentage}%`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Verbatim Quote Accordion Section */}
              <div className="border border-[#bf953f]/30 rounded-xl bg-[#FAF5ED]/50 overflow-hidden">
                <div className="px-4 py-3 bg-[#FAF5ED] border-b border-[#bf953f]/25 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#2D2319]">
                      {transliterate("उद्धृत-मन्त्र-वाक्यानि", activeLipi)} · Verbatim Cited Passages
                    </h4>
                    <p className="text-[11px] text-[#6e5842]">
                      Expand any source treatise below to inspect all {activeUllekhaDataset.totalCount} quoted passages from {activeUllekhaDataset.granthaTitle}.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={toggleAllSources}
                    className="px-3 py-1.5 rounded-lg border border-[#bf953f]/40 bg-[#FFFDF8] hover:bg-[#f3e5ce] text-[#735013] text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {allExpanded ? (
                      <>
                        <ChevronsDownUp className="w-3.5 h-3.5" />
                        <span>{transliterate("सर्वं सङ्कोच्यताम्", activeLipi)}</span>
                      </>
                    ) : (
                      <>
                        <ChevronsUpDown className="w-3.5 h-3.5" />
                        <span>{transliterate("सर्वं विस्तार्यताम्", activeLipi)}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="divide-y divide-[#bf953f]/20">
                  {activeUllekhaDataset.categories.map((cat: UllekhaSourceCategory) => {
                    const isExpanded = !!expandedSources[cat.sourceName];
                    const isTaittiriya = cat.sourceName === "तैत्तिरीयोपनिषत्";
                    return (
                      <div key={cat.sourceName} className="bg-[#FFFDF8]">
                        <button
                          type="button"
                          onClick={() => handleToggleSingleSource(cat.sourceName)}
                          className={`w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left transition cursor-pointer ${
                            isExpanded
                              ? "bg-[#FAF5ED]"
                              : "hover:bg-[#FAF5ED]/60"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className="w-2.5 h-2.5 rounded-xs shrink-0"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span
                              className={`font-serif text-sm truncate ${
                                isTaittiriya
                                  ? "font-bold text-[#8c6011]"
                                  : "font-bold text-[#2D2319]"
                              }`}
                            >
                              {transliterate(cat.sourceName, activeLipi)}
                            </span>
                            <span className="font-mono text-xs tabular-nums text-[#735013]">
                              · {cat.count} ({cat.percentageLabel || `${cat.percentage}%`})
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#8c6011] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#735013] shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-4 py-3 bg-[#FFFDF8] border-t border-[#bf953f]/15">
                            <ol className="space-y-1.5">
                              {cat.quotes.map((quote, qIdx) => (
                                <li
                                  key={`${cat.sourceName}-${qIdx}`}
                                  className="text-xs sm:text-sm font-serif text-[#2D2319] leading-relaxed flex items-baseline gap-2.5 px-2.5 py-1.5 rounded-lg bg-[#FAF5ED]/55 border border-[#bf953f]/15"
                                >
                                  <span className="font-mono text-[10px] tabular-nums text-[#8c6011] shrink-0 w-5 text-right">
                                    {qIdx + 1}.
                                  </span>
                                  <span className="select-text">
                                    {transliterate(quote, activeLipi)}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
