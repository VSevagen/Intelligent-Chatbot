import React, { useState , createContext } from 'react';

export const adminContext = createContext({
    show: false,
    setShow: () => {}
});