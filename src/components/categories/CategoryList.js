
import  React, { useContext, useEffect, useState } from "react"
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { CategoryContext } from "./CategoryProvider"


export const CategoryList = () => {
    const {categories, getAllCategories, addCategory, deleteCategory, updateCategory} = useContext(CategoryContext)
    const [showForm, setShowForm] = useState(false)
    const [category, setCategory] = useState({
        "id":0,
        "label":""
    })
    const [categoryId, setCategoryId] = useState(0)
    const [deleteCheck, setDeleteCheck] = useState(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        getAllCategories()
    },[])
    
    const editCategory = (id,label) => {
        setCategory({
            "id":id,
            "label":label
        })
        setShowForm(true)
    }
    const handleShowDeleteCheck = (e) => {
        setDeleteCheck(true)
        setCategoryId(e.target.value)
    }
    const handleCloseDeleteCheck = () => {
        setDeleteCheck(false)
        setCategoryId(0)
    }
    const handleShowForm = () => {
        setShowForm(true)
    }
    const handleCloseForm = () => {
        setShowForm(false)
        setCategory({
            "id":0,
            "label":""})
    }
    const saveCategory = () => {
        if(category.id === 0){
            addCategory(category).then(handleCloseForm)
        }
        else{
            updateCategory(category).then(handleCloseForm)
        }
    }
    const removeCategory = () => {
        deleteCategory(categoryId).then(handleCloseDeleteCheck)
    }
    const handleInputChange = (event) => {
        let tempCategory = {...category}
        tempCategory.label = event.target.value
        setCategory(tempCategory)
    }
    return(
        <>
        <h3>Categories</h3>
        <Modal isOpen={showForm} onHide={handleCloseForm}>
        <ModalHeader>Create Category</ModalHeader>
        <ModalBody>
            <form className="categoryForm">
                <label htmlFor="categoryLabel">label</label>
                <input type="text" id="label" onChange={handleInputChange} value={category.label}></input>
            </form>
        </ModalBody>
        <ModalFooter>
                <Button variant="primary" onClick={saveCategory}>
                    Save Category
                </Button>
          <Button variant="secondary" onClick={handleCloseForm}>
            Close
          </Button>
        </ModalFooter>
        </Modal>
        <Modal isOpen={deleteCheck} onHide={handleCloseDeleteCheck}>
            <ModalHeader>Are You Sure</ModalHeader>
            <ModalFooter>
                <Button variant="primary" onClick={removeCategory}>yes</Button>
                <Button variant="secondary" onClick={handleCloseDeleteCheck}>no</Button>
            </ModalFooter>
        </Modal>
    
        <Button variant="primary" onClick={handleShowForm}>Create Category</Button>
        
        <div className = "Categorys">
            {categories?.map(category => <div key={category.id}>{category.label}
                                <Button variant="secondary" value={category.id} onClick={handleShowDeleteCheck}>Delete</Button>
                                <Button variant="secondary" onClick={e=>editCategory(category.id,category.label)}>Edit</Button>
                            </div>)}
        </div>
        </>
    )
}
