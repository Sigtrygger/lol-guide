import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/Mainlayout"
import Home from "../pages/Home"
import ExternalResources from "../pages/ExternalResources"

import FundamentalsIndex from "../pages/fundamentals/Fundamentals"
import Glossary from "../pages/fundamentals/Glossary"
import Roles from "../pages/fundamentals/Roles"
import RoleDetail from "../pages/fundamentals/RoleDetail"

import HowtoimproveIndex from "../pages/howtoimprove/Howtoimprove"
import SoloTraining from "../pages/howtoimprove/SoloTraining"
import Reviews from "../pages/howtoimprove/Reviews"
import Tilt from "../pages/howtoimprove/Tilt"
import SoloQ from "../pages/howtoimprove/SoloQ"
import Teamplay from "../pages/howtoimprove/Teamplay"


import HowtolaneorjungleIndex from "../pages/howtolaneorjungle/Howtolaneorjungle"
import WaveManagement from "../pages/howtolaneorjungle/WaveManagement"
import Trading from "../pages/howtolaneorjungle/Trading"
import JungleTracking from "../pages/howtolaneorjungle/JungleTracking"

import MacroIndex from "../pages/macro/Macro"
import Vision from "../pages/macro/Vision"
import Objectives from "../pages/macro/Objectives"
import Rotations from "../pages/macro/Rotations"
import Teamfights from "../pages/macro/Teamfights"
import DraftSynergies from "../pages/macro/DraftSynergies"

import OptimizationIndex from "../pages/optimization/Optimization"
import Items from "../pages/optimization/Items"
import Champions from "../pages/optimization/Champions"
import ChampionDetail from "../pages/optimization/ChampionDetail"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "external-resources", element: <ExternalResources /> },

            {
                path: "fundamentals",
                element: <FundamentalsIndex />,
                children: [
                    { path: "glossary", element: <Glossary /> },
                    { path: "roles", element: <Roles /> },
                    { path: "roles/:role", element: <RoleDetail /> },
                ],
            },

            {
                path: "how-to-improve",
                element: <HowtoimproveIndex />,
                children: [
                    { path: "solo-training", element: <SoloTraining /> },
                    { path: "reviews", element: <Reviews /> },
                    { path: "tilt", element: <Tilt /> },
                    { path: "soloq", element: <SoloQ /> },
                    { path: "teamplay", element: <Teamplay /> },
                ],
            },

            {
                path: "lane-jungle",
                element: <HowtolaneorjungleIndex />,
                children: [
                    { path: "wave-management", element: <WaveManagement /> },
                    { path: "trading", element: <Trading /> },
                    { path: "jungle-tracking", element: <JungleTracking /> },
                ],
            },

            {
                path: "macro",
                element: <MacroIndex />,
                children: [
                    { path: "vision", element: <Vision /> },
                    { path: "objectives", element: <Objectives /> },
                    { path: "rotations", element: <Rotations /> },
                    { path: "teamfights", element: <Teamfights /> },
                    { path: "draft-synergies", element: <DraftSynergies /> },
                ],
            },

            {
                path: "optimization",
                element: <OptimizationIndex />,
                children: [
                    { path: "items", element: <Items /> },
                    { path: "champions", element: <Champions /> },
                    { path: "champions/:slug", element: <ChampionDetail /> },
                ],
            },
        ],
    },
])
