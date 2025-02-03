import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Animation, AnimationProps } from "../../lib/data";
import styles from "./PhotoAnimation.module.scss";

export const PhotoAnimation = () => {
    const [visiblePhotos, setVisiblePhotos] = useState<AnimationProps[]>([])

    useEffect(() => {
        const shufflePhotos = () => {
        const shuffled = [...Animation] 
            .sort(() => 0.3 - Math.random())
            .slice(0, 6);
        setVisiblePhotos(shuffled);
        };

        shufflePhotos();
        const interval = setInterval(shufflePhotos, 4000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className={styles.grid}>
        {visiblePhotos.map((photo) => (
            <motion.img
            key={photo._id}
            src={photo.src}
            alt={`Photo ${photo._id}`}
            className={styles.photo}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        ))}
        </div>
    );
};