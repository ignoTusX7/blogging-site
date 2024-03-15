# Blogging Site using Hono App with Cloudflare Workers

This project is a Blogging Site implemented using the Hono app framework and deployed as Cloudflare Workers. It provides a simple yet powerful platform for bloggers to create and manage their content.

## Getting Started

Follow these steps to initialize and deploy the Blogging Site:

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Wrangler CLI (Cloudflare Workers CLI)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/ignoTusX7/blogging-site.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blogging-site/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```
   or
   
    ```bash
   yarn
   ```

### Configuration

1. Rename `.env.example` file to `.env`:

   ```bash
   mv .env.example .env
   ```

2. Open `.env` file and update the following configurations:

   - `DATABASE_URL`: The base URL of your POSTGRES DATABASE.

3. Create wrangler.toml file

    **For Unix-like Systems (Linux, macOS, etc.):**
    ```bash
    echo 'name = "backend"
    compatibility_date = "2023-12-01"
    
    [vars]
    DATABASE_URL="your_connection_pool_url"
    JWT_SECRET="your_jwt_secret"' > wrangler.toml
    ```

    **For Windows PowerShell:**
    ```powershell
    Set-Content -Path "wrangler.toml" -Value 'name = "backend"
    compatibility_date = "2023-12-01"
    
    [vars]
    DATABASE_URL="your_connection_pool_url"
    JWT_SECRET="your_jwt_secret"'

    ```
    
### Deployment

1. Initialize your Cloudflare Worker project using Wrangler:

   ```bash
   wrangler init
   ```

   Follow the prompts to authenticate with your Cloudflare account.

2. Build and deploy the Cloudflare Worker:

   ```bash
   npm run deploy
   ```
   or
   ```bash
   yarn deploy
   ```

   This command will build your Worker and deploy it to Cloudflare.

### Accessing the Blogging Site

Once deployed, your Blogging Site will be accessible via the route you specified during configuration (e.g., `https://example.com`). You can now start creating and managing your blog content.
