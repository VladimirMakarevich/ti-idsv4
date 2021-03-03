using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Idsv4.Student.Identity.Models.AccountModels {
    [DataContract]
    [Serializable]
    public sealed class ForgotPasswordModel {
        [Required]
        [EmailAddress]
        [DataMember]
        public string Email { get; set; }
    }
}