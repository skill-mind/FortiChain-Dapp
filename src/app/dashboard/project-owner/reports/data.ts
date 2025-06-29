export interface ReportData {
    id: string;
    title: string;
    severity: "Critical" | "High" | "Medium" | "Low";
    score: number;
    date: string;
    amount:string;
    status: "Pending" | "Validated" | "Rejected";
    researcher: string;
    url?: string;
    description?: string;
    impact?: string;
    stepsToReproduce?: string[];
    poc?: string[];
    mitigation?: string[];
    language?: string[];
}

export const reports: ReportData[] = [
    {
        id: "#8793",
        title: "Filename parameter on Home Page",
        severity: "Critical",
        score: 9.6,
        amount: "$200",
        date: "3 Jan, 4:35 PM",
        status: "Pending",
        researcher: "@HYPElab",
        url: "https://example.com/home",
        description: "Attackers can exploit the Filename parameter to access sensitive files (e.g., /etc/passwd) by sending a crafted request, exposing critical server data.",
        impact: "The vulnerability of Local File Inclusion (LFI) on the home page 'https://example.com/home' can be attributed to the impact of the filename parameter. This vulnerability allows an attacker to manipulate the filename parameter in the URL to include arbitrary local files from the server.",
        stepsToReproduce: [
            "Go to the Home Page (https://example.com/home).",
            "Select any file from the selection section.",
            "Intercept the request in the Burp Suite Proxy tool and send it to the request repeater tab in Burp Suite Proxy tool."
        ],
        poc: ["Screenshot of Burp Suite showing file inclusion", "Code snippet showing vulnerable parameter"],
        mitigation: [
            "Implement input validation and sanitize user input to prevent the inclusion of unauthorized file paths or malicious input.",
            "Avoid using user-supplied input directly in file inclusion functions. Instead, use a whitelist approach or predefined file mappings."
        ],
        language: ["Python", "JavaScript"],
    },
    {
        id: "#8794",
        title: "Cross-Site Scripting (XSS) on Comment Section",
        severity: "High",
        score: 8.9,
        amount: "$200",
        date: "5 Jan, 10:00 AM",
        status: "Pending",
        researcher: "@BugHunterX",
        url: "https://example.com/blog/post/123#comments",
        description: "Reflected XSS vulnerability found in the comment submission form.",
        impact: "An attacker can inject malicious scripts into the webpage, affecting other users who view the comments. This can lead to session hijacking, defacement, or phishing.",
        stepsToReproduce: [
            "Navigate to the comment section of any blog post.",
            "Submit a comment containing a malicious script payload (e.g., `<script>alert('XSS')</script>`).",
            "Observe that the script executes when the comment is rendered."
        ],
        poc: ["Screenshot showing alert box execution", "Encoded payload used"],
        mitigation: [
            "Implement proper input sanitization and output encoding for all user-supplied data.",
            "Use a Content Security Policy (CSP) to mitigate the impact of successful XSS attacks."
        ],
        language: ["JavaScript", "Python"],
    },
    {
        id: "#8795",
        title: "Insecure Direct Object Reference (IDOR) in User Profile",
        severity: "High",
        score: 8.5,
        amount: "$200",
        date: "6 Jan, 2:15 PM",
        status: "Pending",
        researcher: "@SecureMind",
        url: "https://example.com/profile?id=123",
        description: "User profile data can be accessed by changing the 'id' parameter in the URL.",
        impact: "Unauthorized access to other users' sensitive profile information.",
        stepsToReproduce: [
            "Log in as a regular user.",
            "Go to your profile page (e.g., https://example.com/profile?id=your_id).",
            "Change the 'id' parameter in the URL to another user's ID.",
            "Verify that you can access the other user's profile data."
        ],
        poc: ["Screenshot of accessing another user's profile"],
        mitigation: [
            "Implement access control checks on the server-side for all requests accessing sensitive data.",
            "Use unpredictable identifiers instead of sequential user IDs."
        ],
        language: ["Rust", "Python", "JavaScript"],
    },

    {
        id: "#8796",
        title: "Broken Authentication - Weak Password Policy",
        severity: "Medium",
        score: 6.7,
        amount: "$200",
        date: "8 Jan, 9:00 AM",
        status: "Validated",
        researcher: "@InfoSecPro",
        url: "https://example.com/login",
        description: "The application allows users to set easily guessable passwords.",
        impact: "Increased risk of brute-force or dictionary attacks leading to account compromise.",
        stepsToReproduce: [
            "Attempt to register a user with a simple password like '123456' or 'password'.",
            "Observe that the password is accepted.",
            "Attempt to log in with common weak passwords against existing user accounts."
        ],
        poc: ["Screenshot showing successful registration with weak password"],
        mitigation: [
            "Enforce a strong password policy requiring minimum length, complexity (uppercase, lowercase, numbers, symbols), and disallowing common or previously breached passwords.",
            "Implement account lockout mechanisms after multiple failed login attempts."
        ],
        language: ["JavaScript", "Python", "Rust", "Cairo"],
    },
    {
        id: "#8797",
        title: "Security Misconfiguration - Directory Listing Enabled",
        severity: "Medium",
        score: 5.5,
        amount: "$200",
        date: "9 Jan, 1:00 PM",
        status: "Validated",
        researcher: "@NetSpy",
        url: "https://example.com/assets/",
        description: "Directory listing is enabled on the '/assets/' directory.",
        impact: "Attackers can view the contents of the directory, potentially revealing sensitive files, backups, or source code.",
        stepsToReproduce: [
            "Navigate to the URL https://example.com/assets/ in a web browser.",
            "Observe that a list of files and directories within '/assets/' is displayed."
        ],
        poc: ["Screenshot of the directory listing page"],
        mitigation: [
            "Disable directory listing on the web server configuration.",
            "Ensure that only necessary files are placed in publicly accessible directories."
        ],
        language: ["Rust", "Cairo"],
    },
    {
        id: "#8798",
        title: "Insufficient Logging & Monitoring",
        severity: "Low",
        score: 3.9,
        amount: "$200",
        date: "10 Jan, 11:30 AM",
        status: "Validated",
        researcher: "@LogSentinel",
        url: "https://example.com/dashboard",
        description: "Lack of adequate logging for security-relevant events.",
        impact: "Difficulty in detecting, investigating, and responding to security incidents.",
        stepsToReproduce: [
            "Perform a series of failed login attempts or attempt to access unauthorized resources.",
            "Check system logs (if accessible) and observe that these events are not logged or are logged without sufficient detail."
        ],
        poc: ["Description of events not found in logs"],
        mitigation: [
            "Implement comprehensive logging for all security-relevant events (logins, access attempts, errors, configuration changes, etc.).",
            "Establish a monitoring system to alert on suspicious activity patterns."
        ],
        language: ["Python", "JavaScript", "Rust"],
    },
    {
        id: "#8799",
        title: "Outdated Software Component",
        severity: "Low",
        score: 3.5,
        amount: "$200",
        date: "11 Jan, 4:00 PM",
        status: "Validated",
        researcher: "@PatchMeUp",
        url: "https://example.com",
        description: "The application is using an outdated version of a third-party library with known vulnerabilities.",
        impact: "Potential exploitation of vulnerabilities in the outdated component.",
        stepsToReproduce: [
            "Use a vulnerability scanner or manual inspection (e.g., checking library versions in browser developer tools or source code) to identify outdated components.",
            "Refer to public vulnerability databases (CVEs) for known issues in that specific version."
        ],
        poc: ["Identified outdated library and its version"],
        mitigation: [
            "Regularly update all third-party libraries and frameworks to their latest versions.",
            "Use dependency scanning tools to identify outdated components."
        ],
        language: ["JavaScript", "Solidity"],
    },

    {
        id: "#8800",
        title: "SQL Injection - Contact Form",
        severity: "Critical",
        score: 9.1,
        amount: "$200",
        date: "12 Jan, 9:30 AM",
        status: "Rejected",
        researcher: "@DBNinja",
        url: "https://example.com/contact",
        description: "Attempted SQL injection through the contact form message field.",
        impact: "Potential unauthorized access, modification, or deletion of database content.",
        stepsToReproduce: [
            "Go to the contact form page.",
            "Enter a malicious SQL payload in the message field (e.g., `' OR '1'='1`).",
            "Submit the form and observe the application's response or any errors."
        ],
        poc: ["Screenshot showing error message or unexpected behavior"],
        mitigation: [
            "Use parameterized queries or prepared statements to prevent SQL injection.",
            "Validate and sanitize user input before using it in database queries.",
            "Implement least privilege for database users."
        ],
        language: ["Python", "Rust", "Solidity"],
    },
    {
        id: "#8801",
        title: "Denial of Service (DoS) - Resource Exhaustion",
        severity: "Low",
        score: 2.2,
        amount: "$200",
        date: "13 Jan, 2:00 PM",
        status: "Rejected",
        researcher: "@FloodKing",
        url: "https://example.com/upload",
        description: "Attempted to upload a large file to cause resource exhaustion.",
        impact: "Potential unavailability of the service due to server overload.",
        stepsToReproduce: [
            "Attempt to upload an extremely large file through the upload feature.",
            "Monitor server resources (CPU, memory) during the upload attempt."
        ],
        poc: ["Description of the large file attempt and server response"],
        mitigation: [
            "Implement file size limits for uploads.",
            "Use rate limiting on resource-intensive endpoints.",
            "Monitor server resource usage and implement scaling if necessary."
        ],
        language: ["JavaScript", "Rust", "Cairo", "Solidity"],
    },
    {
        id: "#8802",
        title: "Phishing Attempt Reported",
        severity: "Low",
        score: 2.9,
        amount: "$200",
        date: "14 Jan, 10:00 AM",
        status: "Rejected",
        researcher: "@CommunityWatch",
        url: "https://malicious-example.com",
        description: "User reported receiving a phishing email impersonating the service.",
        impact: "Potential compromise of user credentials if they fall for the phishing attempt.",
        stepsToReproduce: [],
        poc: ["Screenshot of the phishing email"],
        mitigation: [
            "Educate users about phishing awareness.",
            "Implement DMARC, SPF, and DKIM to prevent email spoofing.",
            "Take down malicious phishing sites if possible."
        ],
        language: ["Python", "JavaScript"],
    },
    {
        id: "#8803",
        title: "Spam Detected on Forum",
        severity: "Low",
        score: 1.5,
        amount: "$200",
        date: "15 Jan, 3:00 PM",
        status: "Rejected",
        researcher: "@AntiSpamBot",
        url: "https://example.com/forum",
        description: "Automated spam posts detected on the public forum.",
        impact: "Degradation of user experience and potential spread of malicious links.",
        stepsToReproduce: [
            "Visit the public forum.",
            "Observe presence of unrelated or promotional posts."
        ],
        poc: ["Screenshot of spam posts"],
        mitigation: [
            "Implement CAPTCHA or reCAPTCHA for forum submissions.",
            "Use spam detection filters and moderation.",
            "Implement rate limiting for posting."
        ],
        language: ["JavaScript", "Cairo"],
    },
    {
        id: "#8804",
        title: "Informational - HTTP Security Headers Missing",
        severity: "Low",
        score: 6.4,
        amount: "$200",
        date: "16 Jan, 11:00 AM",
        status: "Rejected",
        researcher: "@HeaderChecker",
        url: "https://example.com",
        description: "Several recommended HTTP security headers (e.g., Strict-Transport-Security, Content-Security-Policy) are missing.",
        impact: "Lack of these headers can expose users to certain types of attacks, although it's not a direct vulnerability in the application logic itself.",
        stepsToReproduce: [
            "Use a security header checker tool or browser developer tools to inspect the HTTP response headers.",
            "Identify missing security headers."
        ],
        poc: ["Output from a security header checker tool"],
        mitigation: [
            "Configure the web server or application framework to include recommended HTTP security headers.",
            "Implement a robust Content Security Policy (CSP)."
        ],
        language: ["Rust", "Solidity", "Python"],
    },
];

export const mockReports = [
    {
        id: 1,
        project: "SkillNet",
        vulnerabilitiesFound: 4,
        totalBountyPaid: "$5,200.13",
        status: "Completed"
    },
    {
        id: 2,
        project: "SkillNet",
        vulnerabilitiesFound: 4,
        totalBountyPaid: "$5,200.13",
        status: "Ongoing"
    },
    {
        id: 3,
        project: "SkillNet",
        vulnerabilitiesFound: 4,
        totalBountyPaid: "$5,200.13",
        status: "Closed"
    },
    {
        id: 4,
        project: "SkillNet",
        vulnerabilitiesFound: 4,
        totalBountyPaid: "$5,200.13",
        status: "Completed"
    },
    {
        id: 5,
        project: "SkillNet",
        vulnerabilitiesFound: 4,
        totalBountyPaid: "$5,200.13",
        status: "Completed"
    }
];