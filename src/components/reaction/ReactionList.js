import React, { useContext, useEffect, useState } from "react"
import { ReactionContext } from "./ReactionProvider"
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { UserContext } from "../users/UserProvider"
import { ImageContext } from "../images/ImageProvider"

export const ReactionList = () => {
  const {reactions, getReactions, createReaction} = useContext(ReactionContext)
  const {createImageString, b64, setB64} = useContext(ImageContext)
  const [showForm, setShowForm] = useState(false)
  const [reaction, setReaction] = useState({
    "label": "",
    "image_url": ""
  })
  
  useEffect(() => {
    getReactions()
  }, [])

  useEffect(() => {
    let reactionCopy = {...reaction}
    reactionCopy.image_url = b64
    setReaction(reactionCopy)
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
    let tempReaction = {...reaction}
    tempReaction[event.target.id] = event.target.value
    setReaction(tempReaction)
  }
  return(
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
          </div>
      })}
    </div>
    </>
  )
}