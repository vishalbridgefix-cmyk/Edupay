import { Outlet } from "react-router-dom";

function MainLayout(){
    return (
        <main className="h-screen w-full overflow-hidden bg-[#F7F7FC]">
            <Outlet />
        </main>
    );
}
export default MainLayout;