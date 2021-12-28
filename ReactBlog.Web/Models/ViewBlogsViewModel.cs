using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactBlog.Data;

namespace ReactBlog.Web.Models
{
    public class ViewBlogsViewModel
    {
        public List<Post> Posts { get; set; }
        public int TotalCount { get; set; }
    }
}
