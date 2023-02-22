
import { useDisclosure, Alert , AlertIcon, AlertTitle, AlertDescription, CloseButton, Collapse } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

interface AlertProps{
    status: "info" | "warning" | "success" | "error" | undefined,
    show: boolean,
    message: string
}

const AlertComponent: React.FC<AlertProps> = (props) => {
    const [show, isShow] = useState<boolean>(false)

    useEffect(() =>{
        isShow(props.show)
    },[props.show])

    return (
      <>
        <Collapse in={show} animateOpacity>
            <Alert status={props.status}>
                <AlertIcon />
                <AlertTitle mr={2}>{props.message}</AlertTitle>
                <CloseButton position='absolute' right='8px' top='8px' />
            </Alert>
        </Collapse>
      </>
    )
  }

export default AlertComponent