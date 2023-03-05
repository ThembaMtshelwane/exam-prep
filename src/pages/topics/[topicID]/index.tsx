import { firestore } from '../../../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { Topic } from '@/src/atoms/topicsAtom';
import safeJsonStringify from 'safe-json-stringify'
import NotFound from '@/src/components/Topics/NotFound';
import AddQuestion from '@/src/components/admin/AddQuestion';
import PageContent from '@/src/components/layout/PageContent';

/// THIS SHOILD BE ITS OWN WEBSITE
type CreateQuizProps = {
    topicData: Topic
};

const CreateQuiz:React.FC<CreateQuizProps> = ({topicData}) => {
    
    if(!topicData){
        return <NotFound/>
    }
    return (
        <>
            <PageContent>
            <AddQuestion topicID={topicData.id}/>  
            </PageContent>   
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    
    // Get topic data and pass it to the client
    try {
        const topicDocRef = doc(
            firestore,
            'topics',
            context.query.topicID as string
            )
    const topicDoc = await getDoc(topicDocRef)

    return {
        props:{
            topicData: topicDoc.exists() 
            ? JSON.parse(safeJsonStringify({
                id: topicDoc.id,
                ...topicDoc.data()
            }))
            :""
        }
    }

    } catch (error) {
        console.log('getServerSideProps error',error)   
}
}

export default CreateQuiz;