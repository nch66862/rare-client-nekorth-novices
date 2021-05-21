import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import { CategoryContext } from "../categories/CategoryProvider";
import { UserContext } from "../users/UserProvider";
import { PostContext } from "./PostProvider";

export const PostList = () => {
  const [posts, setPosts] = useState([])
  const {categories, getAllCategories} = useContext(CategoryContext)
  const {getAllUsers, rareUsers} = useContext(UserContext)
  const [sortUser, setSortUser] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sort, setSort] = useState("")
  const [gotApproval, setGotApproval] = useState(false)
  const { getPostsByUserId, getAllPosts, approvePost, searchPosts, sortPostsByCategory, deletePost, sortPostsByUser, getSubscribedPosts } = useContext(PostContext)
  const history = useHistory()
  const urlPath = history.location.pathname
  const checkPath = () => {
    if (urlPath === "/posts/my-posts") {
      getPostsByUserId()
        .then(setPosts)
    }
    else if (urlPath === "/posts") {
      getAllPosts()
        .then(setPosts)
    }
    else if (urlPath === "/posts/unapproved-posts") {
      getAllPosts()
        .then(result => {

        })
      }
    else if (urlPath === "/") {
      getSubscribedPosts()
        .then(setPosts)
    }
  }
  useEffect(() => {
   getAllCategories().then(()=>getAllUsers()).then(()=>checkPath())
  }, [])
  useEffect(() => {
    if (searchTerm.length) {
      searchPosts(searchTerm).then(setPosts)
    } else {
      checkPath()
    }
},[searchTerm])
  useEffect(()=>{
    if(sort.length && sort !== "0"){
      sortPostsByCategory(sort).then(setPosts)
    }else{
      checkPath()
    }
  },[sort])
  useEffect(()=>{
    if(sortUser.length && sortUser !== "0"){
      sortPostsByUser(sortUser).then(setPosts)
    }else{
      checkPath()
    }
  },[sortUser])

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
        onChange={(e) => { setSearchTerm(e.target.value) }} />
      <select name="sort_query" className="form-control" value={sort}
        onChange={(e) => setSort(e.target.value)}>
        <option value="0">Sort By Category ...</option>
        {categories.map(category => <option value={category.id}>{category.label}</option>)}
      </select>
      <select name="sort_user" className="form-control" value={sortUser}
        onChange={(e)=> setSortUser(e.target.value)}>
          <option value="0">Sort By User ...</option>
          {rareUsers.map(rareUser => <option value={rareUser.id}>{rareUser.user.username}</option>)}
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
            {post.ownership && <Link to={`/posts/edit/${post.id}`}>Edit</Link>}
            {(post.ownership || localStorage.getItem("rare_user_admin") === "true") &&
              <Button color="danger" onClick={e => {
                e.preventDefault()
                deletePost(post.id).then(() => checkPath())
              }}>delete
              </Button>
            }
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

