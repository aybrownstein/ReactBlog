﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactBlog.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string Commentor { get; set; }
        public string Text { get; set; }
        public DateTime CommentDate { get; set; }
        public int PostId { get; set; }
    }
}
