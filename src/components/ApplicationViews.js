import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/CategoryList"
import { CategoryProvider } from "./categories/CategoryProvider"
import { CommentProvider } from "./comment/CommentProvider"
import { PostDetail } from "./post/PostDetail"
import { PostForm } from "./post/PostForm"
import { PostList } from "./post/PostList"
import { PostProvider } from "./post/PostProvider"
import { ReactionProvider } from "./reaction/ReactionProvider"
import { ReactionList } from "./reaction/ReactionList"
import { UserList } from "./users/UserList"
import { UserProvider } from "./users/UserProvider"
import { TagList } from "./tags/TagList"
import { TagProvider } from "./tags/TagProvider"
import { UserDetail } from "./users/UserDetail"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/tags">
                <TagProvider>
                    <TagList />
                </TagProvider>
            </Route>
            <Route exact path="/categories">
                <CategoryProvider>
                    <CategoryList />
                </CategoryProvider>
            </Route>
            <Route exact path="/reactions">
                <ReactionProvider>
                    <ReactionList />
                </ReactionProvider>
            </Route>
            <Route exact path="/posts">
                <PostProvider>
                    <PostList />
                </PostProvider>
            </Route>
            <Route exact path="/posts/my-posts">
                <PostProvider>
                    <PostList />
                </PostProvider>
            </Route>
            <Route exact path="/posts/unapproved-posts">
                <PostProvider>
                    <PostList />
                </PostProvider>
            </Route>
            <Route exact path="/posts/create">
                <PostProvider>
                    <CategoryProvider>
                        <TagProvider>
                            <PostForm />
                        </TagProvider>
                    </CategoryProvider>
                </PostProvider>
            </Route>
            <Route exact path="/posts/detail/:postId(\d+)">
                <ReactionProvider>
                <PostProvider>
                    <CommentProvider>
                        <PostDetail />
                    </CommentProvider>
                </PostProvider>
                </ReactionProvider>
            </Route>
            <UserProvider>
                <Route exact path="/users">
                    <UserList/>
                </Route>
                <Route exact path="/users/detail/:userId(\d+)">
                    <UserDetail/>
                </Route>
            </UserProvider>

        </main>
    </>
}
