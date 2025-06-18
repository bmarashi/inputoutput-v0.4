# inputoutput.xyz v0.4

A web application where users can create accounts and post content. Each user has their own unique page with their posts.

## Features

- User authentication (login/register)
- Personalized post pages for each user
- URL structure: `/username` for each user's posts
- Modern, clean UI with monospace font
- Link detection and formatting in posts
- GitHub-style @username handles

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file with your configuration:
```
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///site.db
```

3. Run the application:
```bash
flask run
```

## Deploying to Netlify

1. Create a new Netlify site
2. Connect your GitHub repository
3. Set up environment variables in Netlify dashboard
4. Deploy

The application will be available at your Netlify URL with user pages accessible at `your-netlify-url.com/username`
