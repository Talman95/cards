import { ComponentType, Suspense } from 'react';

import { Loader } from '../components/Loader/Loader';

export function withSuspense(Component: ComponentType) {
  return () => (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}
