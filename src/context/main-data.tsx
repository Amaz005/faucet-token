import { ethers } from 'ethers';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
// import { nftSearchByTokenType, nftsType } from '../components/SearchForm'

export type User = {
  wallet: string;
  connection: any;
  web3Provider: ethers.providers.Web3Provider
}

type UserContext = {
  user?: User,
  saveUser: (nft: User ) => void,
}

const defaultNft = {}

const UserContext = createContext<UserContext| null | undefined>(undefined)

export function NftProvider({ children }: {children: ReactNode}) {
  const [user, setUser] = useState<User>()
  const saveUser = (user: User ) => {
    console.log("user: ",user)
    setUser(user)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        saveUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useAccount() {
  const context = useContext(UserContext)

  if (!context)
    throw new Error('useAccount must be used inside a `AccountProvider`')

  return context
}