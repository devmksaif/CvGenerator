import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function SitemarkIcon() {
  return (
    <SvgIcon sx={{ height: 50, width: 200, mr: 2 }}>
       <svg
  width="120"
  height="40"
  viewBox="0 0 120 40"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  
  <text
    x="5"
    y="25"
    font-family="Arial, sans-serif"
    font-size="16"
    font-weight="bold"
    fill="url(#textGradient)"
  >
    Smart Hire
  </text>

   
  <g transform="translate(90, 5)">
 
    <polygon
      points="10,0 20,5 20,15 10,20 0,15 0,5"
      fill="url(#hexGradient)"
    />

 
    <text
      x="5"
      y="15"
      font-family="Arial, sans-serif"
      font-size="10"
      font-weight="bold"
      fill="white"
    >
      AI
    </text>
  </g>
 
  <defs>
    <linearGradient
      id="textGradient"
      x1="0"
      y1="0"
      x2="0"
      y2="30"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#1AAFFF" />
      <stop offset="1" stop-color="#0163E0" />
    </linearGradient>

    <linearGradient
      id="hexGradient"
      x1="0"
      y1="0"
      x2="20"
      y2="20"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#1AAFFF" />
      <stop offset="1" stop-color="#0163E0" />
    </linearGradient>
  </defs>
</svg>
    </SvgIcon>
  );
}
