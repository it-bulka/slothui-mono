import { Component, type ReactNode } from 'react';
import { VStack } from '../Stack/VStack/VStack';
import { HStack } from '../Stack/HStack/HStack';
import { Typography } from '../Typography/Typography';
import { TypographyTypes } from '../Typography/typography.types';
import { Button } from '../Button/Button';
import { getHomePage } from '@/shared/config/routeConfig/routeConfig';

interface State {
  hasError: boolean;
  message: string;
}

/**
 * React class-based error boundary for wrapping arbitrary JSX subtrees.
 *
 * **Use this** when you want to catch render-time errors in a specific part of
 * the UI (e.g. a page content area) while keeping the surrounding layout —
 * navbar, sidebar, etc. — fully intact. On error it renders an inline fallback
 * with recovery actions instead of unmounting the failed subtree.
 *
 * **Difference from `ErrorBoundary`:** `ErrorBoundary` is a React Router
 * *error element* (`errorElement` prop in router config) that reads the thrown
 * value via `useRouteError()`. It replaces the *entire route subtree* and can
 * only be used inside the router config — it cannot wrap JSX directly.
 * `InlineErrorBoundary` uses the standard React lifecycle
 * (`getDerivedStateFromError`) and can wrap any JSX tree as a regular component.
 *
 * @example
 * // Wrap page content so the layout survives a render crash
 * <InlineErrorBoundary>
 *   <Outlet />
 * </InlineErrorBoundary>
 */
export class InlineErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <VStack align="center" justify="center" gap="20" className="p-8 min-h-52">
          <VStack align="center" gap="10">
            <Typography variant="h3" type={TypographyTypes.BLOCK_TITLE} color="error">
              Something went wrong
            </Typography>
            <Typography type={TypographyTypes.P_SM} color="secondary">
              {this.state.message}
            </Typography>
          </VStack>
          <HStack gap="10" justify="center">
            <Button variant="secondary" onClick={() => window.history.back()}>
              Go back
            </Button>
            <Button variant="secondary" onClick={() => { window.location.href = getHomePage() }}>
              Home
            </Button>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Refresh page
            </Button>
          </HStack>
        </VStack>
      );
    }
    return this.props.children;
  }
}
