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
import GameResultComponent from "./components/GameResult/GameResult";
import PlayWithFriendPageCP from "./pages/PlayWithFriendPage/PlayWithFriendPageCP";
import PlayWithBotCP from "./pages/PlayWithBot/PlayWithBotCP";
import ChatTest from "./ChatTest";
import PlayerProfile from "./components/PlayerProfile/PlayerProfile";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";


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
                    <PlayWithFriendPageCP />
                </LayoutWrapper>
            </PrivateRoute>
        ),
    },
    {
        path: "/result",
        element: (
            <LayoutWrapper layoutType={'default'}>
                <PlayWithFriendPageCP />
            </LayoutWrapper>
        )
    },
    {
        path: "/chat-test",
        element: (
            <LayoutWrapper layoutType={'default'}>
                <ChatTest/>
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
        path: "/messages",
        element: (
            <PrivateRoute isWithText={true}>
                <LayoutWrapper layoutType={'mainPage'}>
                    <MessagesPage />
                </LayoutWrapper>
            </PrivateRoute>
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