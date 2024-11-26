import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import LayoutWrapper from "./layouts/LayoutWrapper";
import PrivateRoute from "./components/PrivateRoute";
import GameResult from "./pages/GameResult/GameResult";
import PlayWithFriendPage from "./pages/PlayWithFriendPage/PlayWithFriendPage";
import MatchHistoryComponent from "./components/MatchHistory/MatchHistoryComponent";
import HomePage from "./pages/HomePage/HomePage";
import MatchHistory from "./pages/MatchHistory/MatchHistory";
import FriendPage from "./pages/FriendPage/FriendPage";

import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import CreateTournamentPage from "./pages/CreateTournamentPage/CreateTournamentPage";
import RoomListPage from "./pages/RoomListPage/RoomListPage";
import RulesPage from "./pages/RulesPage/RulesPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import AccountSettingPage from "./pages/AccountSettingPage/AccountSettingPage";
import PlayWithBot from "./pages/PlayWithBot/PlayWithBot";


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
                <div>404</div>
            </LayoutWrapper>
        )
    },
    {
        path: "/room",
        children: [
            {
                path: ":roomCode",
                element: (
                    <PrivateRoute>
                        <LayoutWrapper layoutType={'default'}>
                            <PlayWithFriendPage />
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
        path: "/b/room",
        element: (
            <PrivateRoute>
                <LayoutWrapper layoutType={'default'}>
                    <PlayWithBot />
                </LayoutWrapper>
            </PrivateRoute>
        ),
        children: [
            {
                path: ":roomCode",
                element: (
                    <PrivateRoute>
                        <LayoutWrapper layoutType={'default'}>
                            <PlayWithBot />
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
        path: "/history",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <MatchHistory />
            </LayoutWrapper>
        )
    },
    {
        path: "/friends",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <FriendPage />
            </LayoutWrapper>
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
        path: "/messages",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <MessagesPage />
            </LayoutWrapper>
        )
    },
    {
        path: "/create-tournament",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <CreateTournamentPage />
            </LayoutWrapper>
        )
    },
    {
        path: "/room-list",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <RoomListPage />
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
            <LayoutWrapper layoutType={'mainPage'}>
                <AccountSettingPage />
            </LayoutWrapper>
        )
    },
    {
        path: "/profile",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <ProfilePage />
            </LayoutWrapper>
        )
    },
    {
        path: "/settings",
        element: (
            <LayoutWrapper layoutType={'mainPage'}>
                <SettingsPage />
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