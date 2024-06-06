# Project Title

This Project is live in [Dellos Test](https://dellos-test.vercel.app/)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Pages](#pages)
- [Additional Information](#additional-information)
- [Contact Information](#contact-information)

## Installation

```bash
# Clone the repository
git clone https://github.com/ihda06/dellos-test.git

# Navigate to the project directory
cd dellos-test

# Install dependencies
npm install

```

## Usage

Setting env file by creating .env.local

```bash
NEXT_PUBLIC_NEWS_API_KEY=yourapikey
```

Run the project

```bash
npm run dev
```

## Pages

### Home ("/")

The Home page serves as the landing page for the application, providing an overview and easy navigation to other sections of the website.

#### Features:

- Welcome message and introduction to the application.
- Navigation links to Articles, My Articles, and Lucky Coin pages.

#### How to Access:

- Simply navigate to the root URL of the application.

### Articles ("/articles")

The Articles page lists all the available articles fetched from the NYT Developer API. Users can browse through these articles and select any to view its details.

#### Features:

- List of articles with titles and brief descriptions.
- Links to view detailed information about each article.
- Search by keywords and filter by most shared, viewed and emailed
- Pagination controls for navigating through multiple pages of articles.

#### How to Access:

- Click on the "Articles" link from the Home page or go directly to `/articles`.

### Detail Article ("/articles/[id]")

The Detail Article page provides comprehensive information about a specific article. Users can purchase the article if they wish to read the full content.

#### Features:

- Detailed information about the selected article.
- "Buy" button to purchase the article using coins.
- Coin balance display.

#### How to Access:

- From the Articles page, click on the detail of any article to be redirected to its detail page (URL pattern: `/articles/[id]`).

### My Articles ("/my-articles")

The My Articles page displays all the articles that the user has purchased. Users can read these articles in full.

#### Features:

- List of purchased articles with links to read them.
- Display of article details for each purchased article.

#### How to Access:

- Click on the "My Articles" link from the Home page or go directly to `/my-articles`.

### Lucky Coin ("/lucky-coin")

The Lucky Coin page is where users can redeem rewards after making a purchase totaling 50,000 coins. Upon reaching this milestone, users receive 3 tickets for a lucky draw game where they have the chance to win various prizes.

#### Features:

- Redeem rewards after reaching a purchase milestone of 50,000 coins.
- Lucky draw game with the opportunity to win prizes.
- Display of the prizes available for the lucky draw.

#### How to Access:

- Click on the "Lucky Coin" link from the Home page or go directly to `/lucky-coin`.

### Navigation Summary

- **Home:** Start here to get an overview and navigate to other pages.
- **Articles:** Browse all available articles and select any to see more details.
- **Detail Article:** View and purchase detailed information about a selected article.
- **My Articles:** Access and read all articles you have purchased.
- **Lucky Coin:** Reedem the prizes

By following the navigation and utilizing these pages, users can fully engage with the web application, exploring articles, making purchases, and enjoying interactive features.

## Additional Information

### Available Unit test (JEST)

- Testing to render data correctly
- Testing to show price correctly
- Testing to show my coin correctly
- Testing to buy article correctly

### Tech stack

- NextJS page router
- HeadlessUi
- Tanstack useQuery
- DayJs
- next-cookies
- axios

### Notes

- **Responsive Design:** Please note that while efforts were made to ensure basic functionality , extensive responsiveness to mobile views was not a primary focus during development. Due to time constraints, the application may not provide an optimal user experience on smaller screens.

## Contact Information

If you have any questions, feedback, or suggestions regarding this project, feel free to contact us using the following methods:

- **Email:** [ihdaanwari5@gmail.com](mailto:ihdaanwari5@gmail.com)
- **Instagram:** [@ihda.anwari](https://instagram.com/ihda.anwari)
- **GitHub:** [ihda06](https://github.com/ihda06)
- **Linkedin:** [Ihda Anwari](https://www.linkedin.com/in/ihda-anwari/)
