import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import LayoutWrapper from "./layouts/LayoutWrapper";
import PrivateRoute from "./components/PrivateRoute";
import GameResult from "./pages/GameResult/GameResult";
import HomePage from "./pages/HomePage/HomePage";
import MatchHistory from "./pages/MatchHistory/MatchHistory";
import FriendPage from "./pages/FriendPage/FriendPage";

import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import RulesPage from "./pages/RulesPage/RulesPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import AccountSettingPage from "./pages/AccountSettingPage/AccountSettingPage";
import GameResultComponent from "./components/GameResult/GameResult";
import PlayWithFriendPage from "./pages/PlayWithFriendPage/PlayWithFriendPage";
import PlayWithBotCP from "./pages/PlayWithBot/PlayWithBot";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import PlayWithSomeone from "./pages/PlayWithSomeone/PlayWithSomeone";
import RoomPlayLayout from "./layouts/RoomPlayLayout";
import PlayerListPage from "./pages/PlayListPage/PlayerListPage";


const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <LayoutWrapper layoutType={'mainPageWithFooter'}>
                <HomePage />
            </LayoutWrapper>
        ),
        errorElement: (
            <LayoutWrapper layoutType={'default'}>
                <NotFoundPage />
            </LayoutWrapper>
        )
    },
    {
        path: "/room/:roomCode",
        element: (
            <PrivateRoute>
                <LayoutWrapper layoutType={'default'}>
                    <PlayWithFriendPage />
                </LayoutWrapper>
            </PrivateRoute>
        ),
    },
    {
        path: "/result",
        element: (
            <LayoutWrapper layoutType={'default'}>
                <PlayWithFriendPage />
            </LayoutWrapper>
        )
    },
    {
        path:"/test",
        element: (
            <LayoutWrapper layoutType={'default'}>
                <GameResultComponent />
            </LayoutWrapper>
        )
    },
    {
        path: "/b/room",
        element: (
            <PrivateRoute>
                <LayoutWrapper layoutType={'default'}>
                    <PlayWithBotCP />
                </LayoutWrapper>
            </PrivateRoute>
        ),
        children: [
            {
                path: ":roomCode",
                element: (
                    <PrivateRoute>
                        <LayoutWrapper layoutType={'default'}>
                            <PlayWithBotCP />
                        </LayoutWrapper>
                    </PrivateRoute>
                )
            },
            {
                path: ":roomCode/result",
                element: (
                    <PrivateRoute>
                        <LayoutWrapper layoutType={'default'}>
                            <GameResult />
                        </LayoutWrapper>
                    </PrivateRoute>
                )
            }
        ]
    },

    {
        path: "/find-opponent",
        element: (
            <PrivateRoute>
                <LayoutWrapper layoutType={'default'}>
                    <PlayWithSomeone />
                </LayoutWrapper>
            </PrivateRoute>
        )
    },

    {
        path: "/player-list",
        element: (
            <PrivateRoute isWithText={true}>
                <LayoutWrapper layoutType={'mainPage'}>
                    <PlayerListPage />
                </LayoutWrapper>
            </PrivateRoute>
        )
    },

    {
        path: "/history",
        element: (
            <PrivateRoute isWithText={true}>
                <LayoutWrapper layoutType={'mainPage'}>
                    <MatchHistory />
                </LayoutWrapper>
            </PrivateRoute>
        )
    },
    {

        path: "/friends",
        element: (
            <PrivateRoute isWithText={true}>
                <LayoutWrapper layoutType={'mainPage'}>
                    <FriendPage />
                </LayoutWrapper>
            </PrivateRoute>
        )
    },
    {
        path: "/leaderboard",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <LeaderboardPage />
            </LayoutWrapper>
        )
    },
    {
        path: "/rules",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <RulesPage />
            </LayoutWrapper>
        )
    },
    {
        path: "/shop",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <ShopPage />
            </LayoutWrapper>
        )
    },
    {
        path: "/account",
        element: (
            <PrivateRoute isWithText={true}>
                <LayoutWrapper layoutType={'mainPage'}>
                    <AccountSettingPage />
                </LayoutWrapper>
            </PrivateRoute>
        )
    },
    {
        path: "/settings",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <RoomPlayLayout
                    player1={{}}
                    player2={{}}
                    onLeaveRoom={() => {}}
                    leftSide={<></>}
                    rightSide={<></>}
                    isGameStarted={true}
                    winner={null}
                />
            </LayoutWrapper>
        )
    }
]);

const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}

export default AppRoutes;