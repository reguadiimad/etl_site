import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function ServicesConclusion() {
  const { language } = useSelector((state) => state.presntion);

  const translations = {
    fr: "Notre école La Tour Eiffel se distingue par une offre de services complète et adaptée aux besoins de chaque élève. Grâce à notre application mobile intuitive, nous facilitons la communication et la gestion quotidienne, tandis que nos solutions de transport garantissent sécurité et ponctualité. La cantine propose une alimentation équilibrée, essentielle à leur bien-être. Par ailleurs, nos clubs et nos divers ateliers – allant du coaching scolaire au calcul mental, en passant par le théâtre, l’orientation, la médiathèque, la robotique et les mathématiques enrichies – contribuent à développer tant les compétences académiques que les talents personnels. L’infirmerie, quant à elle, veille sur la santé des élèves, offrant ainsi un environnement sûr et bienveillant pour leur épanouissement global.",
    en: "Our school La Tour Eiffel stands out with a comprehensive range of services tailored to each student's needs. With our intuitive mobile application, we facilitate communication and daily management, while our transportation solutions ensure safety and punctuality. The canteen offers a balanced diet, essential for their well-being. Furthermore, our clubs and various workshops – ranging from academic coaching and mental math to theater, guidance, media library, robotics, and advanced mathematics – contribute to the development of both academic skills and personal talents. The infirmary takes care of the students' health, providing a safe and nurturing environment for their overall development.",
    ar: "تتميز مدرستنا لا تور إيفل بمجموعة شاملة من الخدمات المصممة لتلبية احتياجات كل طالب. من خلال تطبيقنا المحمول البديهي، نسهل التواصل والإدارة اليومية، بينما تضمن حلول النقل لدينا الأمان والدقة في المواعيد. تقدم الكانتين نظامًا غذائيًا متوازنًا، وهو أمر ضروري لرفاهيتهم. علاوة على ذلك، تساهم الأندية وورش العمل المتنوعة – التي تشمل التوجيه الأكاديمي والحساب الذهني والمسرح والتوجيه والمكتبة والروبوتات والرياضيات المتقدمة – في تطوير المهارات الأكاديمية والمواهب الشخصية. كما تعتني العيادة الصحية بصحة الطلاب، مما يوفر بيئة آمنة وداعمة لنموهم الشامل"
  };

  const text = translations[language] || translations.fr;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

      className={`w-[90%] rounded-[30px] lg:rounded-[50px] border border-black/10 p-4 md:p-12 lg:p-16 text-neutral-900 mt-10 ${
        language === "ar" ? "text-right" : "text-justify"
      }`}
    >
      {text}
    </motion.div>
  );
}
