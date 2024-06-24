### How can we design the system in a way that every company will be able to serve games on their gaming site from their domain?

To design a system where each company can serve games from their own domain, we should adopt a multi-tenant architecture. Each tenant (company) will have its own subdomain or custom domain, and the system should route requests to the appropriate tenant's resources. This can be achieved using the following methods:

* __Domain Mapping__: Configure the server to recognize custom domains and map them to the correct tenant. This can be done using DNS settings and web server configurations (e.g., NGINX or Apache virtual hosts).
* __Tenant Identification__: Use the HTTP request's Host header to identify the tenant. This requires modifying the application to parse the domain and determine which tenant the request is for.
* __Separate Data Stores__: While optional, separating the databases or using schema-based multi-tenancy can enhance security and data management.

### What modification should be done to the users table at gPlatform to support this change?

To support multiple tenants, the `users` table should be modified to include a reference to the tenant (company). This can be done by adding a `tenant_id` column, which links each user to the company they belong to. Here's a possible modification:

`ALTER TABLE users ADD COLUMN tenant_id INT NOT NULL;`

The `tenant_id` would be a foreign key referencing a `tenants` table that stores information about each tenant (company).
##### Example tenants table:

`CREATE TABLE tenants (`
    `tenant_id INT PRIMARY KEY AUTO_INCREMENT,`
    `name VARCHAR(255) NOT NULL,`
    `domain VARCHAR(255) NOT NULL UNIQUE`
`);`

### Considering we have 1 backend cluster that serves all companies, how can we validate a user login on one gaming domain in such a way that it does not give access to a different gaming domain?

To ensure that user authentication is domain-specific, the following steps should be taken:

* __Tenant-Aware Authentication__: When a user attempts to log in, the authentication process should include the `tenant_id` in the validation. This means that the login credentials (e.g., email and password) must be checked in conjunction with the `tenant_id`.
* __Session Management__: Ensure that session tokens or JSON Web Tokens include the `tenant_id` as part of the payload. This ensures that any authenticated session is tied to a specific tenant.

##### Key Points:
* __Tenant Resolution__: Use the domain from the HTTP request to resolve the `tenant_id`.
* __Scoped Queries__: Ensure all user-related queries are scoped to the `tenant_id` to prevent cross-tenant data leakage.
* __Token Scoping__: Include `tenant_id` in authentication tokens to enforce tenant-specific access control.

By implementing these strategies, we can ensure that each company's users can only access their respective gaming site, maintaining isolation and security across tenants.