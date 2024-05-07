import { Outlet } from "react-router-dom";
import { Navbard } from "./components";

export function Layout() {
	return (
		<div className="min-h-full">
			
			<Navbard />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
