using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Examination.Student.Identity.Models.AccountModels {
    [DataContract]
    [Serializable]
    public sealed class LoginModel {
        [Required]
        [EmailAddress]
        [DataMember]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [DataMember]
        public string Password { get; set; }

        [DataMember]
        public bool? RememberMe { get; set; } = true;

        [DataMember]
        public string ReturnUrl { get; set; }
    }
}