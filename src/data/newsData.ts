import heroNashik from "@/assets/hero-nashik.jpg";
import newsPolitics from "@/assets/news-politics.jpg";
import newsSports from "@/assets/news-sports.jpg";
import newsBusiness from "@/assets/news-business.jpg";
import newsEntertainment from "@/assets/news-entertainment.jpg";
import newsLocal from "@/assets/news-local.jpg";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categorySlug: string;
  author: string;
  date: string;
  readTime: string;
  isBreaking?: boolean;
}

export const featuredArticles: Article[] = [
  {
    id: "1",
    title: "गोदावरी नदीवरील नवीन पुलाचे उद्घाटन आज मुख्यमंत्र्यांच्या हस्ते",
    excerpt: "नाशिक-मुंबई महामार्गावरील वाहतूक कोंडी कमी करण्यासाठी बांधलेल्या नवीन पुलाचे आज मुख्यमंत्री यांच्या हस्ते उद्घाटन होणार आहे. या पुलामुळे दररोज हजारो वाहनांना सुलभ मार्ग उपलब्ध होणार.",
    image: heroNashik,
    category: "नाशिक",
    categorySlug: "local",
    author: "रामदास शिंदे",
    date: "१६ जानेवारी २०२६",
    readTime: "५ मिनिटे",
    isBreaking: true,
  },
  {
    id: "2",
    title: "राज्य विधानसभा निवडणूक: भाजप-शिवसेना युतीचा मोठा विजय",
    excerpt: "महाराष्ट्र विधानसभा निवडणुकीत युती आघाडीने दणदणीत विजय मिळवला. नाशिक जिल्ह्यातील सर्व जागांवर युतीचे उमेदवार विजयी.",
    image: newsPolitics,
    category: "राजकारण",
    categorySlug: "politics",
    author: "सुनील पाटील",
    date: "१६ जानेवारी २०२६",
    readTime: "४ मिनिटे",
    isBreaking: true,
  },
  {
    id: "3",
    title: "नाशिक क्रिकेट संघाने रणजी ट्रॉफीत ऐतिहासिक विजय मिळवला",
    excerpt: "नाशिक क्रिकेट संघाने मुंबई संघाविरुद्ध रणजी ट्रॉफीत ऐतिहासिक विजय मिळवून संपूर्ण राज्याचे लक्ष वेधून घेतले.",
    image: newsSports,
    category: "क्रीडा",
    categorySlug: "sports",
    author: "विनोद जाधव",
    date: "१५ जानेवारी २०२६",
    readTime: "३ मिनिटे",
  },
];

export const politicsArticles: Article[] = [
  {
    id: "4",
    title: "नाशिक महापालिकेच्या निवडणुकीची तयारी सुरू",
    excerpt: "आगामी महापालिका निवडणुकीसाठी सर्व पक्षांनी तयारी सुरू केली आहे. उमेदवारांची यादी लवकरच जाहीर होणार.",
    image: newsPolitics,
    category: "राजकारण",
    categorySlug: "politics",
    author: "प्रकाश देशमुख",
    date: "१५ जानेवारी २०२६",
    readTime: "४ मिनिटे",
  },
  {
    id: "5",
    title: "शेतकऱ्यांसाठी नवीन कर्जमाफी योजना जाहीर",
    excerpt: "राज्य सरकारने शेतकऱ्यांसाठी नवीन कर्जमाफी योजना जाहीर केली. नाशिक जिल्ह्यातील हजारो शेतकऱ्यांना लाभ होणार.",
    image: newsPolitics,
    category: "राजकारण",
    categorySlug: "politics",
    author: "महेश कुलकर्णी",
    date: "१४ जानेवारी २०२६",
    readTime: "३ मिनिटे",
  },
  {
    id: "6",
    title: "विधानसभेत विरोधी पक्षांचा तीव्र विरोध",
    excerpt: "नवीन कायद्याच्या विरोधात विरोधी पक्षांनी विधानसभेत तीव्र विरोध केला. सभागृहाचे कामकाज तहकूब.",
    image: newsPolitics,
    category: "राजकारण",
    categorySlug: "politics",
    author: "अनिल गायकवाड",
    date: "१३ जानेवारी २०२६",
    readTime: "५ मिनिटे",
  },
];

