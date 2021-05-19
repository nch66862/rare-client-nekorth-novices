import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import { CategoryContext } from "../categories/CategoryProvider";
import { PostContext } from "./PostProvider";

export const PostList = () => {
  const [posts, setPosts] = useState([])
  const {categories, getAllCategories} = useContext(CategoryContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [sort, setSort] = useState("")
  const [gotApproval, setGotApproval] = useState(false)
  const { getPostsByUserId, getAllPosts, approvePost, searchPosts, sortPosts } = useContext(PostContext)
  const history = useHistory()
  const urlPath = history.location.pathname

  useEffect(() => {
    getAllCategories()
    if (urlPath === "/posts/my-posts") {
      console.log("myposts, ")
      getPostsByUserId()
        .then(setPosts)
    }
    else if (urlPath === "/posts") {
      console.log("allposts")
      getAllPosts()
        .then(setPosts)
    }
    else if (urlPath === "/posts/unapproved-posts") {
      getAllPosts()
        .then(result => {
          
        })
    }
  }, [])
  useEffect(()=>{
    if(searchTerm.length){
        searchPosts(searchTerm).then(setPosts)
    }else{
      // need to implement that function i made parse url or something on diff branch
      getAllPosts().then(setPosts)
    }
},[searchTerm])
  useEffect(()=>{
    if(sort.length && sort !== "0"){
      sortPosts(sort).then(setPosts)
    }else{
      // need to implement that function i made parse url or something on diff branch

      getAllPosts().then(setPosts)
    }
  },[sort])

  const handleApprovePost = (postId) => {
    approvePost(postId)
      .then(() => {
        setGotApproval(true)
        setGotApproval(false)
      })
  }

  return (
    <section>
      <label htmlFor="searchTerm">Search:</label>
      <input type="text" name="searchTerm" autoFocus className="form-control" value={searchTerm}
        onChange={(e)=> {setSearchTerm(e.target.value)}}/>
      <select name="sort_query" className="form-control" value={sort}
        onChange={(e)=> setSort(e.target.value)}>
          <option value="0">Sort By Category ...</option>
          {categories.map(category => <option value={category.id}>{category.label}</option>)}
      </select>
      <ListGroup>
        {posts?.map(post => {
          return (<ListGroupItem key={post.id}>
            <ListGroupItemHeading>{post?.title}</ListGroupItemHeading>
            <ListGroupItemText>
              Author: {post?.user.user?.username}
            </ListGroupItemText>
            <ListGroupItemText>
              Category: {post?.category?.label}
            </ListGroupItemText>
            <Link to={`/posts/detail/${post.id}`}>
              Post Details
            </Link>
            <ListGroupItemText>
              {urlPath === "/posts/unapproved-posts" && <Button onClick={() => handleApprovePost(post.id)}>Approve</Button>}
            </ListGroupItemText>
          </ListGroupItem>)
        })}
      </ListGroup>
    </section>
  )
}


const filterApprovedPosts = (posts) => {
  return posts?.filter(post => {
    return post.approved === true
  })
}

const filterUnapprovedPosts = (posts) => {
  return posts?.filter(post => {
    return post.approved === false
  })
}

const nonFuturePosts = (posts) => {
  const today = new Date()
  return posts?.filter(post => {
    const dateArray = post.publicationDate.split("-")
    const dateOfPublication = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    return today > dateOfPublication
  })
}

