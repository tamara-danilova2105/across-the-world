export const ObfuscatedEmail = () => {
    const encodedEmail = 'bWFpbEBhY3Jvc3N0aGV3b3JsZC5ydQ==';
    const decodedEmail = atob(encodedEmail);

    return (
        <a href={`mailto:${decodedEmail}`}>
            {decodedEmail}
        </a>
    );
};
