export const ErrorBoundary = ({ error }: { error?: unknown }) => {
  console.log('ErrorBoundary', error)
  let message = 'Something went wrong';
  if (error instanceof Error) message = error.message;

  return (
    <div>
      <h1>Error!</h1>
      <p>{message}</p>
    </div>
  );
};