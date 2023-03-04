import { Timestamp } from 'firebase/firestore'
import {atom} from 'recoil'

export interface Topic{
    id:string
    creatorId: string,
    numberOfLOs: number,
    createdAt?: Timestamp
}