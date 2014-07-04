using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Web.Mvc;
using System.Web.Security;

namespace Senparc.Weixin.MP.Pfizer.Models
{
    public class WXUsersDBContext : DbContext
    {
        public WXUsersDBContext()
            : base("DefaultConnection")
        {
        }

        public DbSet<WXUser> WXUsers { get; set; }
    }

    [Table("weixin_users")]
    public class WXUser
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string openid { get; set; }
        public string mobile { get; set; }
        public string accountid { get; set; }
        public string code { get; set; }
        [Range(0, 1)]
        public int certified { get; set; }
    }

   
}