export const sportsArticles: Article[] = [
  {
    id: "7",
    title: "IPL लिलावात नाशिकच्या खेळाडूला मिळाले कोट्यवधींचे बोली",
    excerpt: "नाशिक येथील युवा क्रिकेट खेळाडूला IPL लिलावात दणदणीत बोली लागली. स्थानिक क्रिकेट संघटनेने अभिनंदन केले.",
    image: newsSports,
    category: "क्रीडा",
    categorySlug: "sports",
    author: "विनोद जाधव",
    date: "१५ जानेवारी २०२६",
    readTime: "३ मिनिटे",
  },
  {
    id: "8",
    title: "नाशिक मॅरेथॉनमध्ये नवीन विक्रम",
    excerpt: "वार्षिक नाशिक मॅरेथॉनमध्ये यावर्षी नवीन विक्रम नोंदवला गेला. केनियाच्या धावपटूने प्रथम स्थान पटकावले.",
    image: newsSports,
    category: "क्रीडा",
    categorySlug: "sports",
    author: "संजय मोरे",
    date: "१४ जानेवारी २०२६",
    readTime: "२ मिनिटे",
  },
  {
    id: "9",
    title: "राष्ट्रीय कबड्डी स्पर्धेत नाशिक संघ उपांत्य फेरीत",
    excerpt: "राष्ट्रीय कबड्डी स्पर्धेत नाशिक संघाने उत्कृष्ट कामगिरी करत उपांत्य फेरीत प्रवेश केला.",
    image: newsSports,
    category: "क्रीडा",
    categorySlug: "sports",
    author: "प्रताप साळुंखे",
    date: "१३ जानेवारी २०२६",
    readTime: "४ मिनिटे",
  },
];

export const businessArticles: Article[] = [
  {
    id: "10",
    title: "नाशिक MIDC मध्ये नवीन IT पार्क उभारणार",
    excerpt: "राज्य सरकारने नाशिक MIDC मध्ये मोठे IT पार्क उभारण्याची घोषणा केली. हजारो तरुणांना रोजगार मिळणार.",
    image: newsBusiness,
    category: "व्यापार",
    categorySlug: "business",
    author: "सुधीर कापसे",
    date: "१६ जानेवारी २०२६",
    readTime: "४ मिनिटे",
  },
  {
    id: "11",
    title: "द्राक्ष निर्यातीत यावर्षी विक्रमी वाढ",
    excerpt: "नाशिक जिल्ह्यातून युरोप आणि आखाती देशांना द्राक्ष निर्यातीत यावर्षी विक्रमी वाढ नोंदवली गेली.",
    image: newsBusiness,
    category: "व्यापार",
    categorySlug: "business",
    author: "रवींद्र पवार",
    date: "१५ जानेवारी २०२६",
    readTime: "३ मिनिटे",
  },
  {
    id: "12",
    title: "शेअर बाजारात तेजी, सेन्सेक्स नवीन उच्चांकावर",
    excerpt: "आठवड्याच्या शेवटी शेअर बाजारात मोठी तेजी नोंदवली गेली. सेन्सेक्स नवीन उच्चांकावर पोहोचला.",
    image: newsBusiness,
    category: "व्यापार",
    categorySlug: "business",
    author: "अमित शहा",
    date: "१४ जानेवारी २०२६",
    readTime: "२ मिनिटे",
  },
];

