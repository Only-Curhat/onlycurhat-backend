const prisma = require('../config/prisma');
const { BadRequest, NotFound, Forbidden } = require('../error/errorFactory');

async function createPost(data, userId) {
    if (!userId) {
        throw Forbidden('Anda harus login untuk membuat postingan');
    }

    const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
    });

    if (!user) {
        throw Forbidden('User tidak valid');
    }

    const newPost = await prisma.post.create({
        data: {
            content: data.content,
            authorId: Number(userId)
        }
    });

    return newPost;
}

async function getPostAll(data) {
    const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { 
            id: true,
            username: true }
      },
      _count: {
        select: { comments: true }
      }
    }
    });

    return posts;
}

async function getPostById(postId) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            author: {
                select: {
                    id: true,
                    username: true
                        }
                    },
                    comments: true 
                   }
    });
    if (!post) {
        throw NotFound('Postingan tidak ditemukan');
    }
    return post;
}

async function getPostsByAuthor(authorId) {
    const posts = await prisma.post.findMany({
        where: {
            authorId: Number(authorId)
        },
        include: {  
            author: {
                select: {
                    id: true,
                    username: true
                }
            },
             _count: {
            select: { comments: true }
        }
        }
    });

    return posts;
}  


async function getPostMe(userId) {
    const posts = await prisma.post.findMany({
        where: {
            authorId: Number(userId)
        },
        include: {
             _count: {
            select: { comments: true }
        }
        }
    });

    return posts;
    
}

async function showEditPost(postId, userId) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        throw NotFound('Postingan tidak ditemukan');
    }   
    if (post.authorId !== userId) {
        throw Forbidden('Anda tidak memiliki izin untuk mengedit postingan ini');
    }

    return post;
    
}

async function updatePost(postId, data, userId) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        throw NotFound('Postingan tidak ditemukan');
    }
    if (post.authorId !== userId) {
        throw Forbidden('Anda tidak memiliki izin untuk mengedit postingan ini');
    }
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            content: data.content
        }
    });
    return updatedPost;
}


async function deletePost(postId, userId) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        throw NotFound('Postingan tidak ditemukan');
    }
    if (post.authorId !== userId) {
        throw Forbidden('Anda tidak memiliki izin untuk menghapus postingan ini');
    }
    await prisma.post.delete({
        where: {
            id: postId
        }
    });
    return;
}

module.exports = {
    createPost,
    getPostAll,
    getPostById,
    getPostsByAuthor,
    getPostMe,
    showEditPost,
    updatePost,
    deletePost
};