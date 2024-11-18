import {BrowserRouter} from "react-router-dom";
import {AppRoute} from "./Router/AppRouter.jsx";
import {FulltangProvider} from "./Utils/Provider.jsx";




export default function App() {
  return (
      <FulltangProvider>
          <BrowserRouter>
              <div className='min-h-screen overflow-y-auto overflow-x-hidden'>
                  <AppRoute />
              </div>
          </BrowserRouter>
      </FulltangProvider>
  )
}