import Navbar from '../navbar/navbar';
import React from 'react';

const layout:React.FC = ({children}) => {
    
    return (
        <>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </>
    )
}
export default layout;