import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../component/Layout";
import BillDetail from "../page/BillDetail";
import ClassDetail from "../page/ClassDetail";
import Classes from "../page/Classes";
import ConsultationRequest from "../page/ConsultationRequest";
import CreateBill from "../page/CreateBill";
import CreateClass from "../page/CreateClass";
import InformationAccount from "../page/InformationAccount";
import InformationStudent from "../page/InformationStudent";
import InformationTutor from "../page/InformationTutor";
import Login from "../page/Login";
import NotFound from "../page/NotFound";
import TeachingApplication from "../page/TeachingApplication";
import TutorRegistration from "../page/TutorRegistration";
import { useSelector } from "react-redux";
import UpdateClass from "../page/UpdateClass";
import ReportPage from "../page/ReportPage";

const Routers = () => {
    const userData = useSelector(state => state.accountAction);
    // const userData = true;
    const routes = useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true, // index route khi path là "/"
                    element: userData? <Navigate to="/information" replace /> : <Navigate to={"/login"}/>
                },
                {
                    path: 'login',
                    element: <Login/>
                },
                {
                    path: 'information',
                    element: userData? <InformationAccount/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'information-student/:idStudent',
                    element: userData? <InformationStudent/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'information-tutor/:idTutor',
                    element: userData? <InformationTutor/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'class',
                    element: userData? <Classes/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'class/:idClass',
                    element: userData? <ClassDetail/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'update-class/:idClass',
                    element: userData? <UpdateClass/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'report',
                    element: userData? <ReportPage/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'create-class',
                    element: userData? <CreateClass/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'create-class/:idTa',
                    element: userData? <CreateClass/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'teaching-application/:idTa',
                    element: userData? <TeachingApplication/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'create-bill',
                    element: userData? <CreateBill/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'bill/:idBill',
                    element: userData? <BillDetail/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'tutor-registration',
                    element: userData? <TutorRegistration/> : <Navigate to={"/login"}/>
                },
                {
                    path: 'consultation-request',
                    element: userData? <ConsultationRequest/> : <Navigate to={"/login"}/>
                },
                {
                    path: '*',
                    element: <NotFound/>
                }
            ]
        },
    ])
    return routes;
}

export default Routers;