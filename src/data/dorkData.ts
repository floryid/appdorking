export const dorkData = [
  {
    id: 'admin-panel',
    query: 'site:${domain} inurl:admin | inurl:login | inurl:administrator | inurl:adm',
    path: '/admin',
    title: 'Administrative Panel Exposed',
    description: 'Admin login panel publicly accessible. This could allow attackers to attempt brute force attacks or exploit weak credentials.',
    tags: ['admin', 'authentication']
  },
  {
    id: 'config-files',
    query: 'site:${domain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini',
    path: '/config.php',
    title: 'Configuration File Exposure',
    description: 'Sensitive configuration files exposed. These may contain database credentials, API keys, or other security-critical information.',
    tags: ['config', 'sensitive-data']
  },
  {
    id: 'database-files',
    query: 'site:${domain} ext:sql | ext:dbf | ext:mdb | ext:db',
    path: '/backup/database.sql',
    title: 'Database Backup Exposed',
    description: 'Database dump or backup files are publicly accessible. These often contain sensitive user data including credentials.',
    tags: ['database', 'backup']
  },
  {
    id: 'log-files',
    query: 'site:${domain} ext:log | ext:logs',
    path: '/logs/error.log',
    title: 'Log Files Accessible',
    description: 'Server log files are publicly accessible. These may reveal internal paths, errors, and even user data or session information.',
    tags: ['logs', 'information-disclosure']
  },
  {
    id: 'directory-listing',
    query: 'site:${domain} intitle:"Index of /" "Parent Directory"',
    path: '/assets/',
    title: 'Directory Listing Enabled',
    description: 'Directory listing is enabled, allowing attackers to browse server directories and discover sensitive files.',
    tags: ['directory', 'misconfiguration']
  },
  {
    id: 'backup-files',
    query: 'site:${domain} ext:bak | ext:old | ext:backup | ext:~ | ext:swp',
    path: '/includes/config.php.bak',
    title: 'Backup Files Exposed',
    description: 'Backup files are publicly accessible. These may contain sensitive data or source code.',
    tags: ['backup', 'source-code']
  },
  {
    id: 'git-exposure',
    query: 'site:${domain} inurl:".git"',
    path: '/.git/config',
    title: 'Git Repository Exposed',
    description: 'Git repository is publicly accessible. This could allow attackers to download source code and find sensitive information.',
    tags: ['git', 'source-code']
  },
  {
    id: 'php-info',
    query: 'site:${domain} ext:php intitle:"phpinfo()"',
    path: '/info.php',
    title: 'PHP Info Exposed',
    description: 'PHP configuration information is publicly accessible, revealing server settings, installed modules, and environment variables.',
    tags: ['php', 'information-disclosure']
  },
  {
    id: 'error-messages',
    query: 'site:${domain} "Warning:" | "Error:" | "SQL syntax" | "incorrect syntax"',
    path: '/search.php?q=test',
    title: 'Error Messages Exposed',
    description: 'Error messages are publicly visible, potentially revealing SQL syntax, file paths, or other sensitive information.',
    tags: ['error', 'information-disclosure']
  },
  {
    id: 'api-keys',
    query: 'site:${domain} "api_key" | "apikey" | "client_secret" | "api token"',
    path: '/js/main.js',
    title: 'API Keys Exposed',
    description: 'API keys or tokens have been found in client-side code. These could be used to access protected services.',
    tags: ['api', 'credentials']
  },
  {
    id: 'wordpress-files',
    query: 'site:${domain} inurl:wp-content | inurl:wp-includes',
    path: '/wp-config.php',
    title: 'WordPress Configuration Exposed',
    description: 'WordPress configuration files are accessible. These contain database credentials and security keys.',
    tags: ['wordpress', 'cms']
  },
  {
    id: 'sqli-basic',
    query: 'site:${domain} inurl:id= | inurl:cat= | inurl:pid= | inurl:product= | inurl:news= | inurl:item= | inurl:shop= | inurl:profile= | inurl:uid= | inurl:userid= | inurl:order= | inurl:report=',
    path: '/index.php?id=1',
    title: 'Basic SQL Injection Point',
    description: 'Parameter pada URL yang umum digunakan dan berpotensi rentan terhadap serangan SQL Injection.',
    tags: ['sqli', 'injection', 'parameter']
  },
  {
    id: 'sqli-union',
    query: 'site:${domain} inurl:".php?id=" "UNION SELECT" -site:stackoverflow.com',
    path: '/index.php?id=1 UNION SELECT 1,2,3',
    title: 'SQLi UNION SELECT',
    description: 'Mendeteksi kemungkinan penggunaan UNION SELECT pada parameter yang rentan SQL Injection.',
    tags: ['sqli', 'union', 'injection']
  },
  {
    id: 'sqli-error-based',
    query: 'site:${domain} inurl:id= "You have an error in your SQL syntax;" | "mysql_fetch" | "ORA-00933" | "Syntax error" | "Warning: mysql_"',
    path: '/index.php?id=1',
    title: 'SQLi Error Based',
    description: 'Pesan error SQL yang muncul di halaman dapat mengindikasikan kerentanan SQL Injection.',
    tags: ['sqli', 'error', 'injection']
  },
  {
    id: 'sqli-boolean-based',
    query: 'site:${domain} inurl:id= "AND 1=1" | "AND 1=2"',
    path: '/index.php?id=1 AND 1=1',
    title: 'SQLi Boolean Based',
    description: 'Payload boolean untuk mendeteksi SQL Injection berbasis logika TRUE/FALSE.',
    tags: ['sqli', 'boolean', 'injection']
  },
  {
    id: 'sqli-time-based',
    query: 'site:${domain} inurl:id= "SLEEP(5)" | "WAITFOR DELAY" | "BENCHMARK("',
    path: '/index.php?id=1 SLEEP(5)',
    title: 'SQLi Time Based',
    description: 'Payload time-based untuk mendeteksi SQL Injection dengan delay waktu.',
    tags: ['sqli', 'time', 'injection']
  },
  {
    id: 'xss-basic',
    query: 'site:${domain} inurl:q= | inurl:s= | inurl:search= | inurl:query= | inurl:keyword= | inurl:message= | inurl:comment= | inurl:email= | inurl:page= | inurl:redirect= | inurl:url=',
    path: '/search.php?q=<script>alert(1)</script>',
    title: 'Basic XSS Point',
    description: 'Parameter umum yang sering menjadi target serangan XSS.',
    tags: ['xss', 'injection', 'parameter']
  },
  {
    id: 'xss-script-tag',
    query: 'site:${domain} "<script>alert(1)</script>"',
    path: '/index.php?q=<script>alert(1)</script>',
    title: 'XSS Script Tag',
    description: 'Payload XSS klasik menggunakan tag <script>.',
    tags: ['xss', 'script', 'injection']
  },
  {
    id: 'xss-img-onerror',
    query: 'site:${domain} "<img src=x onerror=alert(1)>"',
    path: '/index.php?q=<img src=x onerror=alert(1)>',
    title: 'XSS Image OnError',
    description: 'Payload XSS menggunakan atribut onerror pada tag img.',
    tags: ['xss', 'img', 'onerror', 'injection']
  },
  {
    id: 'xss-html-attribute',
    query: 'site:${domain} "onmouseover=alert(1)"',
    path: '/index.php?q=" onmouseover=alert(1)',
    title: 'XSS HTML Attribute',
    description: 'Payload XSS menggunakan event handler HTML seperti onmouseover.',
    tags: ['xss', 'attribute', 'injection']
  },
  {
    id: 'xss-svg',
    query: 'site:${domain} "<svg/onload=alert(1)>"',
    path: '/index.php?q=<svg/onload=alert(1)>',
    title: 'XSS SVG OnLoad',
    description: 'Payload XSS menggunakan tag SVG dan event onload.',
    tags: ['xss', 'svg', 'onload', 'injection']
  },
  {
    id: 'xss-meta-refresh',
    query: 'site:${domain} "<meta http-equiv=refresh content=0;url=javascript:alert(1)>"',
    path: '/index.php?q=<meta http-equiv=refresh content=0;url=javascript:alert(1)>',
    title: 'XSS Meta Refresh',
    description: 'Payload XSS menggunakan tag meta refresh.',
    tags: ['xss', 'meta', 'refresh', 'injection']
  },
  {
    id: 'wordpress-files',
    query: 'site:${domain} inurl:wp-content | inurl:wp-includes',
    path: '/wp-config.php',
    title: 'WordPress Configuration Exposed',
    description: 'WordPress configuration files are accessible. These contain database credentials and security keys.',
    tags: ['wordpress', 'cms']
  },
  {
    id: 'sql-injection',
    query: 'site:${domain} inurl:id= | inurl:pid= | inurl:category= | inurl:page= | inurl:view=',
    path: '/product.php?id=1',
    title: 'Potential SQL Injection Point',
    description: 'URL parameters found that might be vulnerable to SQL injection attacks. These could allow unauthorized database access.',
    tags: ['sqli', 'injection']
  }
];