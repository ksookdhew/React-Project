import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Navbar from "./features/navbar/Navbar.tsx";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar/>
        </QueryClientProvider>
    );
}

export default App
