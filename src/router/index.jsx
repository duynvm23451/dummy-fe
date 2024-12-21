import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { tokenLoader } from "../services/authenicationService";
import CoursesPage from "../pages/CoursesPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import FavoritedLessonPage from "../pages/FavoritedLessonPage";
import NotePage from "../pages/NotePage";
import TestPage from "../pages/TestPage";
import TestDetailPage from "../pages/TestDetailPage";
import TestAttempsPage from "../pages/TestAttempsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <CoursesPage />,
      },
      {
        path: "courses/:id",
        element: <CourseDetailPage />,
      },
      {
        path: "favorites",
        element: <FavoritedLessonPage />,
      },
      {
        path: "notes",
        element: <NotePage />,
      },
      {
        path: "tests",
        element: <TestPage />,
      },
      {
        path: "tests/:id",
        element: <TestDetailPage />,
      },
      //test-attempts
      {
        path: "test-attempts",
        element: <TestAttempsPage />,
      },
    ],
  },
]);

export default router;
