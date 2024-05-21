// Plugins
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
// Components
import PageLayout from './components/layout/page-layout.tsx';
import Homepage from './pages/homepage.tsx';
import MatchMainPage from './pages/matchmakerMain/matchmakerIndex.tsx';
import ActiveMatchPage from './pages/matchRoom/activeMatchPage.tsx';
import { getMatchData } from './routeLoaders/getMatchData.ts';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PageLayout />}>
      <Route path="/" element={<Homepage />} />
      <Route path="matchmaker" element={<MatchMainPage />} />
      <Route path="match" element={<ActiveMatchPage />} loader={getMatchData} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
