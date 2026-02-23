import {
  RouterProvider
} from "react-router";
import Router from "./pages/Router";

function App() {
  return (
    <div className={"bg-serfice-700 h-screen"}>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;








