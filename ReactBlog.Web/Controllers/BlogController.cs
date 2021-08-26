using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using ReactBlog.Data;

namespace ReactBlog.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private string _connectionString;

        public BlogController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addpost")]
        public Post AddPost(Post post)
        {
            post.DatePosted = DateTime.Now;
            var repo = new ReactBlogRepository(_connectionString);
            repo.AddPost(post);
            return post;
        }

        [HttpGet]
        [Route("getposts")]
        public List<Post> GetPosts()
        {
            var repo = new ReactBlogRepository(_connectionString);
            var posts = repo.GetPosts();
            return posts;
        }

        [HttpGet]
        [Route("getblogpost")]
        public Post GetPost(int id)
        {
            var repo = new ReactBlogRepository(_connectionString);
            return repo.GetById(id);
        }

        [HttpPost]
        [Route("addcomment")]
        public void AddComment(Comment comment)
        {
            comment.CommentDate = DateTime.Now;
            var repo = new ReactBlogRepository(_connectionString);
            repo.AddComment(comment);
        }

        [HttpGet]
        [Route("getcomments")]
        public List<Comment> GetComments(int postId)
        {
            var repo = new ReactBlogRepository(_connectionString);
            return repo.GetComments(postId);
        }

        [HttpGet]
        [Route("getmostrecent")]
        public int GetMostRecent()
        {
            var repo = new ReactBlogRepository(_connectionString);
            return repo.GetMostRecent();
        }
    }
}
