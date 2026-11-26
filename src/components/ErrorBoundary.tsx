import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || "An unexpected application error occurred.",
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      let friendlyDetail = this.state.message;
      try {
        const parsed = JSON.parse(this.state.message);
        if (parsed && parsed.error) {
          friendlyDetail = `${parsed.error} (${parsed.operationType || "operation"} on ${parsed.path || "resource"})`;
        }
      } catch {
        // Keep plain message
      }

      return (
        <div className="min-h-screen bg-[#FAF5ED] text-[#2D2319] flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#FFFDF9] border-2 border-[#C59B27] rounded-2xl p-6 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="font-serif font-bold text-xl text-[#2D2319]">
              Something went wrong
            </h2>
            <p className="text-sm text-[#5c4731] font-serif leading-relaxed break-words">
              {friendlyDetail}
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, message: "" });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#c59b27] text-[#120e0b] font-serif font-bold text-sm border border-[#ffe680] shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
