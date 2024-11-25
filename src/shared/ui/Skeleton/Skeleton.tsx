import { CSSProperties } from "react";
import styles from "./Skeleton.module.scss";

interface SkeletonProps {
    width: CSSProperties;
    height: CSSProperties;
}

export const Skeleton = (props: SkeletonProps) => {
    const { width, height } = props;
    
    return (
        <div
        className={styles.skeleton}
            style={{width: `${width}`}}
        >
            <div
                className={styles.image_container}
                style={{height: `${height}`}}
            />
        </div>
    );
};