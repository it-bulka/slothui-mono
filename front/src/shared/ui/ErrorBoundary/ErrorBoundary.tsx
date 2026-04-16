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