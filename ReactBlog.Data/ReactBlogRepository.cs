using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactBlog.Data
{
    public class ReactBlogRepository
    {
        private readonly string _connectionString;

        public ReactBlogRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Post> GetPosts(int skip, int amount)
        {
            using var context = new BlogDataContext(_connectionString);
            return context.Posts.Include(b => b.Comments).OrderByDescending(b => b.DatePosted)
                .Skip(skip).Take(amount).ToList();
        }

        public int GetTotalBlogPostCount()
        {
            using var context = new BlogDataContext(_connectionString);
            return context.Posts.Count();
        }

        public void AddPost(Post post)
        {
            using var context = new BlogDataContext(_connectionString);
            context.Posts.Add(post);
            context.SaveChanges();
        }

        public Post GetById(int id)
        {
            using var context = new BlogDataContext(_connectionString);
            return context.Posts.Include(p => p.Comments).FirstOrDefault(p => p.Id == id);
        }

        public void AddComment(Comment comment)
        {
            using var context = new BlogDataContext(_connectionString);
            context.Comments.Add(comment);
            context.SaveChanges();
        }

        public List<Comment> GetComments(int postId)
        {
            using var context = new BlogDataContext(_connectionString);
            return context.Comments.Where(c => c.PostId == postId).ToList();
        }

        public int GetMostRecent()
        {
            using var context = new BlogDataContext(_connectionString);
            return context.Posts.OrderByDescending(p => p.DatePosted).Select(p => p.Id).FirstOrDefault();
        }
    }

}
