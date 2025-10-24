import { BrowserRouter , Routes , Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import TableEdit from "./pages/TableEdit/TableEdit";
import DataBase from "./pages/DataBase/DataBase";

const RoutesApp = () => {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={ <Homepage/> } />
                <Route path="/table-editing" element={ <TableEdit/> } />
                <Route path="/database" element={ <DataBase/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp