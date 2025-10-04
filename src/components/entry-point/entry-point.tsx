import { lazy, Suspense } from 'react';
import {
  CustomViewShell,
  setupGlobalErrorListener,
} from '@commercetools-frontend/application-shell';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import loadMessages from '../../load-messages';

// Here we split up the main (app) bundle with the actual application business logic.
// Splitting by route is usually recommended and you can potentially have a splitting
// point for each route. More info at https://reactjs.org/docs/code-splitting.html
const AsyncApplicationRoutes = lazy(
  () => import('../../routes' /* webpackChunkName: "routes" */)
);

// Ensure to setup the global error listener before any React component renders
// in order to catch possible errors on rendering/mounting.
setupGlobalErrorListener();

const EntryPoint = () => {
  console.log('EntryPoint rendering');
  return (
    <CustomViewShell applicationMessages={loadMessages}>
      <Suspense fallback={<LoadingSpinner />}>
        <AsyncApplicationRoutes />
      </Suspense>
    </CustomViewShell>
  );
};

EntryPoint.displayName = 'EntryPoint';

export default EntryPoint;
