import React, { useState } from 'react';
import RedditComponent from '../RedditContent';
import TopBar from '../TopBar';

export default function Home() {

    return (
        <>
            <TopBar />
            <RedditComponent />
        </>
    );
}
