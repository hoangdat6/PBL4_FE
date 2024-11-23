import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import LayoutWrapper from "./layouts/LayoutWrapper";
import PrivateRoute from "./components/PrivateRoute";
import GameResult from "./pages/GameResult/GameResult";
import PlayWithFriendPage from "./pages/PlayWithFriendPage/PlayWithFriendPage";
import MatchHistory from "./components/MatchHistory/MatchHistory";
import HomePage from "./pages/HomePage/HomePage";

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
                            <PlayWithFriendPage/>
                        </LayoutWrapper>
                    </PrivateRoute>
                )
            },
            {
                path: ":roomCode/result",
                element: (
                    <PrivateRoute>
                        <LayoutWrapper layoutType={'default'}>
                            <GameResult/>
                        </LayoutWrapper>
                    </PrivateRoute>
                )
            }
        ]
    },
    {
        path: "/history",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <MatchHistory/>
            </LayoutWrapper>
        )

    },
    {
        path: "/"
    }

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