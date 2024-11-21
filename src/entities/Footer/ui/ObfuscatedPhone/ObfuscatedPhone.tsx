export const ObfuscatedPhone = () => {
    const phonePart1 = '+7';
    const phonePart2 = '918';
    const phonePart3 = '777-79-79';

    return (
        <a href={`tel:${phonePart1}${phonePart2}${phonePart3.replace(/-/g, '')}`}>
            {phonePart1} {phonePart2} {phonePart3}
        </a>
    );
};

