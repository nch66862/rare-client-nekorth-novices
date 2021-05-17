import React, { useContext } from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/CategoryList"
import { CategoryProvider } from "./categories/CategoryProvider"
import { CommentProvider } from "./comment/CommentProvider"
import { PostDetail } from "./post/PostDetail"
import { PostForm } from "./post/PostForm"
import { PostList } from "./post/PostList"
import { PostProvider } from "./post/PostProvider"
import { PostReactionProvider } from "./postReaction/PostReactionProvider"
import { ReactionProvider } from "./reaction/ReactionProvider"
import { ReactionList } from "./reaction/ReactionList"
import { UserList } from "./users/UserList"
import { UserContext, UserProvider } from "./users/UserProvider"
import { TagList } from "./tags/TagList"
import { TagProvider } from "./tags/TagProvider"
import { UserDetail } from "./users/UserDetail"

export const ApplicationViews = () => {
    const { checkAuthenticated } = useContext(UserContext)
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <UserProvider>
                <Route exact path="/tags">
                    {checkAuthenticated()}
                    <TagProvider>
                        <TagList />
                    </TagProvider>
                </Route>
                <Route exact path="/categories">
                    {checkAuthenticated()}
                    <CategoryProvider>
                        <CategoryList />
                    </CategoryProvider>
                </Route>
                <Route exact path="/reactions">
                    {checkAuthenticated()}
                    <ReactionProvider>
                        <ReactionList />
                    </ReactionProvider>
                </Route>
                <Route exact path="/posts">
                    {checkAuthenticated()}
                    <PostProvider>
                        <PostList />
                    </PostProvider>
                </Route>
                <Route exact path="/posts/my-posts">
                    {checkAuthenticated()}
                    <PostProvider>
                        <PostList />
                    </PostProvider>
                </Route>
                <Route exact path="/posts/unapproved-posts">
                    {checkAuthenticated()}
                    <PostProvider>
                        <PostList />
                    </PostProvider>
                </Route>
                <Route exact path="/posts/create">
                    {checkAuthenticated()}
                    <PostProvider>
                        <CategoryProvider>
                            <TagProvider>
                                <PostForm />
                            </TagProvider>
                        </CategoryProvider>
                    </PostProvider>
                </Route>
                <Route exact path="/posts/detail/:postId(\d+)">
                    {checkAuthenticated()}
                    <PostReactionProvider>
                        <ReactionProvider>
                            <PostProvider>
                                <CommentProvider>
                                    <PostDetail />
                                </CommentProvider>
                            </PostProvider>
                        </ReactionProvider>
                    </PostReactionProvider>
                </Route>
                <Route exact path="/users">
                    {checkAuthenticated()}
                    <UserList />
                </Route>
                <Route exact path="/users/detail/:userId(\d+)">
                    {checkAuthenticated()}
                    <UserDetail />
                </Route>
            </UserProvider>
        </main>
    </>
}
