import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import LayoutWrapper from "./layouts/LayoutWrapper";
import HomePage from "./components/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import JoinRoomCopy from "./pages/JoinRoom/JoinRoomCopy";

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
        children: [
            {
                path: ":roomCode",
                element: (
                    <PrivateRoute>
                        <LayoutWrapper layoutType={'default'}>
                            <JoinRoomCopy/>
                        </LayoutWrapper>
                    </PrivateRoute>
                )
            },
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