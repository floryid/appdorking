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
    id: 'sql-injection',
    query: 'site:${domain} inurl:id= | inurl:pid= | inurl:category= | inurl:page= | inurl:view=',
    path: '/product.php?id=1',
    title: 'Potential SQL Injection Point',
    description: 'URL parameters found that might be vulnerable to SQL injection attacks. These could allow unauthorized database access.',
    tags: ['sqli', 'injection']
  }
];