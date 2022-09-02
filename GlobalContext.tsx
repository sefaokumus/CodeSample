import React, { createContext } from 'react'

import { ICarouselInstance } from 'react-native-reanimated-carousel'

interface IGlobalContext {
  decksScreenflatListRef: React.RefObject<ICarouselInstance>,
}

const GlobalContext = createContext<IGlobalContext | null>(null)

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const decksScreenflatListRef = React.useRef<ICarouselInstance | null>(null)

  return <GlobalContext.Provider value={{ decksScreenflatListRef }}>
    {children}
  </GlobalContext.Provider>
}

const useGlobalContext = () => React.useContext<IGlobalContext | null>(GlobalContext)
export { GlobalContextProvider, useGlobalContext, GlobalContext }
