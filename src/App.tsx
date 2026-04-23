import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PortfolioShell from './components/PortfolioShell';
import {
  analystAliasRoutes,
  engineeringAliasRoutes,
  engineeringLegacyAliasRoutes,
  resolveLegacyEngineeringPathname,
} from './lib/portfolioRoute';

const AnalystPage = lazy(() => import('./pages/AnalystPage'));
const EngineeringPage = lazy(() => import('./pages/EngineeringPage'));

const RouteFallback = () => <div aria-hidden="true" className="min-h-[40vh]" />;

function App() {
  return (
    <Routes>
      <Route element={<PortfolioShell />}>
        <Route
          index
          element={
            <Suspense fallback={<RouteFallback />}>
              <AnalystPage />
            </Suspense>
          }
        />
        {analystAliasRoutes.map((path) => (
          <Route
            key={path}
            path={path.slice(1)}
            element={
              <Suspense fallback={<RouteFallback />}>
                <AnalystPage />
              </Suspense>
            }
          />
        ))}
        <Route
          path="engineering"
          element={
            <Suspense fallback={<RouteFallback />}>
              <EngineeringPage />
            </Suspense>
          }
        />
        {engineeringAliasRoutes.map((path) => (
          <Route
            key={path}
            path={path.slice(1)}
            element={
              <Suspense fallback={<RouteFallback />}>
                <EngineeringPage />
              </Suspense>
            }
          />
        ))}
        {engineeringLegacyAliasRoutes.map((path) => {
          const redirectPath = resolveLegacyEngineeringPathname(path);

          if (!redirectPath) {
            return null;
          }

          return <Route key={path} path={path.slice(1)} element={<Navigate to={redirectPath} replace />} />;
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
