import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap'
import { CategoryContext } from "../categories/CategoryProvider"
import { TagContext } from "../tags/TagProvider"
import { PostContext } from "./PostProvider"

export const PostForm = (props) => {
    const { createPost } = useContext(PostContext)
    const { getAllCategories, categories } = useContext(CategoryContext)
    const { getAllTags, tags } = useContext(TagContext)
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("rare_user_id"))
    const today = new Date()
    const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const [post, setPost] = useState({
        "user_id": currentUser,
        "category_id": 0,
        "title": "",
        "publication_date": currentDate,
        "image_url": "",
        "content": "",
        "approved": false,
        "tag_ids": []
    })

    useEffect(() => {
        getAllCategories()
            .then(getAllTags)
    }, [])

    const handleControlledInputChange = (event) => {
        let newPost = { ...post }
        if (event.target.name == "tag_ids") {
            const tag = parseInt(event.target.value)
            const tagIndex = post.tag_ids.indexOf(tag)
            if (tagIndex > -1) {
                newPost.tag_ids.splice(tagIndex, 1)
            } else {
                newPost.tag_ids.push(tag)
            }
            setPost(newPost)
        }
        else if (event.target.id == "category_id") {
            newPost[event.target.id] = parseInt(event.target.value)
            setPost(newPost)
        }
        else {
            newPost[event.target.id] = event.target.value
            setPost(newPost)
        }
    }

    const handleSubmitClick = (event) => {
        createPost(post)
            .then(result => history.push(`/posts/detail/${result.id}`))
    }

    return (
        <Form className="postForm" autoComplete="on">
            {console.log(categories)}
            <h2 className="postForm__title">New Post</h2>
            <fieldset>
                <FormGroup>
                    <Label for="postTitle">Title</Label>
                    <Input onChange={handleControlledInputChange} type="text" name="title" id="title" />
                </FormGroup>
                <FormGroup>
                    <Label for="postCategory">Category</Label>
                    <Input onChange={handleControlledInputChange} type="select" name="selectCategory" id="category_id">
                        <option value="0">choose a category...</option>
                        {categories?.map(category => {
                            return <option key={category?.id} value={category?.id}>{category?.label}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="postContent">Your Thoughts</Label>
                    <Input onChange={handleControlledInputChange} type="textarea" name="text" id="content" />
                </FormGroup>
                <FormGroup>
                    <Label for="postImageURL">URL for an Image</Label>
                    <Input onChange={handleControlledInputChange} type="text" name="imageURL" id="image_url" />
                </FormGroup>
                <FormGroup>
                    <ListGroup horizontal>
                        {tags.map(tag => {
                            return <ListGroupItem key={tag?.id}><Input name="tag_ids" id={tag?.id} checked={post.tag_ids.includes(tag.id)} value={tag?.id} onChange={handleControlledInputChange} type="checkbox" />{tag.label}</ListGroupItem>
                        })}
                    </ListGroup>
                </FormGroup>
            </fieldset>
            <Button className="btn__submit" onClick={handleSubmitClick}>Submit</Button>
        </Form>
    )
}