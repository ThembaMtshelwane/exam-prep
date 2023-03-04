import { Flex, Icon } from '@chakra-ui/react';
import {GrAdd} from 'react-icons/gr'
import React,{useState} from 'react';
import TopicModal from '../components/modal/topic/TopicModal';

type AdminPageProps = {
    
};
// COMUMNITIES
const AdminPage:React.FC<AdminPageProps> = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            {/* // Welcome */}
            <TopicModal open={open} handleClose={()=> setOpen(false)} />
            {/* // Add Quiz Button -> import add  */}
            <Flex align='center' justify='center'>
                <Icon fontSize={20} mr={2} as={GrAdd} cursor='pointer'
                           onClick={()=> setOpen(true)}
                />
                Add Quiz     
            </Flex>
            {/* // Previous Quizes created -> Have access to lecturer id */}
        </>
    )
}
export default AdminPage;