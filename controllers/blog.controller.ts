import { connectDB } from "@/lib/mongodb";
import Blog, { IBlog } from "@/models/Blog";

interface Author {
    name: string,
    userId: string,
    profilePic?:string,
}

interface BlogData{
    title: string,
    content: string,
    author: Author,
    imageUrl?:string,
}

await connectDB();

export const createBlog = async (blogData:BlogData):Promise<IBlog|null> => {
    
    const { title, content, author, imageUrl } = blogData;
    const blog = await Blog.create({
        title,
        content,
        author: {
          userId:author.userId,
          name: author.name, 
          profilePic:author.profilePic,
        },
        imageUrl: imageUrl,
    });
    if (blog) return blog;
    return null;
}

export const findBlog = async (blogId: string): Promise<IBlog | null> => {
  const blog: IBlog | null = await Blog.findOne({ _id: blogId });
  if (blog) return blog;
  return null;
};


