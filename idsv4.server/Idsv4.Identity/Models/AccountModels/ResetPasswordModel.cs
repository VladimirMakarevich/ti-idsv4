﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Idsv4.Student.Identity.Models.AccountModels {
    [DataContract]
    [Serializable]
    public sealed class ResetPasswordModel {
        [Required]
        [EmailAddress]
        [DataMember]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.",
            MinimumLength = 6)]
        [DataType(DataType.Password)]
        [DataMember]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        [DataMember]
        public string ConfirmPassword { get; set; }

        [DataMember]
        public string Code { get; set; }
    }
}