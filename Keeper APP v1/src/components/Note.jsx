import React from 'react';

function Note(param){
    return(
        <div className="note">
            <h1>{param.title}</h1>
            <p>{param.content}</p>
        </div>
    );
}
export default Note;