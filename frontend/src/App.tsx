// Plugins
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
// Components
import PageLayout from './components/layout/page-layout';
import Homepage from './pages/homepage';
import MatchMainPage from './pages/matchmakerMain/matchmakerIndex';
import ActiveMatchPage from './pages/matchRoom/activeMatchPage';
import { getMatchData } from './routeLoaders/getMatchData';
import { LoginForm } from './pages/signIgn/features/loginForm';
import { RegistrationForm } from './pages/signIgn/features/registerForm';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PageLayout />}>
      <Route path="/" element={<Homepage />} />
      <Route path="matchmaker" element={<MatchMainPage />} />
      <Route path="match" element={<ActiveMatchPage />} loader={getMatchData} />
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegistrationForm />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
