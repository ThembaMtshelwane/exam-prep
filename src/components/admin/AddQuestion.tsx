import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';

type AddQuestionProps = {
    
};

const AddQuestion:React.FC<AddQuestionProps> = () => {
    
    return (

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

// if level is 4  show
// Enter number of resources 

// Enter said resource

)

}
export default AddQuestion;