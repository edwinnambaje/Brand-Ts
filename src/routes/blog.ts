import { Router } from "express"

import { createPost, getAllPost, getPost, updatePost, deletePost } from "../controllers/blog"
import upload from "../helper/multer"

const blogRouter = Router()
blogRouter.post('/create', upload.single('image'),createPost)
blogRouter.get('/all', getAllPost)
blogRouter.get('/:id', getPost)
blogRouter.patch('/:id', updatePost)
blogRouter.delete('/:id', deletePost)


export default blogRouter

