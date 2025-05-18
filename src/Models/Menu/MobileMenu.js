import { faChalkboardTeacher, faClose, faEnvelope, faGraduationCap, faHome, faInfoCircle, faNewspaper, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ visble, onClose }) => {
    const [active, setActive] = useState(0);

    const navLinks = [
        { icon: faHome, label: 'Accueil', href: '/' },
        { icon: faInfoCircle, label: 'À propos', href: '/about' },
        { icon: faGraduationCap, label: 'Cycles', href: '/cycles' },
        { icon: faChalkboardTeacher, label: 'Services', href: '/services' },
        { icon: faNewspaper, label: 'Actualités', href: '/news' },
        { icon: faPhotoFilm, label: 'Galerie', href: '/gallery' },
        { icon: faEnvelope, label: 'Contact', href: '/contact' },
    ];

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0, transition: { duration: 0.08, ease: [0.25, 1, 0.5, 1] } },
    };

    const menuVariants = {
        hidden: { x: "-100%" },
        visible: { x: '0%', transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } },
        exit: { x: "-100%", transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] } },
    };

    const closeIconVariants = {
        hidden: { opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] } },
        exit: { y: "-100%", opacity: 0, transition: { duration: 0.12, ease: [0.25, 1, 0.5, 1] } },
    };

    return (
        <>
            {visble && (
                <motion.div
                    className="w-full h-screen bg-black/20 fixed top-0 left-0 z-50 flex items-center lg:hidden navMobile mobile"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    
                >
                    <div className="absolute top-0 left-0 w-[40%] bg-red-500 z-10 h-full"></div>
                    {/* Close Icon */}
                    <motion.div
                        variants={closeIconVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-6 right-6 text-4xl text-white cursor-pointer"
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </motion.div>

                    {/* Sliding Menu */}
                    <motion.div
                        className="w-[80%] h-full bg-red-500 z-20 shadow-3xl flex items-center justify-center"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        drag="x" // Enable horizontal dragging
                        dragConstraints={{ left: -window.innerWidth, right: 0 }} // Disable drag to the right
                        dragElastic={0.1} // Add elasticity for smoothness
                        dragTransition={{ power: 0.1, bounceStiffness: 300, bounceDamping: 20 }} // Smooth drag response
                        onDragEnd={(event, info) => {
                            if (info.offset.x < -70) {
                                // Trigger close if swiped left sufficiently
                                onClose();
                            }
                        }}
                        >
    <nav className="w-[85%] h-[90%]">
        <img src={`${process.env.PUBLIC_URL}/logos/logo1.webp`} className="md:h-24 h-16" alt="logo" />
        <p className="md:mt-6 text-white/50 mt-1.5 text-xs md:scale-100">
            Veuillez choisir un lien ci-dessous pour naviguer sur le site officiel de l'école.
        </p>
        <div className="mt-20 text-lg liens">
            {navLinks.map((link, index) => (
                <Link
                    key={index}
                    to={link.href}
                    className={`lien flex text-xl mb-4 items-baseline p-2 my-3 hover:text-white ${
                        index === active ? 'text-white animate-pulse' : 'text-white/70'
                    }`}
                    onClick={() => setActive(index)}
                >
                    <FontAwesomeIcon className="w-8 mr-4" icon={link.icon} />
                    {link.label}
                </Link>
            ))}
        </div>
        <div className="inscription w-[90%] flex flex-row-reverse p-2 mt-32">
            <button className=" bg-[#F9FAFB] rounded-lg text-red-500 ml-2 p-3 ">Inscription</button>
            <button className="text-white/50 underline mr-3" onClick={onClose}>
                Retourner
            </button>
        </div>
    </nav>
</motion.div>

                </motion.div>
            )}
        </>
    );
};

export default MobileMenu;