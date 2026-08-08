export default function LogoIcon({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.66667 16.6667L16.6667 6.66667L26.6667 16.6667L16.6667 26.6667L6.66667 16.6667Z"
        fill="#CAFF33"
      />
      <path
        d="M33.3333 10L26.6667 16.6667V6.66667H16.6667L23.3333 0H33.3333V10Z"
        fill="#CAFF33"
      />
      <path
        d="M33.3333 23.3333L26.6667 16.6667V26.6667H16.6667L23.3333 33.3333H33.3333V23.3333Z"
        fill="#CAFF33"
      />
      <path
        d="M0 23.3333L6.66667 16.6667V26.6667H16.6667L10 33.3333H0L0 23.3333Z"
        fill="#CAFF33"
      />
      <path
        d="M0 10L6.66667 16.6667V6.66667H16.6667L10 0H0L0 10Z"
        fill="#CAFF33"
      />
    </svg>
  );
}
