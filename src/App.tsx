import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AllProducts from "./features/allProducts/AllProducts.tsx";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
        <AllProducts />
        </QueryClientProvider>
    );
}

export default App
