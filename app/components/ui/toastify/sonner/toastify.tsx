import React from 'react';
import { toast } from 'sonner';
const toastify = () => {
    return (
        <div>
            <button onClick={() => toast('My first toast')}>Give me a toast</button>
        </div>
    );
};

export default toastify;
