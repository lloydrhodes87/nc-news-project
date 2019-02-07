// comment to try and redeploy node modules instlalled

const filterArticles = (articles, slug) => {
  if (!slug) {
    return articles;
  } else {
    return articles.filter(article => article.topic === slug);
  }
};

export default filterArticles;
