import Navbar from '../navbar/navbar';
import React from 'react';

const Layout:React.FC = ({children}) => {
    
    return (
        <>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </>
    )
}
export default Layout;