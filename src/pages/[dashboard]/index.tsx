import AdminPage from '@/src/components/admin/AdminPage'
import LectureDataProvider from '@/src/components/admin/LectureDataProvider'
import PageContent from '@/src/components/layout/PageContent'
import React from 'react'

type DashboardProps = {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <>
      <PageContent>
        <LectureDataProvider>
          <AdminPage />
        </LectureDataProvider>
      </PageContent>
    </>
  )
}
export default Dashboard
