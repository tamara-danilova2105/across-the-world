import { useState } from "react";

interface UseExpandableTextProps {
    text: string;
    maxLength: number;
}

export const useExpandableText = ({ text, maxLength }: UseExpandableTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    const displayText = isExpanded || text.length <= maxLength
        ? text
        : `${text.slice(0, maxLength)}...`;

    return { isExpanded, displayText, toggleExpanded };
};
