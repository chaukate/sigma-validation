# Summary
## Validation Plugin under active development. Functionality and documentation my change without notice. ##
## Latest - v1.0.5 ##

This plugin provides programmatic access to several data valiadtion functions. It consists of two validating modules.
Each modules consists of one or more actions that perform an operation against your data validation process.
All of the methods will return result object indicating success or failure, any exceptions thrown and the resulting data.

### Target Framework: .Net Standard 2.1, .Net Core 3.1 ###

# SigmaValidation
## Validating Data
### OperationResult<T>
- `Result`: Dynamic type data (bool, int, object)
- `Message`: String value denoting success and failure of request or operation
- `Exception`: Exception is set if there is any exception occurred during operation
## Phone Number Validation
    Validates phone number.
    namespace: Sigma.Validation
    
## Methods
### `IsPhoneNumber`:  
    - Check whether phone number is valid or not.
    - Result is true for valid phone number
    - Result is false for invalid phone number and message is set in error message, if exception has occurred while checking then Exception is set
    - Eg;   
                var phoneNumber = "+9779876543210";
                var result = phoneNumber.IsPhoneNumber();

### `IsPhoneNumber(string code)`:  
    - Check whether phone number is valid or not for provided country.
    - Support country, currently available;
        - Nepal (NP)
        - United States (US)
        - Denmark (DK)
        - India (IN)
        - China (CN)
        - United Kingdom (UK)
        - Thailand (TH)
        - Malaysia (MY)
        - Singapore (SG)
        - Afghanistan (AF)
        - Germany (DE)
        - Sweden (SE)
        - Switzerland (CH)
        - Canada (CA)
        - Australia (AU)
        - South Africa (ZA)
        - Japan (JP)
        - Franch (FR)
        - Finland (FI)
        - Argentina (AR)
        - South Korea (KR)
        - Nigeria (NG)
        - Antigua Barbuda (AG)
    - Result is true for valid phone number
    - Result is false for invalid phone number and message is set in error message, if exception has occurred while checking then Exception is set
    - Eg;   
                var phoneNumber = "+9779876543210";
                var result = phoneNumber.IsPhoneNumber("NP");
## Email Validation
    Validates email.
    namespace: Sigma.Validation
	
### `IsEmail`: 
    - Check whether the email is valid or not.
    - Operation resut is true for valid email
    - False if email address is not valid. Message is set and if exception occurred exception is set
    - Eg;   
                var email = "someemail@somedomain.com";
                var result = email.IsEmail();