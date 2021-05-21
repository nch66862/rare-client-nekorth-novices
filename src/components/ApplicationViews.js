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
import { Protected } from "./auth/Protected"
import { InactiveUserList } from "./users/InactiveUserList"
import { ImageProvider } from "./images/ImageProvider"
import { EditUserForm } from "./users/EditUserForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <ImageProvider>
                <UserProvider>
                    <TagProvider>
                        <CategoryProvider>
                            <ReactionProvider>
                                <PostProvider>
                                    <CommentProvider>
                                        <Route exact path="/tags">
                                            <Protected>
                                                <TagList />
                                            </Protected>
                                        </Route>

                                        <Route exact path="/categories">
                                            <Protected>
                                                <CategoryList />
                                            </Protected>
                                        </Route>
                                        <Route exact path="/reactions">
                                            <Protected>
                                                <ReactionList />
                                            </Protected>
                                        </Route>
                                        <Route exact path="/posts">
                                            <Protected>
                                                <PostList />
                                            </Protected>
                                        </Route>
                                        <Route exact path="/posts/my-posts">
                                            <Protected>
                                                <PostList />
                                            </Protected>
                                        </Route>
                                        <Route exact path="/posts/unapproved-posts">
                                            <Protected>

                                                <PostList />

                                            </Protected>
                                        </Route>
                                        <Route exact path="/posts/create">
                                            <Protected>

                                                <PostForm />

                                            </Protected>
                                        </Route>

                                        <Route exact path="/posts/edit/:postId(\d+)">
                                            <Protected>
                                                <PostForm />
                                            </Protected>
                                        </Route>
                                        <Route exact path="/posts/detail/:postId(\d+)">
                                            <Protected>
                                                <PostDetail />
                                            </Protected>
                                        </Route>
                                        <Route exact path="/users">
                                            <Protected>
                                                <UserList />
                                            </Protected>
                                        </Route>
                                        <Route exact path="/users/inactive">
                                            <Protected>
                                                <InactiveUserList />
                                            </Protected>
                                        </Route>
                                        <Route exact path="/users/detail/:userId(\d+)">
                                            <Protected>
                                                <UserDetail />
                                            </Protected>
                                        </Route>
                                        <Route exact path="/users/detail/:userId(\d+)/edit">
                                            <Protected>
                                                <EditUserForm />
                                            </Protected>
                                        </Route>
                                    </CommentProvider>
                                </PostProvider>
                            </ReactionProvider>
                        </CategoryProvider>
                    </TagProvider>
                </UserProvider>
            </ImageProvider>
        </main>
    </>
}
