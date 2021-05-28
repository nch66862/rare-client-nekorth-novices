import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap'
import { CategoryContext } from "../categories/CategoryProvider"
import { TagContext } from "../tags/TagProvider"
import { PostContext } from "./PostProvider"

export const PostForm = () => {
    const { createPost, getPostById, editPost } = useContext(PostContext)
    const { getAllCategories, categories } = useContext(CategoryContext)
    const { getAllTags, tags } = useContext(TagContext)
    const [b64, setB64] = useState("")
    const history = useHistory()
    const { postId } = useParams()
    const [post, setPost] = useState({
        "category_id": 0,
        "title": "",
        "content": "",
        "tag_ids": [],
        "image_url": ""
    })
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    const createPostImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setB64(base64ImageString)
        });
    }
    useEffect(() => {
        let tempPost = { ...post }
        tempPost.image_url = b64
        setPost(tempPost)
        // eslint-disable-next-line
    }, [b64])
    useEffect(() => {
        getAllCategories()
            .then(getAllTags).then(() => {
                if (postId) {
                    console.log(postId)
                    getPostById(postId)
                        .then(res => {
                            console.log(res)
                            let tags = res.post.tag_set.map(tag => tag.id)
                            setPost({
                                "category_id": res.post.category ? res.post.category.id : 0,
                                "title": res.post.title,
                                "content": res.post.content,
                                "image_url": res.post.image_url,
                                "tag_ids": tags
                            })
                        })
                }
            })
        // eslint-disable-next-line
    }, [])
    const handleControlledInputChange = (event) => {
        let newPost = { ...post }
        if (event.target.name === "tag_ids") {
            const tag = parseInt(event.target.value)
            const tagIndex = post.tag_ids.indexOf(tag)
            if (tagIndex > -1) {
                newPost.tag_ids.splice(tagIndex, 1)
            } else {
                newPost.tag_ids.push(tag)
            }
            setPost(newPost)
        }
        else if (event.target.id === "category_id") {
            newPost[event.target.id] = parseInt(event.target.value)
            setPost(newPost)
        }
        else {
            newPost[event.target.id] = event.target.value
            setPost(newPost)
        }
    }
    const handleSubmitClick = (event) => {
        if (postId) {
            editPost(post, postId)
                .then(result => history.push(`/posts/detail/${postId}`))
        } else {
            createPost(post)
                .then(result => history.push(`/posts/detail/${result.id}`))
        }
    }
    return (
        <Form className="postForm" autoComplete="on">
            <h2 className="postForm__title">New Post</h2>
            <fieldset>
                <FormGroup>
                    <Label for="postTitle">Title</Label>
                    <Input onChange={handleControlledInputChange} type="text" name="title" id="title" value={post.title} />
                </FormGroup>
                {post.image_url ? <></> :
                    <FormGroup>
                        <Label for="reaction_image">image</Label>
                        <Input type="file" id="reaction_image" onChange={createPostImageString} />
                    </FormGroup>
                }
                <FormGroup>
                    <Label for="postCategory">Category</Label>
                    <Input onChange={handleControlledInputChange} type="select" name="selectCategory" id="category_id" value={post.category_id}>
                        <option value="0">choose a category...</option>
                        {categories?.map(category => {
                            return <option key={category?.id} value={category?.id}>{category?.label}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="postContent">Your Thoughts</Label>
                    <Input onChange={handleControlledInputChange} type="textarea" name="text" id="content" value={post.content} />
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