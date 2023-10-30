# React-Demo-Projects

# (1) Commerce WebSite

import { Header } from "./components/Header";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Cart } from "./components/Cart";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

const App = () => {
const router = createBrowserRouter([
{
path: "/",
element: <Home />,
children: [
{
path: "about",
element: <About />,
},
{
path: "cart",
element: <Cart />,
},
],
},
]);

return (
<>

<Header />
<div>
<RouterProvider router={router}/>
</div>
</>
);
}

export default App;

//////////////////////
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
defaultOptions:{
queries:{
staleTime:Infinity,
cacheTime:Infinity

    }

}
})

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<QueryClientProvider client={queryClient}>
<App />
</QueryClientProvider>
</React.StrictMode>
);
