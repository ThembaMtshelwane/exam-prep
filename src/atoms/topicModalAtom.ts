import {atom} from 'recoil'

export interface TopicModalState{
    open: boolean;
    view: 'admin'|'start'| "continue"
}

const defaultModalState: TopicModalState={
    open:false,
    view:'admin'
}

export const topicModalState = atom<TopicModalState>({
    key:"topicModalState",
    default:defaultModalState,
})