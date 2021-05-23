import React, { useEffect, useState } from 'react'
import CommentsService from './services/CommentsService'
import PostsService from './services/PostsService'
import TodosService from './services/TodosService'
import UsersService from './services/UsersService'

export default function Services() {
    const [comments, setComments] = useState()
    const [posts, setPosts] = useState()
    const [profile, setProfile] = useState()

    async function getComments() {
        const results = await CommentsService.getComments();
        console.log(results)
    }

    async function getTodos() {
        const results = await TodosService.getTodos();
        console.log(results)
    }

    async function getUsers() {
        const results = await UsersService.getUsers();
        console.log(results)
    }
    async function getPosts() {
        const results = await PostsService.getPosts();
        console.log(results)
    }

    useEffect(() => {

        return () => {

        }
    }, [])

    return (
        <div>
            <h1>Services</h1>
            <button className="btn btn-primary mr-2" onClick={getUsers}>get Users</button>
            <button className="btn btn-primary mr-2" onClick={getTodos}>get Todos</button>
            <button className="btn btn-primary mr-2" onClick={getPosts}>get Posts</button>
            <button className="btn btn-primary mr-2" onClick={getComments}>get Comments</button>
        </div>
    )
}
