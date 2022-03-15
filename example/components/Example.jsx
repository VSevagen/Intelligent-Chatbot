import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#F5F8FB',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#E83551',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#E83551',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

const steps = [
  {
    id: '1',
    message: 'What is your name?',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'Hi {previousValue}, nice to meet you!',
    trigger: '4',
  },
  {
    id: '4',
    message: 'What is your age?',
    trigger: '5',
  },
  {
    id: '5',
    user: true,
    validator: (value) => {
      if (isNaN(value)) {
        return 'value should be a number';
      }
      return true;
    },
    trigger: '6',
  },
  {
    id: '6',
    message: 'Gender?',
    trigger: '7',
  },
  {
    id: '7',
    options: [
      { value: 1, label: 'Male', trigger: '8' },
      { value: 2, label: 'Female', trigger: '8' },
    ],
  },
  {
    id: '8',
    message: 'You can add custom components',
    trigger: '9',
  },
  {
    id: '9',
    component: (
      <div> This is a component </div>
    ),
    end: true,
  },
];

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <React.StrictMode>
      <ChatBot speechSynthesis={{ enable: false, lang: 'en' }} recognitionEnable={true} steps={steps} />
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
