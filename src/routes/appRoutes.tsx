// import React from "react";
// import { useLocation, useRoutes } from "react-router-dom";
// import { useAuth } from "hooks";
// import { routes, loginRoute } from "routes";
// import { GuestScaffold, Scaffold } from "layouts";

// export const AppRoutes: React.FC = () => {
// const { isLoggedIn, profile } = useAuth();
// const location = useLocation();
// const AppRoutes = useRoutes(routes({ isLoggedIn, location, profile }));
// const appLoginRoutes = useRoutes(loginRoute({ isLoggedIn, location }));

//   return (
//     <>
//       {isLoggedIn ? (
//         <Scaffold>{AppRoutes}</Scaffold>
//       ) : (
//         <GuestScaffold>{appLoginRoutes}</GuestScaffold>
//       )}
//     </>
//     <>
//       <Scaffold>{AppRoutes}</Scaffold>
//     </>
//   );
// };
