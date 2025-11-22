import { Routes , Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import TableEdit from "./pages/TableEdit/TableEdit";
import InputFiles from "./pages/InputFiles/InputFiles";

import DataBase from "./pages/DataBase/DataBase";
import HistoryView from "./pages/DatabaseViews/HistoryView";
import ProductView from "./pages/DatabaseViews/ProductView";
import ManufacturerView from "./pages/DatabaseViews/ManufacturerView";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={ <Homepage/> } />
            <Route path="/table-editing" element={ <TableEdit/> } />
            <Route path="/input-files" element={ <InputFiles/> } />
            <Route path="/database" element={ <DataBase/> } />
            <Route path="/database/history" element={ <HistoryView/> } />
            <Route path="/database/product" element={ <ProductView/> } />
            <Route path="/database/manufacturer" element={ <ManufacturerView/> } />
        </Routes>
    )
}

export default RoutesApp