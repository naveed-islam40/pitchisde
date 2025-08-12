import React from "react";

export default function RedCard(props) {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="19" height="19" rx="9.5"></rect>
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="9.5"
        stroke="var(--EventIcons-borderColor)"
      ></rect>
      <g clipPath="url(#clip0_7632_41880)">
        <path
          d="M12.9092 2.96924H7.091C5.88601 2.96924 4.90918 3.94607 4.90918 5.15106V14.8478C4.90918 16.0528 5.88601 17.0296 7.091 17.0296H12.9092C14.1142 17.0296 15.091 16.0528 15.091 14.8478V5.15106C15.091 3.94607 14.1142 2.96924 12.9092 2.96924Z"
          fill=" #DA291C"
        ></path>
      </g>
    </svg>
  );
}
