import { SVGProps } from 'react';

export default function MaximizeWindow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 0H16V16H0V0ZM2 4V14H14V4H2Z" fill="#fff" />
    </svg>
  );
}
