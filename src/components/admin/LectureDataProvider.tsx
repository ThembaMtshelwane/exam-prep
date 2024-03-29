import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
  ReactNode, // Import ReactNode type
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getLectureData } from '../../pages/api/LectureData'
import { auth } from '@/src/firebase/clientApp'

type LectureDataProviderProps = {
  children: ReactNode
}

type LectureDataContextType = {
  lectureData: any[]
  setLectureData: Dispatch<SetStateAction<any[]>>
}

const LectureDataContext = createContext<LectureDataContextType>({
  lectureData: [],
  setLectureData: () => {},
})

export const useLectureDataContext = () => useContext(LectureDataContext)

const LectureDataProvider: React.FC<LectureDataProviderProps> = (props) => {
  const [lectureData, setLectureDataState] = useState<any[]>([])
  const [user] = useAuthState(auth)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // let cachedData = localStorage.getItem('lectureData')
        // if (cachedData) {
        //   setLectureDataState(JSON.parse(cachedData))
        // }
        // const freshData = await getFreshData()
        // setLectureDataState(freshData)
        // localStorage.setItem('lectureData', JSON.stringify(freshData))

        const data = await getLectureData(user?.uid)
        setLectureDataState(data?.props.lectureInfo || [])
        localStorage.setItem(
          'lectureData',
          JSON.stringify(data?.props.lectureInfo || [])
        )
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [lectureData])

  // const getFreshData = async () => {
  //   const data = await getLectureData(user?.uid)
  //   return data?.props.lectureInfo || []
  // }
  const setLectureData: Dispatch<SetStateAction<any[]>> = (
    data: SetStateAction<any[]>
  ) => {
    setLectureDataState(data)
    localStorage.setItem('lectureData', JSON.stringify(data))
  }

  return (
    <LectureDataContext.Provider value={{ lectureData, setLectureData }}>
      {props.children}
    </LectureDataContext.Provider>
  )
}

export default LectureDataProvider
