import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Layout } from "./Layout.tsx";
import { Rutas, Dashboard, Conductores, Vehiculos } from "./pages";
import './index.css'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "Dashboard",
				element: <Dashboard />,
			},
			{
				path: "Rutas",
				element: <Rutas />,
			},
			{
				path: "Conductores",
				element: <Conductores />,
			},
			{
				path: "Vehiculos",
				element: <Vehiculos />
			},
		],
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
);

document.body.style.backgroundColor = '#f9fafb';