import React from "react";
import { Component } from "react";
import { Navigate, Route } from "react-router-dom";

// export const ProtectedRoute = ({ component: Component, role, isLoggedIn, ...rest }) => (
//     <Route
//         {...rest}
//         render={(props: JSX.IntrinsicAttributes) => (role == 'USER' && isLoggedIn) ?
//             <Component {...props} /> : (
//                 <Navigate to= '/login' state={{from: props.location}} />
//             )
//         }
//     />
// )