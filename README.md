# Email Analyzer User Interface

The Sentinel Systems Email Analysis Platform is a containerized email security solution designed to analyze *.eml* files for spam, phishing, and malicious content. The system extracts key email components, performs multilayer analysis, and generates a risk score along with actionable insights for users. This website is designed to interface with our API tool ([view on GitHub](https://github.com/Sentinel-Systems-Drexel/backend)). 

## Technical Overview

### Network Infrastructure

![<Infrastructure Diagram>](https://sentinel-systems.cc/infra-diagram.png)

The website and API are only accessible through our registered domain name. Connections to the server are proxied through a Cloudflare Tunnel. This tunnel encrypts traffic using TLS 1.3 and masks the IP address of the origin server to gaurd against direct attacks. Software on the server monitors incoming SSH connections to prevent brute-force attacks as well.

All containers run on a secure Docker network. The API is the only entry point, so there is no direct access to analysis services or any of the internal containers. Health checks ensure each service is running properly before the API endpoint is exposed and requests can be processed.

### Diff-Checker

The Diff-Checker helps identify spoofing and phishing attempts more effectively by comparing a potenially malicious email to a known legitimate email.

**Comparison Factors**

- Sender address and domain
- Authentication results (SPF, DKIM, DMARC, ARC)
- Risk score differences
- Symbol differences
- Shared or mismatched IP addresses
- Body similarity

**Output**

- Risk assessment (ex. likely fraudulent)
- Highlighted anomalies
- Score comparison

### Scoring Model

- The platform currently uses Rspamd as its primary scoring engine
- Each email is evaluated based on triggered rules (symbols)
- Each symbol contributes a positive or negative value

**Scoring Behavior**

- Positive values → increase suspicion
- Negative values → indicate legitimacy
- Final score = sum of all symbol values

**Interpretation**

- Low or negative score → likely safe
- Moderate score → suspicious
- High score → likely malicious

### Limitations

- Score interpretation is not yet user-friendly
- Some header parsing is still in development
- UI improvements are ongoing

### Planned Enhancements

Future changes will make the service more user-friendly for everyone. The platform is also being extended to include custom heuristic scoring. These changes will enhance detection by combining rule-based and behavior-based analysis.

- Clear “Safe / Suspicious / Malicious” labels
- Expanded header parsing with JSON output
- IP reputation integration
- Improved UI/UX
- Additional API endpoints

**Additional changes:**
- Sender Address Pattern Analysis
    - Detects random character strings and numeric-heavy addresses
    - Flags non-human readable sender formats
- Heuristic Weighting
    - Adds risk points for known phishing patterns
    - Detects domain inconsistencies
- Composite Risk Score
    - Future score model: Rspamd Score + Custom Heuristic Weights

### Continuous Deployment

![<CD Pipeline Diagram>](https://sentinel-systems.cc/cicd-diagram.png)

This is our process for testing, staging, and deploying updates and bug fixes as they are completed.