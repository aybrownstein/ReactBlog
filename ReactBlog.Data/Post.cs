using System;
using System.Collections.Generic;

namespace ReactBlog.Data
{
    public class Post
    {
        public int Id { get; set; }
        public string Poster { get; set; }
        public DateTime DatePosted { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
