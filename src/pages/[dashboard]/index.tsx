import AdminPage from '@/src/components/admin/AdminPage';
import PageContent from '@/src/components/layout/PageContent';
import React from 'react';

type DashboardProps = {
    
};

const Dashboard:React.FC<DashboardProps> = () => {
    
    return (
        <>
            <PageContent>
                <AdminPage/>     
            </PageContent>

        </>
    )
    
}
export default Dashboard;