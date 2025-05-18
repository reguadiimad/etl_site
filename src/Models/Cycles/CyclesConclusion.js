import { useSelector } from "react-redux";
import data from "./Datas/ConclusioData.json";
import { motion } from "framer-motion";
import { bottomAnimation } from "./animation";
const CycleConclusion = () => {
    const { language } = useSelector((state) => state.presntion);

    return(
        <>
            <motion.div {...bottomAnimation()}
                className={`border border-black/5 rounded-[50px] mt-10 p-10 w-[90%] text-neutral-600  ${language==="ar"?'text-right': 'text-justify '}`}
                dangerouslySetInnerHTML={{ __html: data[language].content }}
            />
        </> 
    )
}

export default CycleConclusion;
