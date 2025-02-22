import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getLectureData } from '../../pages/api/LectureData'
import { auth } from '@/src/firebase/clientApp'

type LectureDataProviderProps = {
  children: React.ReactNode
}

type LectureDataContextType = {
  lectureData: any[]
  setLectureData: React.Dispatch<React.SetStateAction<any[]>>
}

const LectureDataContext = createContext<LectureDataContextType>({
  lectureData: [],
  setLectureData: () => {},
})

export const useLectureDataContext = () => useContext(LectureDataContext)

const LectureDataProvider: React.FC<LectureDataProviderProps> = ({
  children,
}) => {
  const [lectureData, setLectureDataState] = useState<any[]>([])
  const [user] = useAuthState(auth)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLectureData(user?.uid || '')
        const freshData = data?.props.lectureInfo || []
        setLectureDataState(freshData)
      } catch (error) {
        console.log('Error fetching lecture data:', error)
      }
    }

    if (user?.uid) {
      fetchData()
    }
  }, [user])

  return (
    <LectureDataContext.Provider
      value={{ lectureData, setLectureData: setLectureDataState }}
    >
      {children}
    </LectureDataContext.Provider>
  )
}

export default LectureDataProvider
