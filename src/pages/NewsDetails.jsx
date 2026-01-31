import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNews } from "../services/newsApi";

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);

  useEffect(() => {
    async function loadNews() {
      const data = await getNews();
      const found = data.find(n => String(n.id) === id);
      setNews(found);
    }
    loadNews();
  }, [id]);

  if (!news) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div className="news-details">
      <h2>{news.title}</h2>
      <p>{news.description}</p>

      <button onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}
