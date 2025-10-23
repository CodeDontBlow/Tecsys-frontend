import { BrowserRouter , Routes , Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import TableEdit from "./pages/TableEdit/TableEdit";

const RoutesApp = () => {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={ <Homepage/> } />
                <Route path="/table-editing" element={ <TableEdit/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp