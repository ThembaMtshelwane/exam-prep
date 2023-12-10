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
  children: ReactNode // Define children prop explicitly as ReactNode
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
        const data = await getLectureData(user?.uid)
        setLectureDataState(data?.props.lectureInfo || [])
        localStorage.setItem(
          'lectureData',
          JSON.stringify(data?.props.lectureInfo || [])
        )
      } catch (error) {
        // Handle error if needed
      }
    }

    if (!lectureData.length) {
      const cachedData = localStorage.getItem('lectureData')
      if (cachedData) {
        setLectureDataState(JSON.parse(cachedData))
      } else {
        fetchData()
      }
    }
  }, [])

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
