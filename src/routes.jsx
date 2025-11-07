import { BrowserRouter , Routes , Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import TableEdit from "./pages/TableEdit/TableEdit";
import InputFiles from "./pages/InputFiles/InputFiles";
import DataBase from "./pages/DataBase/DataBase";
import History from "./pages/History/History";

const RoutesApp = () => {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={ <Homepage/> } />
                <Route path="/table-editing" element={ <TableEdit/> } />
                <Route path="/input-files" element={ <InputFiles/> } />
                <Route path="/database" element={ <DataBase/> } />
                <Route path="/extraction-history" element={ <History/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp