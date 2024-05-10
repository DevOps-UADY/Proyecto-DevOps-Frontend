import { Outlet } from "react-router-dom";
import { Navbard } from "./components";
import { Dispatch, SetStateAction } from "react";

export function Layout({setIsAuthenticated}:LayoutProps) {
	return (
		<div className="min-h-full">
			
			<Navbard setIsAuthenticated={setIsAuthenticated} />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
interface LayoutProps {
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}