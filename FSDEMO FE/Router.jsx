import { createBrowserRouter } from "react-router";
import App from "./src/App";
import Home from "./src/pages/Home";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";
import authLoader from "./loaders/unit/authLoader";
import Logout from "./src/pages/Logout";
import CandidateDashboard from "./src/pages/user/CandidateDashboard";
import eventsLoader from "./loaders/unit/eventsLoader";
import eventLoader from "./loaders/unit/eventLoader";
import CandidateProfile from "./src/pages/user/CandidateProfile";
import MyApplications from "./src/pages/user/MyApplications";
import registerEventLoader from "./loaders/unit/registerEventLoader";
import OrgDashboard from "./src/pages/organiser/OrgDashboard";
import OrgManageReg from "./src/pages/organiser/OrgManageReg";
import OrgCreate from "./src/pages/organiser/OrgCreate";
import OrgProfile from "./src/pages/organiser/OrgProfile";
import organiserLoader from "./loaders/unit/organiserLoader";
import AdDashboard from "./src/pages/admin/AdDashboard";
import adminLoader from "./loaders/unit/adminLoader";
import AdCreateOrganiser from "./src/pages/admin/AdCreateOrganiser";
import PaymentPage from "./src/pages/PaymentPage";
import PaymentSuccess from "./src/pages/PaymentSuccess";
import MyTickets from "./src/pages/user/MyTickets";
import AdminTickets from "./src/pages/admin/AdminTickets";
import TicketLoader from "./loaders/unit/TicketLoader";
import BookTickets from "./src/pages/BookTickets";
import RegVerification from "./src/pages/RegVerification";
const routes = [
  {
    path: "/",
    element: <App />,
    loader: authLoader,
    children: [
      {
        path: "/",
        element: <Home />,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "register",
        element: <Register />,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "register-verification",
        element: <RegVerification />,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "login",
        element: <Login />,
        loader: authLoader,
        hydrateFallBackElement: <p>loading....</p>,
      },
      // {
      //   path: "forgot-password",
      //   element: <RequestPasswordReset />,
      //   hydrateFallBackElement: <p>loading....</p>,
      // },
      // {
      //   path: "reset-password",
      //   element: <ResetPassword />,
      //   hydrateFallBackElement: <p>loading....</p>,
      // },
      {
        path: "logout",
        element: <Logout />,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/candidate",
        children: [
          {
            path: "dashboard",
            element: <CandidateDashboard />,
            loader: eventsLoader,
            hydrateFallBackElement: <p>loading....</p>,
          },
          {
            path: "dashboard/:id",
            element: <CandidateDashboard />,
            loader: eventLoader,
            hydrateFallBackElement: <p>loading....</p>,
          },
          {
            path: "profile",
            element: <CandidateProfile />,
            loader: authLoader,
            hydrateFallBackElement: <p>loading....</p>,
          },
          {
            path: "applications",
            element: <MyApplications />,
            loader: registerEventLoader,
            hydrateFallBackElement: <p>loading....</p>,
          },
        ],
      },
      {
        path: "/book-ticket/:eventId",
        element: <BookTickets />,
        loader: eventLoader,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/payment/:id/:selectedTicket",
        element: <PaymentPage />,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/my-tickets/:userId", // :userId as a dynamic parameter
        element: <MyTickets />,
        loader: TicketLoader,
        hydrateFallBackElement: <p>loading....</p>,
      },

      ,
      {
        path: "/organiser/dashboard",
        element: <OrgDashboard />,
        loader: organiserLoader.viewAll,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/organiser/manage-registrations",
        element: <OrgManageReg />,
        loader: organiserLoader.viewApplications,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/organiser/create-events",
        element: <OrgCreate />,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/organiser/profile",
        element: <OrgProfile />,
        loader: authLoader,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/admin/dashboard",
        element: <AdDashboard />,
        loader: adminLoader,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/admin/create-organisers",
        element: <AdCreateOrganiser />,
        hydrateFallBackElement: <p>loading....</p>,
      },
      {
        path: "/admin/tickets",
        element: <AdminTickets />,
        hydrateFallBackElement: <p>loading....</p>,
      },
    ],
    hydrateFallBackElement: <p>loading....</p>,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