export const entertainmentArticles: Article[] = [
  {
    id: "13",
    title: "मराठी चित्रपटाला राष्ट्रीय पुरस्कार",
    excerpt: "नाशिकमध्ये चित्रित झालेल्या मराठी चित्रपटाला राष्ट्रीय चित्रपट पुरस्कार जाहीर. दिग्दर्शकांचे अभिनंदन.",
    image: newsEntertainment,
    category: "मनोरंजन",
    categorySlug: "entertainment",
    author: "स्मिता जोशी",
    date: "१५ जानेवारी २०२६",
    readTime: "३ मिनिटे",
  },
  {
    id: "14",
    title: "लता मंगेशकर यांच्या स्मृतिप्रीत्यर्थ संगीत कार्यक्रम",
    excerpt: "नाशिकमध्ये स्वरसम्राज्ञी लता मंगेशकर यांच्या स्मृतिप्रीत्यर्थ भव्य संगीत कार्यक्रमाचे आयोजन.",
    image: newsEntertainment,
    category: "मनोरंजन",
    categorySlug: "entertainment",
    author: "प्रिया देशपांडे",
    date: "१४ जानेवारी २०२६",
    readTime: "४ मिनिटे",
  },
  {
    id: "15",
    title: "नाशिक फिल्म फेस्टिव्हलला उत्साहाने प्रतिसाद",
    excerpt: "यावर्षीच्या नाशिक फिल्म फेस्टिव्हलला चित्रपट रसिकांनी उत्साहाने प्रतिसाद दिला.",
    image: newsEntertainment,
    category: "मनोरंजन",
    categorySlug: "entertainment",
    author: "किरण भोसले",
    date: "१३ जानेवारी २०२६",
    readTime: "२ मिनिटे",
  },
];

export const localArticles: Article[] = [
  {
    id: "16",
    title: "त्र्यंबकेश्वर मंदिरात भाविकांची मोठी गर्दी",
    excerpt: "मकरसंक्रांतीच्या निमित्ताने त्र्यंबकेश्वर मंदिरात भाविकांची मोठी गर्दी उसळली. पोलिसांचा कडक बंदोबस्त.",
    image: newsLocal,
    category: "नाशिक",
    categorySlug: "local",
    author: "संदीप गायकवाड",
    date: "१६ जानेवारी २०२६",
    readTime: "३ मिनिटे",
  },
  {
    id: "17",
    title: "गोदावरी नदी स्वच्छता मोहिमेला उत्स्फूर्त प्रतिसाद",
    excerpt: "नाशिक महापालिकेने आयोजित केलेल्या गोदावरी नदी स्वच्छता मोहिमेला नागरिकांचा उत्स्फूर्त प्रतिसाद लाभला.",
    image: newsLocal,
    category: "नाशिक",
    categorySlug: "local",
    author: "अजय पाटील",
    date: "१५ जानेवारी २०२६",
    readTime: "४ मिनिटे",
  },
  {
    id: "18",
    title: "नाशिक मेट्रोच्या कामाला मंजुरी",
    excerpt: "केंद्र सरकारने नाशिक मेट्रो प्रकल्पाला मंजुरी दिली. पुढील वर्षी कामाला प्रारंभ होणार.",
    image: newsLocal,
    category: "नाशिक",
    categorySlug: "local",
    author: "राजेश शर्मा",
    date: "१४ जानेवारी २०२६",
    readTime: "५ मिनिटे",
  },
];

export const allArticles = [
  ...featuredArticles,
  ...politicsArticles,
  ...sportsArticles,
  ...businessArticles,
  ...entertainmentArticles,
  ...localArticles,
];

export const pdfArchive = [
  { date: "१६ जानेवारी २०२६", dateEn: "2026-01-16", size: "4.2 MB" },
  { date: "१५ जानेवारी २०२६", dateEn: "2026-01-15", size: "3.8 MB" },
  { date: "१४ जानेवारी २०२६", dateEn: "2026-01-14", size: "4.0 MB" },
  { date: "१३ जानेवारी २०२६", dateEn: "2026-01-13", size: "3.9 MB" },
  { date: "१२ जानेवारी २०२६", dateEn: "2026-01-12", size: "4.1 MB" },
  { date: "११ जानेवारी २०२६", dateEn: "2026-01-11", size: "3.7 MB" },
  { date: "१० जानेवारी २०२६", dateEn: "2026-01-10", size: "4.3 MB" },
];
