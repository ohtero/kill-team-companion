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
import MatchMainPage from './pages/matchmakerIndex.tsx';
import NewMatchCreation from './pages/new-match-creation.tsx';
import MatchMainSelection from './pages/match-main-selection.tsx';
import ActiveMatchPage from './pages/matchRoom/activeMatchMain.tsx';
import { getMatchData } from './routeLoaders/getMatchData.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PageLayout />}>
      <Route path="/" element={<Homepage />} />
      <Route path="matchmaker" element={<MatchMainPage />}>
        <Route path="new" element={<NewMatchCreation />} />
        <Route index element={<MatchMainSelection />} />
      </Route>
      <Route path="match" element={<ActiveMatchPage />} loader={getMatchData} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

/**
 * /home
 * /match
 * /match/new
 * /match/join
 * match/active/?Id=1234
 */
