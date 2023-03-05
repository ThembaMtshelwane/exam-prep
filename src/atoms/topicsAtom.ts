import { Timestamp } from 'firebase/firestore'
import {atom} from 'recoil'

export interface Topic{
    id:string
    creatorId: string,
    topicName: string,
    numberOfLOs: number,
    createdAt?: Timestamp,
    courseCode: string,
}

export interface TopicSnippet{
    topicID: string,
    isModerator?: boolean,
}

interface TopicState{
    mySnippets:TopicSnippet[]
}

const defaultTopicState: TopicState ={
    mySnippets:[]
}
export const topicState = atom<TopicState>({
    key:'topicState',
    default: defaultTopicState

})