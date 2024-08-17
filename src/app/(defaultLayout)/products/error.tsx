"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleRefresh = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={this.handleRefresh}>Refresh Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// "use client";

// const ErrorBoundary = ({
//   error,
//   reset,
// }: {
//   error: Error;
//   reset: () => void;
// }) => {
//   return (
//     <div>
//       <h1>Error</h1>
//       <button onClick={reset}>Try again</button>
//     </div>
//   );
// };

// export default ErrorBoundary;
