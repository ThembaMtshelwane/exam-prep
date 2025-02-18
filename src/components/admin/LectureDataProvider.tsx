import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getLectureData } from "../../pages/api/LectureData";
import { auth } from "@/src/firebase/clientApp";

type LectureDataProviderProps = {
  children: React.ReactNode;
};

type LectureDataContextType = {
  lectureData: any[];
  setLectureData: React.Dispatch<React.SetStateAction<any[]>>;
};

const LectureDataContext = createContext<LectureDataContextType>({
  lectureData: [],
  setLectureData: () => {},
});

export const useLectureDataContext = () => useContext(LectureDataContext);

const LectureDataProvider: React.FC<LectureDataProviderProps> = ({
  children,
}) => {
  const [lectureData, setLectureDataState] = useState<any[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("lectureData");
        const lastFetchTime = localStorage.getItem("lastFetchTime");

        const currentTime = new Date().getTime();

        // Check if cached data exists and is not stale (e.g., more than 1 hour old)
        if (
          cachedData &&
          lastFetchTime &&
          currentTime - parseInt(lastFetchTime) < 3600000
        ) {
          // Use cached data
          setLectureDataState(JSON.parse(cachedData));
        } else {
          // Fetch fresh data
          const data = await getLectureData(user?.uid);
          const freshData = data?.props.lectureInfo || [];
          setLectureDataState(freshData);

          // Cache the data and update last fetch time
          localStorage.setItem("lectureData", JSON.stringify(freshData));
          localStorage.setItem("lastFetchTime", currentTime.toString());
        }
      } catch (error) {
        console.log("Error fetching lecture data:", error);
      }
    };

    if (user?.uid) {
      fetchData();
    }
  }, [user]);

  const setLectureData: React.Dispatch<React.SetStateAction<any[]>> = (
    data
  ) => {
    setLectureDataState(data);
    localStorage.setItem("lectureData", JSON.stringify(data));
    localStorage.setItem("lastFetchTime", new Date().getTime().toString());
  };

  return (
    <LectureDataContext.Provider value={{ lectureData, setLectureData }}>
      {children}
    </LectureDataContext.Provider>
  );
};

export default LectureDataProvider;
