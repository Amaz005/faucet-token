import Layout from '../components/Layout'
import { ReactElement, useEffect, useState } from 'react'
import { Box, Button, FormControl, Input, Stack, Text } from '@chakra-ui/react'
import { useAccount } from '../context/main-data'
import { Formik, Form, ErrorMessage } from 'formik'
import { ethers } from 'ethers'
import FaucetAbi from '../../abi/Faucet.json'
import {FAUCET} from '../constants'
import AlertComponent from '../components/Alert'


type input = {
  walletAddress: string
}

const initialInput: input = {
  walletAddress: ""
}

export default function Home() {
  const {user} = useAccount()
  const [show, setShow] = useState<boolean>(false)
  const [contract, setContract] = useState<ethers.Contract>()
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>()
  const [validTime, setValidTime] = useState<number>()
  useEffect( function() {
    if(user?.web3Provider) {
      console.log("index user: ",user)
      try {
        const web3provider = new ethers.providers.Web3Provider(user?.connection)
        const _signer = web3provider.getSigner()
        setSigner(_signer)
        const contract = new ethers.Contract(FAUCET,FaucetAbi,_signer)
        setContract(contract)
        handleUpdate(_signer, contract)
      } catch (e) {
        console.log(e)
      }
      
    }
  }, [user])

  const handleUpdate = async (_signer: ethers.providers.JsonRpcSigner, _contract: ethers.Contract) => {
    console.log({_signer})
    console.log("address: ",await _signer.getAddress())
    if(_signer) {
      const getValidTime = await _contract?.getNextValidRequestTime(_signer.getAddress())
      if(getValidTime) {
        setValidTime(getValidTime.toString())
      } else {
        setValidTime(0)
      }
    }
  }

  const handleFaucet = async () => {
    console.log({contract})
    console.log(await contract?.signer.getAddress())
    try {
      
      const transaction = await contract?.faucet()
      const txData = await transaction.wait()
      const event = txData.events[0].args
      if(event.requester == user?.wallet && signer && contract) {
        setShow(true)
        await handleUpdate(signer, contract)
      }
    } catch (err) {
      
    }
    setShow(true)
    setTimeout(() => setShow(false), 3000)
  }

  return (
    <Box>
      <AlertComponent show={show} status="success" message="success"/>
      <Box width="50%" style={{ margin: "auto"}}>
          <Formik
            initialValues={initialInput}
            onSubmit={async function(values) {
              console.log("values: ", values)
              await handleFaucet()
            }}
          >
            {props => (
              <Form >
                <FormControl style={{display: "flex", marginTop:"200px"}}>
                  <Input 
                    name="walletAddress" 
                    id="walletAddress" 
                    mr="1" 
                    height='48px'
                    placeholder="wallet address" 
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.walletAddress}
                  />

                  <ErrorMessage name="walletAddress"/>
                  <Button
                    size='md'
                    height='48px'
                    width='200px'
                    border='2px'
                    borderColor='green.500'
                    type="submit"
                  >
                    Faucet
                  </Button>
                </FormControl>
              </Form>
            )}
        </Formik>
        <Stack spacing={3}>
          <Text>{user?.wallet}</Text>
          <Text>{validTime}</Text>
        </Stack>
        </Box>
    </Box>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
