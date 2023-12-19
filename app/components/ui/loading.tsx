'use client';
import { useState, useEffect } from 'react';
import React from 'react';

function loading() {
    const [loading, setLoading] = useState<boolean>(true);
    return <div>loading</div>;
}

export default loading;
