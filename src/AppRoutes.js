import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import JoinRoom from "./pages/JoinRoom/JoinRoom";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import React from "react";
import LayoutWrapper from "./layouts/LayoutWrapper";
import HomePage from "./components/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute";

const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <HomePage/>
            </LayoutWrapper>
        ),
        errorElement: (
            <LayoutWrapper layoutType={'default'}>
                <div>404</div>
            </LayoutWrapper>
        )
    },
    {
        path: "/room" ,
        // element: (
        //     <LayoutWrapper layoutType={'mainPage'}>
        //         <div>room</div>
        //     </LayoutWrapper>
        // ),
        errorElement: (
            <LayoutWrapper layoutType={'default'}>
                <div>404</div>
            </LayoutWrapper>
        ),
        children: [
            {
                path: ":roomCode",
                element: (
                    <PrivateRoute>
                        <LayoutWrapper layoutType={'default'}>
                            <JoinRoom/>
                        </LayoutWrapper>
                    </PrivateRoute>
                )
            },
            {
                path: "waiting",
                element: (
                    <PrivateRoute>
                        <LayoutWrapper layoutType={'default'}>
                            <CreateRoom/>
                        </LayoutWrapper>
                    </PrivateRoute>
                )
            }
        ]
    },

]
)

const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}

export default AppRoutes;