using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Idsv4.Identity.Data.Models
{
    public class User : IdentityUser
    {
        public User() : base()
        {
        }

        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string LastName { get; set; }
        [MaxLength(50)]
        public string Phone { get; set; }
        [MaxLength(255)]
        public string SecondEmail { get; set; }
        [MaxLength(255)]
        public string Country { get; set; }
        [MaxLength(255)]
        public string City { get; set; }
        public DateTime? BirthDate { get; set; }
        [MaxLength(255)]
        public string Language { get; set; }

        public IEnumerable<SocialLink> SocialLinks { get; set; }

        public int? ImageId { get; set; }

        public string FullName => $"{FirstName} {LastName}";
    }
}
