import React, { useContext, useEffect, useState } from "react"
import { ReactionContext } from "./ReactionProvider"
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { ImageContext } from "../images/ImageProvider"

export const ReactionList = () => {
  const { reactions, getReactions, createReaction, deleteReaction } = useContext(ReactionContext)
  const { createImageString, b64, setB64 } = useContext(ImageContext)
  const [showForm, setShowForm] = useState(false)
  const [reaction, setReaction] = useState({
    "label": "",
    "image_url": ""
  })
  const [reactionId, setReactionId] = useState(0)
  const [deleteCheck, setDeleteCheck] = useState(false)
  useEffect(() => {
    getReactions()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    let reactionCopy = { ...reaction }
    reactionCopy.image_url = b64
    setReaction(reactionCopy)
    // eslint-disable-next-line
  }, [b64])
  const handleShowForm = () => {
    setShowForm(true)
  }
  const handleCloseForm = () => {
    setShowForm(false)
    setReaction({
      "label": "",
      "image_url": ""
    })
  }
  const saveReaction = () => {
    createReaction(reaction)
      .then(handleCloseForm)
    setB64("")
  }
  const handleInputChange = (event) => {
    let tempReaction = { ...reaction }
    tempReaction[event.target.id] = event.target.value
    setReaction(tempReaction)
  }
  const handleShowDeleteCheck = (e) => {
    setDeleteCheck(true)
    setReactionId(e.target.value)
  }
  const handleCloseDeleteCheck = () => {
    setDeleteCheck(false)
    setReactionId(0)
  }
  const removeReaction = () => {
    deleteReaction(reactionId).then(handleCloseDeleteCheck)
  }
  return (
    <>
      <h3>Reactions</h3>
      <Modal isOpen={showForm}>
        <ModalHeader>Create Reaction</ModalHeader>
        <ModalBody>
          <form className="reactionForm">
            <label htmlFor="reactionLabel">Label: </label>
            <input type="text" id="label" onChange={handleInputChange} value={reaction.label}></input><br></br>
            <input type="file" id="reaction_image" onChange={createImageString} />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={saveReaction}>
            Save Reaction
          </Button>
          <Button variant="secondary" onClick={handleCloseForm}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Button variant="primary" onClick={handleShowForm}>Create Reaction</Button>
      <div className="reactions">
        {reactions?.map(reaction => {
          return <div key={reaction.id}>
            <img src={reaction.image_url} alt={reaction.label} width="20vh" height="20vh" />
            {reaction.label}
            <Button variant="secondary" value={reaction.id} onClick={handleShowDeleteCheck}>Delete</Button>
          </div>
        })}
      </div>
      <Modal isOpen={deleteCheck} onHide={handleCloseDeleteCheck}>
        <ModalHeader>
          Are You Sure
        </ModalHeader>
        <ModalFooter>
          <Button variant="primary" onClick={removeReaction}>yes</Button>
          <Button variant="secondary" onClick={handleCloseDeleteCheck}>no</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}