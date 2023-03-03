import { topicModalState } from '@/src/atoms/topicModalAtom';
import { Flex } from '@chakra-ui/react';
import {useRecoilValue} from 'recoil'
import React from 'react';
import Topic from '../../admin/AddTopic';

type TopicInputsProps = {
    
};

const TopicInputs:React.FC<TopicInputsProps> = () => {
    const modalState = useRecoilValue(topicModalState)
    return (
    <Flex direction='column' align='center' width='100%' mt={4}>
        {modalState.view === 'start' &&  <Topic/> }
    </Flex>
    )
}
export default TopicInputs;