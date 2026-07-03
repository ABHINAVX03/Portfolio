"use client";

import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary — catches React component errors and displays fallback UI
 * instead of crashing the entire application.
 * 
 * Next.js 13+ App Router: Use error.tsx files instead for route-level boundaries.
 * This is for component-level errors (individual sections).
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error tracking service (Sentry, LogRocket, etc.)
    console.error("Component Error:", error, errorInfo);
    
    // TODO: Send to error tracking service
    // captureException(error, { contexts: { react: errorInfo } });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
            padding: "40px 24px",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "24px",
              fontWeight: 700,
              color: "#f8fafc",
              margin: 0,
            }}
          >
            Something went wrong
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              maxWidth: "400px",
            }}
          >
            We encountered an unexpected error. Please refresh the page or contact support if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "16px",
              padding: "10px 24px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              border: "none",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
