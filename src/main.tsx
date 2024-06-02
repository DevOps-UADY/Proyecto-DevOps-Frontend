import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import { App } from './App.tsx';
/*
//const [isAuthenticated, setIsAuthenticated] = useState(false);
const navigate = useNavigate();

const checkAuth = () => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    }
	return false;
  };
*/
/*
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
		],
	},
]);
*/
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<App></App>
		</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
);

document.body.style.backgroundColor = '#f9fafb';