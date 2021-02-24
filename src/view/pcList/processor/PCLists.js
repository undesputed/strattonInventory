import React from 'react';

import PCItem from './item';

const PCLists = ({
    authUser,
    content,
    onEditContent,
    onRemoveContent,
}) => (
    // <table border="5">
    <ul>
    {
        content.map(content => (
            <PCItem
                authUser={authUser}
                key={content.uid}
                content={content}
                onEditContent={onEditContent}
                onRemoveContent={onRemoveContent}
            />
        ))
    }
    </ul>
    // </table>
);


export default PCLists;