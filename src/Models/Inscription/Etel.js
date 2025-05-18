import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Etel() {
  const language = useSelector((state) => state.presntion.language);
  const containerRef = useRef(null);
  const angleRefs = useRef([0, 0, 0, 0]); // Keep track of angles for each circle

  // Effect for handling the spinning position animation
  useEffect(() => {
    const totalCircles = 4;
    // const totalDotsPerCircle = 30; // Not needed directly here anymore
    const radiusStep = 20; // ⬅️ smaller spacing
    const baseRadius = 60;
    const centerX = 150;
    const centerY = 150;

    const container = containerRef.current;
    if (!container) return; // Guard clause

    // Get dot groups - ensure this runs after dots are potentially rendered
    const dotGroups = Array.from({ length: totalCircles }, (_, i) =>
      container.querySelectorAll(`.dot-group-${i}`)
    );

    // Speeds for rotation - adjust if desired
    const speeds = [0.0115, 0.0086, 0.0068, 0.0043];

    let animationFrameId;

    const animate = () => {
      dotGroups.forEach((dots, circleIndex) => {
        // Ensure dots exist for this group
        if (dots.length === 0) return;

        const radius = baseRadius + circleIndex * radiusStep;
        const totalDots = dots.length; // Use actual length
        angleRefs.current[circleIndex] += speeds[circleIndex]; // Update angle for the circle

        dots.forEach((dot, i) => {
          // Calculate angle for this specific dot based on its index and the circle's current angle
          const angle = (i / totalDots) * 2 * Math.PI + angleRefs.current[circleIndex];
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          // Apply position directly - Framer Motion handles scale separately
          dot.style.left = `${x}px`;
          dot.style.top = `${y}px`;
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    // Cleanup function to cancel the animation frame when the component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Empty dependency array ensures this effect runs once on mount

  const colors = [
      "bg-apple-light shadow-sm", // Note: Define this color in your tailwind.config.js or use a standard one
      "bg-red-500",
      "bg-the-gray",   // Note: Define this color in your tailwind.config.js or use a standard one
      "bg-blue-500",
  ];

  // Example definitions if not in Tailwind config:
  // const appleLight = "#A8E6CF";
  // const theGray = "#your_gray_color"; // Replace with actual hex/rgb

  return (
    <motion.div
      ref={containerRef}
      className="relative w-[300px] h-[300px] scale-90 md:scale-100 2xl:scale-110 mx-auto mt-16 md:mt-24 lg:mt-24 2xl:mt-40 flex items-center justify-center"
      // Initial container animation (optional)
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Transition for the container itself
    >
        {/* Central Image */}
        <motion.img
            initial={{opacity:0, scale:1.5}}
            whileInView={{opacity:1, scale:1}}
            transition={{type:"spring", delay:0.5, duration: 0.8}} // Adjusted delay/duration
            className="absolute w-28 h-28 z-10 -mr-2" // Ensure image is above dots with z-index
            src={process.env.PUBLIC_URL+"/logos/trf.webp"}
            alt="TRF Logo" // Added alt text for accessibility
        />

      {/* Render Circles and Dots */}
      {[0, 1, 2, 3].map((circleIndex) =>
        Array.from({ length: 30 }).map((_, dotIndex) => {
          // Calculate a unique initial delay for the appearance animation
          const initialAppearDelay = (circleIndex * 0.2) + (dotIndex * 0.025);

          // --- Define unique, random parameters for the continuous scaling animation ---
          const scaleDuration = 1.5 + Math.random() * 1.5; // Random duration between 1.5s and 3s
          const scaleDelay = Math.random() * 2; // Random initial delay up to 2s for staggering

          return (
            <motion.div
              key={`circle-${circleIndex}-dot-${dotIndex}`}
              // CSS classes for styling and selection by the useEffect hook
              className={`dot dot-group-${circleIndex} absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 ${colors[circleIndex]}`}

              // --- Initial state (before entering view) ---
              initial={{
                scale: 0, // Start scaled down
                opacity: 0, // Start invisible
                // Initial position set by JS, but Framer needs a hint
                left: '150px',
                top: '150px',
              }}

              // --- Animation when component scrolls into view ---
              whileInView={{
                scale: 1, // Scale to normal size
                opacity: 1, // Fade in
              }}

              // --- Continuous scaling animation ---
              animate={{
                scale: [1, 1.1, 1.2, 1], // Keyframes: normal -> large -> small -> normal
                // Position is handled by the useEffect hook, not Framer's animate here
              }}

              // --- Transition configuration ---
              transition={{
                // 1. Configuration for the 'whileInView' animation (initial appearance)
                // We target opacity and the initial scale-up separately
                opacity: { delay: initialAppearDelay, duration: 0.5},
                scale: { delay: initialAppearDelay, type: "spring"}, // Spring effect for initial pop-in

                // 2. Configuration for the continuous 'animate' scale animation
                // This uses the 'scale' property name within transition to specify its behavior
                scale: { // Note: Framer Motion re-uses the 'scale' key here for the repeating animation
                  duration: scaleDuration, // Use the random duration
                  delay: scaleDelay + initialAppearDelay, // Add initial appear delay to the random scale delay
                  repeat: Infinity, // Loop forever
                  repeatType: "mirror", // Go forwards (1 -> 1.2 -> 0.5 -> 1) then backwards (1 -> 0.5 -> 1.2 -> 1) etc.
                  ease: "easeInOut", // Smooth easing function
                }
              }}

              // --- Dynamic styling for dot size ---
              style={{
                width: `${6 + circleIndex * 2}px`,
                height: `${6 + circleIndex * 2}px`,
                // Important: Remove left/top from here if set by JS effect
              }}
            />
          );
        })
      )}
    </motion.div>
  );
}