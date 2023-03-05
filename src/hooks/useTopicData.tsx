import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { TopicSnippet, topicState } from '../atoms/topicsAtom';
import { auth, firestore } from '../firebase/clientApp';

const useTopicData= () => {

    const [user] = useAuthState(auth)
    const [topicStateValue, setTopicStateValue] = useRecoilState(topicState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    const getMySnippets =async () => {
        setLoading(true)

        try {
            const snippetDocs = await getDocs(
                collection(firestore,`lecturers/${user?.uid}/quizSnippets`)
                )

            const snippets  = snippetDocs.docs.map((doc)=>({...doc.data()})) 
            console.log('snippets', snippets)

            setTopicStateValue(
                prev=>({
                     ...prev,
                    mySnippets:snippets as TopicSnippet[]
                 }),
            )

        } catch (error) {
            console.log('getMySnippets error', error)
        }
        setLoading(false)
    }

    useEffect(()=>{
        if(!user) return
        getMySnippets()
    },[user])

    return (
        {
            topicStateValue,
            loading      
        }
    )
}
export default useTopicData;
