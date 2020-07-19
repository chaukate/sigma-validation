using System.Linq;

namespace Sigma.Validation
{
    internal static class US
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        internal static bool IsUSPhoneNumber(this string number)
        {
            bool result = IsInternationalCodes(number) || IsAreaCode(number);
            return result;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        private static bool IsInternationalCodes(string number)
        {
            bool isValid = false;
            if (number.Substring(0, 3).Equals("001") && number.Length.Equals(13))
            {
                isValid = IsPhone(number, 3);
            }
            return isValid;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        private static bool IsAreaCode(string number)
        {
            bool isValid = false;
            if (number.Length.Equals(10))
            {
                isValid = IsPhone(number, 0);
            }
            return isValid;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="integerValue"></param>
        /// <param name="startIndex"></param>
        /// <returns></returns>
        private static bool IsPhone(string integerValue, int startIndex)
        {
            bool isPhone = DataCollections.US_AreaCodes.Contains(integerValue.Substring(startIndex, 3));
            return isPhone;
        }
    }
}