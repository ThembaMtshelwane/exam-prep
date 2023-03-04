import { firestore } from '../../../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { Topic } from '@/src/atoms/topicsAtom';
import safeJsonStringify from 'safe-json-stringify'
import NotFound from '@/src/components/Topics/NotFound';

/// THIS SHOILD BE ITS OWN WEBSITE
type AdminPageProps = {
    topicData: Topic
};

const AdminPage:React.FC<AdminPageProps> = ({topicData}) => {
    
    if(!topicData){
        return <NotFound/>
    }
    return <div>Welcome to {topicData.id}</div>
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

export default AdminPage;