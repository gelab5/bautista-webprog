import './App.css';
import Layout from './components/Layout';
import AuthLayout from './layouts/AuthLayout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/articles', element: <ArticleListPage /> },
      { path: '/articles/:name', element: <ArticlePage /> },
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/signin', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
    ]
  }
]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;