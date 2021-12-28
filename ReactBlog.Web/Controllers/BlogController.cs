using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using ReactBlog.Data;
using ReactBlog.Web.Models;

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

        [HttpGet]
        [Route("get")]
        public ViewBlogsViewModel GetBlogPosts(int page)
        {
            int pageCount = 3;
            int from = (page - 1) * pageCount;
            var repo = new ReactBlogRepository(_connectionString);
            var posts = repo.GetPosts(from, pageCount);
            var totalCount = repo.GetTotalBlogPostCount();
            return new ViewBlogsViewModel
            {
                Posts = posts,
                TotalCount = totalCount
            };
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
