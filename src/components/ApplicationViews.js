import React, { useContext } from "react"
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
import { UserContext, UserProvider } from "./users/UserProvider"
import { TagList } from "./tags/TagList"
import { TagProvider } from "./tags/TagProvider"
import { UserDetail } from "./users/UserDetail"
import { Protected } from "./auth/Protected"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <UserProvider>
                <Route exact path="/tags">
                    <Protected>
                        <TagProvider>
                            <TagList />
                        </TagProvider>
                    </Protected>
                </Route>
                <Route exact path="/categories">
                    <Protected>
                        <CategoryProvider>
                            <CategoryList />
                        </CategoryProvider>
                    </Protected>
                </Route>
                <Route exact path="/reactions">
                    <Protected>
                        <ReactionProvider>
                            <ReactionList />
                        </ReactionProvider>
                    </Protected>
                </Route>
                <Route exact path="/posts">
                    <Protected>
                        <CategoryProvider>
                            <PostProvider>
                                <PostList />
                            </PostProvider>
                        </CategoryProvider>
                    </Protected>
                </Route>
                <Route exact path="/posts/my-posts">
                    <Protected>
                        <CategoryProvider>
                            <PostProvider>
                                <PostList />
                            </PostProvider>
                        </CategoryProvider>
                    </Protected>
                </Route>
                <Route exact path="/posts/unapproved-posts">
                    <Protected>
                        <CategoryProvider>
                            <PostProvider>
                                <PostList />
                            </PostProvider>
                        </CategoryProvider>
                    </Protected>
                </Route>
                <Route exact path="/posts/create">
                    <Protected>
                        <PostProvider>
                            <CategoryProvider>
                                <TagProvider>
                                    <PostForm />
                                </TagProvider>
                            </CategoryProvider>
                        </PostProvider>
                    </Protected>
                </Route>
                <Route exact path="/posts/detail/:postId(\d+)">
                    <Protected>
                        <ReactionProvider>
                            <PostProvider>
                                <CommentProvider>
                                    <PostDetail />
                                </CommentProvider>
                            </PostProvider>
                        </ReactionProvider>
                    </Protected>
                </Route>
                <Route exact path="/users">
                    <Protected>
                        <UserList />
                    </Protected>
                </Route>
                <Route exact path="/users/detail/:userId(\d+)">
                    <Protected>
                        <UserDetail />
                    </Protected>
                </Route>
            </UserProvider>
        </main>
    </>
}
