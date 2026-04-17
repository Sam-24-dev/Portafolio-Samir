import { Navigate, Route, Routes } from 'react-router-dom';
import PortfolioShell from './components/PortfolioShell';
import AnalystPage from './pages/AnalystPage';
import EngineeringPage from './pages/EngineeringPage';
import {
  analystAliasRoutes,
  engineeringAliasRoutes,
  engineeringLegacyAliasRoutes,
  resolveLegacyEngineeringPathname,
} from './lib/portfolioRoute';

function App() {
  return (
    <Routes>
      <Route element={<PortfolioShell />}>
        <Route index element={<AnalystPage />} />
        {analystAliasRoutes.map((path) => (
          <Route key={path} path={path.slice(1)} element={<AnalystPage />} />
        ))}
        <Route path="engineering" element={<EngineeringPage />} />
        {engineeringAliasRoutes.map((path) => (
          <Route key={path} path={path.slice(1)} element={<EngineeringPage />} />
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
