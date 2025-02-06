// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Animation, AnimationProps } from "../../lib/data";
// import styles from "./PhotoAnimation.module.scss";

// export const PhotoAnimation = () => {
//     const [visiblePhotos, setVisiblePhotos] = useState<AnimationProps[]>([])

//     useEffect(() => {
//         const shufflePhotos = () => {
//         const shuffled = [...Animation] 
//             .sort(() => 0.6 - Math.random())
//             .slice(0, 6);
//         setVisiblePhotos(shuffled);
//         };

//         shufflePhotos();
//         const interval = setInterval(shufflePhotos, 4000);

//         return () => clearInterval(interval);
//     }, [])

//     return (
//         <div className={styles.grid}>
//             <AnimatePresence mode="popLayout">
//                 {visiblePhotos.map((photo, index) => (
//                     <motion.img
//                         key={photo._id}
//                         src={photo.src}
//                         alt={`Photo ${photo._id}`}
//                         className={styles.photo}
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         transition={{ duration: 0.5, ease: "easeInOut" }}
//                         layout
//                         style={{ gridColumn: index % 3 === 2 ? "span 2" : "span 1"}}
//                     />
//                 ))}
//             </AnimatePresence>
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Animation, AnimationProps } from "../../lib/data";
import styles from "./PhotoAnimation.module.scss";

export const PhotoAnimation = () => {
    const [visiblePhotos, setVisiblePhotos] = useState<AnimationProps[]>([]);

    useEffect(() => {
        const shufflePhotos = () => {
            const shuffled = [...Animation]  
                .sort(() => 0.6 - Math.random())  
                .slice(0, 5);  
            setVisiblePhotos(shuffled);
        };

        shufflePhotos();
        const interval = setInterval(shufflePhotos, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.grid}>
            <AnimatePresence mode="popLayout">
                {visiblePhotos.map((photo, index) => {
                    const isFirstPhoto = index === 0;

                    return (
                        <motion.img
                            key={photo._id}
                            src={photo.src}
                            alt={`Photo ${photo._id}`}
                            className={styles.photo}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{
                                gridColumn: isFirstPhoto ? "span 2" : "span 1",
                                gridRow: isFirstPhoto ? "span 2" : "span 2",
                            }}
                        />
                    );
                })}
            </AnimatePresence>
        </div>
    );
};
