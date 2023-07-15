import React,{useState} from "react"
import { Button, Modal} from "cherry-ui"

export default ()=> {
    const [open,setOpen] = useState(false)

    const onOpen = () =>{
        setOpen(true)
    }
    const onClose = () =>{
        setOpen(false)
    }
    return (
        <div>
            <Button onClick={onOpen}>Open Modal</Button>
            <Modal open={open} onClose={onClose}>
                这是一条警告提示
            </Modal>
        </div>
    )
}