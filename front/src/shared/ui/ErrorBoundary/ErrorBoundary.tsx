/**
 * React Router *error element* — intended for use as the `errorElement` prop
 * in the router config, **not** as a JSX wrapper around components.
 *
 * React Router renders this component in place of the entire route subtree
 * when a route (or any of its descendant routes that have no own `errorElement`)
 * throws during rendering or data loading. The thrown value is read via the
 * `useRouteError()` hook, which only works in this router-managed context.
 *
 * **Difference from `InlineErrorBoundary`:** Because this relies on
 * `useRouteError()`, it cannot be used as a plain JSX wrapper. When placed as
 * `errorElement` on a parent route, it replaces the *full layout* (nav, sidebar)
 * on error. To keep the layout intact and catch errors only inside a page, use
 * `InlineErrorBoundary` instead.
 *
 * @example
 * // router.tsx
 * { path: '/', element: <MainLayout />, errorElement: <ErrorBoundary /> }
 */
import { useRouteError } from 'react-router';

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.log('ErrorBoundary', error)
  let message = 'Something went wrong';
  if (error instanceof Error) message = error.message;
  else if (typeof error === 'string') message = error;

  return (
    <div>
      <h1>Error!</h1>
      <p>{message}</p>
    </div>
  );
};