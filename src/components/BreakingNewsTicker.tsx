import { AlertCircle } from "lucide-react";

const breakingNews = [
  "हे संकेतस्थळ सध्या विकासाधीन आहे. काही वैशिष्ट्ये किंवा माहिती अपूर्ण असू शकतात. आपल्या सहकार्याबद्दल धन्यवाद.",
  "This website is currently under development. Some features or content may be incomplete. We appreciate your patience.",
];

export const BreakingNewsTicker = () => {
  return (
    <div className="breaking-news-bg text-breaking-foreground overflow-hidden">
      <div className="container flex items-center">
        <div className="flex-1 overflow-hidden py-2">
          <div className="animate-ticker whitespace-nowrap font-marathi">
            {breakingNews.map((news, index) => (
              <span key={index} className="mx-8">
                {news}
                {index < breakingNews.length - 1 && " • "}
              </span>
            ))}
            {breakingNews.map((news, index) => (
              <span key={`repeat-${index}`} className="mx-8">
                {news}
                {index < breakingNews.length - 1 && " • "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
