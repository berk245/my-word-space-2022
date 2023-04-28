# Cyber Security

## Introduction
This document outlines my efforts to improve the security of my full stack web application by analysing its potential vulnerabilities and incorporating security measures into the application design to the best of my knowledge and ability.

<summary><b>Table of contents</b></summary>

- [Approach](#approach)
- [Threat model and Security Measures](#threat-model-and-security-measures)
	- [Access to infrastructure](#access-to-infrastructure)
	- [Comprimised accounts due to weak passwords](#comprimised-accounts-due-to-weak-passwords)
	- [Broken Access Control and Identification and Authentication Failures](#broken-access-control-and-identification-and-authentication-failures)
	- [Sensitive Data Exposure](#sensitive-data-exposure)
	- [Cross Site Scripting](#cross-site-scripting)
	- [SQL injection](#sql-injection)
	- [DoS Attack](#dos-attack)
	- [Insufficient Logging and Monitoring](#insufficient-logging-and-monitoring)
	- [Security issues in dependencies](#security-issues-in-dependencies)
	- [Stolen JWT Session Token](#stolen-jwt-session-token)
	- [Too verbose error messages](#too-verbose-error-messages)



## Approach

To understand the vulnerabilities and improve the security of the application I created a threat model.

In creation of this model, I have used 
-  [OWASP Top Ten security risks list](https://owasp.org/www-project-top-ten/) 
-  [PortSwigger Web Security Academy](https://portswigger.net/web-security/) content and exercises 
-  Other module resources and content in learning units.

When applicable, I analyzed each threat in the model in three angles; protection, detection; and reaction after an exploitation. 

## Threat model and Security Measures

### Access to Infrastructure

* Unauthorized direct access, for example with an exposed SSH key, to the EC2 instance hosting the backend code and database would pose a serious threat to the system's security, as it could lead to potential data breaches and system downtime.

* Protection
    - [x] Use a strong password for the SSH key
    - [x] Require Two-Factor Authentication on logins with an SSH key
* Detection
	- [ ] Implement intrusion detection and monitoring methods.
* Reaction
    - Stop the instance immediately to prevent further damage.
    - Change all passwords and access keys associated with the EC2 instance and the AWS profile.
    - Review logs and any available information to analyse the attack and its impact.
    - If any data was accessed, notify any affected parties.
    - Launch a new instance and review its security settings to ensure they are properly configured.


### Comprimised accounts due to weak passwords

* Protection
    - [x] Implement strict password requirements (min 8 chars, must contain a digit, an uppercase letter, and a special character)  
* Detection
	- [x] Validate password before signup.
* Reaction
    
### Broken Access Control and Identification and Authentication Failures

* Protection
	- [x] Require authorization for every endpoint. (except authentication endpoints)
	- [x] Extract user id from authorization token. Use that in database queries to make sure user can only access the information belongs to them.
* Detection
	- [x] Log every request with detailed information.
	- [x] Regularly monitor the logs for suspicious activity.
* Reaction
	* Inform users directly if personal data was exposed.
    * Revert all modifications they did based on the logs.

### Sensitive Data Exposure

* Protection
	- [x] Require authorization for every endpoint (except authentication endpoints)
	- [x] Store sensitive information encrypted (currently applied only for passwords)
* Detection
	- [x] Log every request with detailed information.
	- [x] Regularly monitor the logs for suspicious activity.
* Reaction
	* Inform users directly if personal data was exposed.
    * Revert all modifications they did based on the logs.

### Cross Site Scripting
* Protection
	- [x] Use JSX and state variables to render user input, which helps prevent XSS attacks by escaping potentially malicious characters. 
	    - [More info here](https://legacy.reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)
* Detection
	- [ ] Use automated testing tools that can detect potential XSS vulnerabilities in your web application.
* Reaction
    * Disable the vulnerable functionality
    * Inform users directly if personal data was exposed 
    * Remove the malicious script and patch the vulnerability



### SQL injection
* Protection
    - [x] Use Sequelize to parameterize queries.
* Detection
	- [x] Regularly check database logs for unusual activities.
* Reaction
	* Inform users directly if personal data was exposed.
    * Revert malicious SQL activity based on logs.

### DoS Attack
* Protection
    - [x] Rate limit API to max 100 calls per minute.
    - [ ] Load balancing 
        - with multiple AWS EC2 Instances and Nginx.
   
* Detection
	- [ ] Monitor request volume and resource usage.
* Reaction
	* Block IP range of attacker.


### Insufficient Logging and Monitoring

* Protection
    - [x] Implement detailed request and error logging to provide visibility into system events.
* Detection
    - [x] Regularly review system logs and monitor key system metrics to identify anomalies or suspicious activity.
* Reaction

### Security issues in dependencies

* Protection
    - [x] Conduct regular vulnerability scans on dependencies and their versions to identify potential security issues.
    - [x] Use only trusted and well-maintained dependencies, and avoid using deprecated or unsupported libraries.
* Detection
* Reaction
    * Update dependency of concern and check if vulnerability was exploited.

### Stolen JWT Session Token

* Protection
    - [x] Set token expiration time to 1 hour.
    - [ ] Use HTTP only cookies to pass the tokens.
    - [ ] Implement a token blacklist.
* Detection
* Reaction
    - [ ] Revoke the token by putting it into the blacklist.


### Too verbose error messages

* Protection
    - [x] Display abstract error messages to clients.
    - [x] Log detailed debug messages in CloudWatch.
* Detection
* Reaction