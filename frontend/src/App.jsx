import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import DashboardComponent from "./components/Dashboard/DashboardComponent";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from "./pages/NotFoundPage";
import CodeEditor from "./pages/CodeEditor";
import ErrorPage from "./pages/ErrorPage";
import SkeletonComponent from "./components/Skeleton/Skeleton";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import { useFetchUser } from "./hooks/useFetchUser";

function App() {
  const { isAuthenticated, isLoading } = useFetchUser();

  if (isLoading) {
    return <SkeletonComponent />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-black overflow-x-hidden scroll-smooth relative">
        <Routes>
          {
            isAuthenticated ? (
              <Route path="/" element={<Dashboard />}>
                <Route path="/" element={<DashboardComponent />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<MyProfile />} />
              </Route>
            ) : (
              <Route path="/" element={<Home />} />
            )
          }
          {!isAuthenticated && <Route path="/auth" element={<Auth />} />}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/room" element={<CodeEditor />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
