const Joi = require('joi')
const fs = require('fs');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const {BACKEND_SERVER_PATH, CLOUD_NAME, API_KEY, API_SECRET} = require('../config/index')
const BlogDTO = require('../dto/blog')
const BlogDetailsDTO = require('../dto/blog-details')
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
  


const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {
    async create(req,res,next){
        // validate req body
        const createBlogSchema = new Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            // client side -> base64 encoded string -> decode -> store ->  save photo's path in db
            photo: Joi.string().required()
        })

        const {error} = createBlogSchema.validate(req.body);

        if(error){
            return next(error)
        }

        // handle photo storage, naming
        const {title,content,author,photo} = req.body;
        // read as buffer
        // const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg); base64,/, ''), 'base64')
        const base64Data = photo.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');


        // alot a random name 
        const imagePath = `${Date.now()}-${author}.png`;

        // save locally
        let response;
        try {
            // response = await cloudinary.uploader.upload(decodedString);
            // fs.writeFileSync('image.png', imageBuffer);
            fs.writeFileSync(`storage/${imagePath}`, imageBuffer);
          } catch (error) {
            return next(error);
          }

        // add to db
        let newBlog;
        try {
             newBlog = new Blog({
                title,  
                content,
                author,
                photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
                // photoPath: response,
            });

                await newBlog.save();

        } catch (error) {
            return next(error)
        }
        // return response
        const blogDto = new BlogDTO(newBlog);

        return res.status(201).json({ blog: blogDto });
    },
    async getAll(req,res,next){
        try {
            const blogs = await Blog.find({});

            const blogsDto = []
            for(let i=0; i< blogs.length; i++){
                const dto = new BlogDTO(blogs[i]);
                blogsDto.push(dto)
            }

            return res.status(200).json({blogs: blogsDto})

        } catch (error) {
            return next(error)
        }
    },
    async getById(req,res,next){
        // validate Id
        const getByIdSchema =  Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        })

        const {error} = getByIdSchema.validate(req.params)

        if(error){
            return next(error)
        }

        let blog;
        try {
            const {id} = req.params
            blog = await Blog.findOne({_id: id}).populate('author')           
        } catch (error) {
            return next(error)
        }

        const blogDto = new BlogDetailsDTO(blog);

        return res.status(200).json({blog: blogDto})
    },
    async update(req,res,next){
        // validation
        const updateBlogSchema = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            blogId: Joi.string().regex(mongodbIdPattern).required(),
            photo: Joi.string()
        })

        const {error} = updateBlogSchema.validate(req.body)

        if(error){
            return next(error)
        }
        const {title,content,author,blogId,photo} = req.body;

        // delete previous photo

        // save new photo
        let blog;
        try {
            blog = await Blog.findOne({_id: blogId})
        } catch (error) {
            return next(error)
        }

        if(photo){
            let previousPhoto = blog.photoPath;
            previousPhoto = previousPhoto.split('/').at(-1)

            // delete photo
            fs.unlinkSync(`storage/${previousPhoto}`)

             // read as buffer
        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg); base64,/, ''), 'base64')

        // alot a random name 
        const imagePath = `${Date.now()}-${author}.png`;

        // save locally
        try {
            fs.writeFileSync(`storage/${imagePath}`, buffer)
        } catch (error) {
            return next(error)
        }

        await Blog.updateOne({_id: blogId}, 
            {title,content,photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`}
            )

        }else{
            await Blog.updateOne({_id: blogId},{title,content})
        }

        return res.status(200).json({message: 'blog Updated!'})

    },
    async delete(req,res,next){
        //  validate id
        const deleteBlogSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required(),
        });
        const {error} =  deleteBlogSchema.validate(req.params);
        if(error){
            return next(error)
        }
         const {id} = req.params
        // delete blog

        try {
            await Blog.deleteOne({_id: id})

            // delete comments on blog
            await Comment.deleteMany({blog: id})

        } catch (error) {
            return next(error)
        }
        return res.status(200).json({message: "blog Deleted!"})  
    },
}

module.exports = blogController