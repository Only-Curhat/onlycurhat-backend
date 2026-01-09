const prisma = require('../config/prisma');
const { NotFound, Forbidden, BadRequest } = require('../error/errorFactory');

async function createComment(postId, userId, data) {
    if (!data.content) {
        throw BadRequest('Komentar tidak boleh kosong');
    }

    const post = await prisma.post.findUnique({
        where: { id: Number(postId) }
    });

    if (!post) {
        throw NotFound('Postingan tidak ditemukan');
    }

    const newComment = await prisma.comment.create({
        data: {
            content: data.content,
            postId: Number(postId),
            userId: Number(userId)
        }
    });

    return newComment;

}

async function getCommentsByPost(postId) {
    return prisma.comment.findMany({
        where: {
            postId: Number(postId)
        },
        orderBy: {
            createdAt: 'asc'
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    });
}

async function deleteComment(commentId, userId) {
    const comment = await prisma.comment.findUnique({
        where: { id: Number(commentId) }
    });

    if (!comment) {
        throw NotFound('Komentar tidak ditemukan');
    }

    if (comment.userId !== userId) {
        throw Forbidden('Anda tidak boleh menghapus komentar ini');
    }

    await prisma.comment.delete({
        where: { id: Number(commentId) }
    });
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment
};
