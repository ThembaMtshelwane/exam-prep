import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';

type AddQuestionProps = {
    
};

const AddQuestion:React.FC<AddQuestionProps> = () => {
    
    return (
            //  Wlecome the lecturer  {user ? <div>user</div> : <div>no user</div>}

    // Question level

    // Question - Have a choice between text, images and a pdf file
    <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} cursor='pointer'>
        Question type
    </MenuButton>
    <MenuList>
         <MenuItem 
            onClick={()=>{}}>  {/* Handle Text */}
            Text
          </MenuItem>  
         <MenuDivider/>
         <MenuItem 
            onClick={()=>{}}>  {/* Handle images */}
            Image
          </MenuItem>    
         <MenuDivider/>  
         <MenuItem 
            onClick={()=>{}}>  {/* Handle PDF files */}
            PDF file
         </MenuItem>     
    </MenuList>
</Menu>

// Enter the answer

//  Drop down to enter the 4 options 

// Either optional of just for the last queation
// Enter number of resources 

// Enter said resource

// Submit 


    )
}
export default AddQuestion;