﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Examination.Student.Identity.Models.AccountModels {
    [DataContract]
    [Serializable]
    public sealed class ForgotPasswordModel {
        [Required]
        [EmailAddress]
        [DataMember]
        public string Email { get; set; }
    }
}