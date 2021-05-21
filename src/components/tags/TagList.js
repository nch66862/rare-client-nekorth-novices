import  React, { useContext, useEffect, useState } from "react"
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { TagContext } from "./TagProvider"


export const TagList = () => {
    const {tags, getAllTags, addTag, deleteTag, updateTag} = useContext(TagContext)
    const [showForm, setShowForm] = useState(false)
    const [tag, setTag] = useState({
        "id":0,
        "label":""
    })
    const [tagId, setTagId] = useState(0)
    const [deleteCheck, setDeleteCheck] = useState(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        getAllTags()
    },[])
    const editTag = (id,label) => {
        setTag({
            "id":id,
            "label":label
        })
        setShowForm(true)
    }
    const handleShowDeleteCheck = (e) => {
        setDeleteCheck(true)
        setTagId(e.target.value)
    }
    const handleCloseDeleteCheck = () => {
        setDeleteCheck(false)
        setTagId(0)
    }
    const handleShowForm = () => {
        setShowForm(true)
    }
    const handleCloseForm = () => {
        setShowForm(false)
        setTag({
            "id":0,
            "label":""})
    }
    const saveTag = () => {
        if(tag.id === 0){
            addTag(tag).then(handleCloseForm)
        }
        else{
            updateTag(tag).then(handleCloseForm)
        }
    }
    const removeTag = () => {
        deleteTag(tagId).then(handleCloseDeleteCheck)
    }
    const handleInputChange = (event) => {
        let tempTag = {...tag}
        tempTag.label = event.target.value
        setTag(tempTag)
    }
    return(
        <>
        <h3>Tags</h3>
        <Modal isOpen={showForm} onHide={handleCloseForm}>
        <ModalHeader>Create Tag</ModalHeader>
        <ModalBody>
            <form className="tagForm">
                <label htmlFor="tagLabel">label</label>
                <input type="text" id="label" onChange={handleInputChange} value={tag.label}></input>
            </form>
        </ModalBody>
        <ModalFooter>
                <Button variant="primary" onClick={saveTag}>
                    Save Tag
                </Button>
          <Button variant="secondary" onClick={handleCloseForm}>
            Close
          </Button>
        </ModalFooter>
        </Modal>
        <Modal isOpen={deleteCheck} onHide={handleCloseDeleteCheck}>
            <ModalHeader>
                Are You Sure
            </ModalHeader>
            <ModalFooter>
                <Button variant="primary" onClick={removeTag}>yes</Button>
                <Button variant="secondary" onClick={handleCloseDeleteCheck}>no</Button>
            </ModalFooter>
        </Modal>
    
        <Button variant="primary" onClick={handleShowForm}>Create Tag</Button>
        
        <div className = "tags">
            {tags?.map(tag => <div key={tag.id}>{tag.label}
                                <Button variant="secondary" value={tag.id} onClick={handleShowDeleteCheck}>Delete</Button>
                                <Button variant="secondary" onClick={e=>editTag(tag.id,tag.label)}>Edit</Button>
                            </div>)}
        </div>
        </>
    )
}