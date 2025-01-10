import { Controller, Get, Query, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWebsite(@Res() res: Response) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Instagram Highlight Viewer</title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: 'Arial', sans-serif;
              }

              body {
                  background-color: #fafafa;
                  color: #262626;
              }

              .container {
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 20px;
              }

              header {
                  background-color: #ffffff;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                  padding: 1rem 0;
                  margin-bottom: 2rem;
              }

              .header-content {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
              }

              h1 {
                  color: #262626;
                  font-size: 24px;
              }

              .search-section {
                  background-color: #ffffff;
                  padding: 2rem;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  margin-bottom: 2rem;
              }

              .search-form {
                  display: flex;
                  gap: 1rem;
                  max-width: 600px;
                  margin: 0 auto;
              }

              input {
                  flex: 1;
                  padding: 0.8rem;
                  border: 1px solid #dbdbdb;
                  border-radius: 4px;
                  font-size: 16px;
              }

              button {
                  background-color: #0095f6;
                  color: white;
                  border: none;
                  padding: 0.8rem 1.5rem;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 16px;
                  transition: background-color 0.3s;
              }

              button:hover {
                  background-color: #0081d6;
              }

              .result-section {
                  background-color: #ffffff;
                  padding: 2rem;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }

              .result-container {
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                  gap: 1rem;
              }

              .highlight-card {
                  background-color: #ffffff;
                  border: 1px solid #dbdbdb;
                  border-radius: 8px;
                  overflow: hidden;
              }

              .highlight-card img {
                  width: 100%;
                  height: 300px;
                  object-fit: cover;
              }

              .highlight-info {
                  padding: 1rem;
              }

              footer {
                  text-align: center;
                  padding: 2rem 0;
                  margin-top: 2rem;
                  color: #8e8e8e;
              }

              @media (max-width: 768px) {
                  .search-form {
                      flex-direction: column;
                  }

                  .container {
                      padding: 10px;
                  }
              }
          </style>
      </head>
      <body>
          <header>
              <div class="container">
                  <div class="header-content">
                      <h1>Instagram Highlight Viewer</h1>
                  </div>
              </div>
          </header>

          <main class="container">
              <section class="search-section">
                  <form class="search-form" id="searchForm">
                      <input 
                          type="text" 
                          placeholder="Enter Instagram Highlight ID"
                          id="highlightId"
                          required
                      >
                      <button type="submit">Search</button>
                  </form>
              </section>

              <section class="result-section">
                  <div class="result-container" id="results">
                      <!-- Results will be populated here -->
                  </div>
              </section>
          </main>

          <footer>
              <div class="container">
                  <p>© 2024 Instagram Highlight Viewer. All rights reserved.</p>
              </div>
          </footer>

          <script>
              document.getElementById('searchForm').addEventListener('submit', async (e) => {
                  e.preventDefault();
                  const highlightId = document.getElementById('highlightId').value;
                  
                  try {
                      const response = await fetch(\`/instagram/highlight?highlightId=\${highlightId}\`);
                      const data = await response.json();
                      
                      // Handle the response data here
                      const resultsDiv = document.getElementById('results');
                      resultsDiv.innerHTML = JSON.stringify(data, null, 2);
                  } catch (error) {
                      console.error('Error:', error);
                      alert('Error fetching highlight data');
                  }
              });
          </script>
      </body>
      </html>
    `;

    res.header('Content-Type', 'text/html').send(html);
  }

  @Get('instagram/highlight')
  async getHighlightInfo(
    @Query('highlightId') highlightId: string,
  ) {
    if (!highlightId) {
      throw new HttpException('Highlight ID is required', HttpStatus.BAD_REQUEST);
    }
    return this.appService.getHighlightInfo(highlightId);
  }
}
