import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import { PostContext } from "./PostProvider";

export const PostList = () => {
  const [posts, setPosts] = useState([])
  const [gotApproval, setGotApproval] = useState(false)
  const { getPostsByUserId, getAllPosts, approvePost, deletePost } = useContext(PostContext)
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
  }
  useEffect(() => {
    checkPath()
  }, [])

  const handleApprovePost = (postId) => {
    approvePost(postId)
      .then(() => {
        setGotApproval(true)
        setGotApproval(false)
      })
  }

  return (
    <section>
      {console.log(posts)}
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
            {post.ownership ? <> <Link to={`/posts/edit/${post.id}`}>
              Edit
            </Link>
            <Button color="danger" onClick={e=> {
              e.preventDefault()
              deletePost(post.id).then(()=>checkPath())} }>delete</Button></>:<></>}
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

