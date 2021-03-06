﻿using Sigma.Validation.Model;
using System;

namespace Sigma.Validation
{
    /// <summary>
    /// Validation of phone number provided.
    /// This servie will validate number on randam number if not additional data is provided.
    /// Additional data referes to From Data Dictionary flag and Country code.
    /// On the case of bool flag (isFromDataDictionary) is true it will indentify correct number on the basis of country.
    /// On the case of counry code which has two alphabets, eg; NP for Nepal it will identify phone on the basis of country code provided
    /// </summary>
    public static class PhoneNumber
    {
        /// <summary>
        /// Check whether phone number is valid or not.
        /// Result is true for valid phone number
        /// Result is false for invalid phone number and message is set in error message, if exception has occured while checking then Exception is set
        /// </summary>
        /// <param name="number">number (string) to be validated as valid phone number</param>
        /// <param name="isFromDataDictionary">
        /// Identifies whether to validate phone number from data dictionary. Data dictionary has all list of countries and verifies all the blocks of phone  number.
        /// It identifies country, type of number whether it is land line (fixed) or celluler. If from data dictionary is true then country code must be provided.
        /// Phone numer without country code will be treateded as invalid phone number.
        /// </param>
        /// <returns>validation result with properties, ErrorMessage (string), Exception and Result (bool)</returns>
        public static ValidationResult<bool> IsPhoneNumber(this string number, bool isFromDataDictionary = false)
        {
            var operation = number.ValidatePhoneNumber();
            if (operation.Result && isFromDataDictionary)
            {
                if ((number.Substring(0, 1).Equals("+") || number.Substring(0, 2).Equals("00")))
                {
                    operation = number.ValidateWithDictionary();
                }
                else
                {
                    operation = new ValidationResult<bool>(false, null, "Phone number must have country code to validate from data dictionary. Country code must begin with either + or 00. Eg; +977 or 00977 for Nepal.");
                }
            }
            return operation;
        }
        /// <summary>
        /// Check whether phone number is valid or not for defined culture
        /// Culture denotes country language code i.e; NP
        /// </summary>
        /// <param name="number">number (string) to be validated as valid phone number</param>
        /// <param name="code">
        /// Country code must be provided to verify the phone number based on country.
        /// It has two alphabetes which is universal. Code cannot be number, empty string or null.
        /// Invalid code will result into invalid phone number.
        /// Example of country code; Nepal = NP, United States = US, Denmark = DK
        /// </param>
        /// <returns>validation result with properties, ErrorMessage (string), Exception and Result (bool)</returns>
        public static ValidationResult<bool> IsPhoneNumber(this string number, string code)
        {
            var operation = number.ValidatePhoneNumber();
            if (operation.Result && !string.IsNullOrEmpty(code) && code.Length.Equals(2) && Enum.TryParse(code, out CountryCodes countryCode))
            {
                var integerValue = CheckPhoneNumber.GetNumbers(number);
                operation = ValidateWithCountry(integerValue, code) ? new ValidationResult<bool>(true, null, "Success") : new ValidationResult<bool>(false, null, $"Invalid phone number {number}.");
            }
            else
            {
                operation = new ValidationResult<bool>(false, null, $"Invalid country code {code}.");
            }
            return operation;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="number"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        private static bool ValidateWithCountry(this string number, string code)
        {
            switch ((CountryCodes)Enum.Parse(typeof(CountryCodes), code, true))
            {
                case CountryCodes.NP:
                    return number.IsNepaliPhoneNumber();
                case CountryCodes.US:
                    return number.IsUSPhoneNumber();
                case CountryCodes.DK:
                    return number.IsDenmarkPhoneNumber();
                case CountryCodes.IN:
                    return number.IsIndiaPhoneNumber();
                case CountryCodes.CN:
                    return number.IsChinaPhoneNumber();
                case CountryCodes.UK:
                    return number.IsUKPhoneNumber();
                case CountryCodes.TH:
                    return number.IsThailandPhoneNumber();
                case CountryCodes.MY:
                    return number.IsMalaysiaPhoneNumber();
                case CountryCodes.SG:
                    return number.IsSingaporePhoneNumber();
                case CountryCodes.AF:
                    return number.IsAfghanistanPhoneNumber();
                case CountryCodes.DE:
                    return number.IsGermanyPhoneNumber();
                case CountryCodes.SE:
                    return number.IsSwedenPhoneNumber();
                case CountryCodes.CH:
                    return number.IsSwitzerlandPhoneNumber();
                case CountryCodes.CA:
                    return number.IsCanadaPhoneNumber();
                case CountryCodes.AU:
                    return number.IsAustraliaPhoneNumber();
                case CountryCodes.ZA:
                    return number.IsSouthAfricaPhoneNumber();
                case CountryCodes.NZ:
                    return number.IsNewZealandPhoneNumber();
                case CountryCodes.JP:
                    return number.IsJapanPhoneNumber();
                case CountryCodes.FR:
                    return number.IsFrancePhoneNumber();
                case CountryCodes.FI:
                    return number.IsFinlandPhoneNumber();
                case CountryCodes.AR:
                    return number.IsArgentinaPhoneNumber();
                case CountryCodes.KR:
                    return number.IsSouthKoreaPhoneNumber();
                case CountryCodes.NG:
                    return number.IsNigeriaPhoneNumber();
                case CountryCodes.AG:
                    return number.IsAntiguaBarbudaPhoneNumber();
                default:
                    return false;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        private static ValidationResult<bool> ValidateWithDictionary(this string number)
        {
            bool result = false;
            foreach (var countryCode in Enum.GetNames(typeof(CountryCodes)))
            {
                var integerValue = CheckPhoneNumber.GetNumbers(number);
                result = ValidateWithCountry(integerValue, countryCode);
                if (result)
                {
                    break;
                }
            }
            return result ? new ValidationResult<bool>(true, null, "Success") : new ValidationResult<bool>(false, null, $"Invalid phone number {number}."); ;
        }
    }
}
