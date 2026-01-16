import { AlertCircle } from "lucide-react";

const breakingNews = [
  "नाशिक महापालिकेच्या निवडणुकीची तयारी सुरू",
  "गोदावरी नदीवरील नवीन पुलाचे उद्घाटन आज",
  "नाशिक-मुंबई महामार्गावर वाहतूक कोंडी",
  "शेतकऱ्यांना कर्जमाफीची घोषणा",
  "नाशिक जिल्ह्यात पावसाचा इशारा",
];

export const BreakingNewsTicker = () => {
  return (
    <div className="breaking-news-bg text-breaking-foreground overflow-hidden">
      <div className="container flex items-center">
        <div className="flex items-center gap-2 py-2 px-4 bg-breaking font-semibold flex-shrink-0 font-marathi">
          <AlertCircle className="h-4 w-4 animate-pulse" />
          <span>ताज्या बातम्या</span>
        </div>
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
