import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.footer``;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="container-sm">
        <div className="flex justify-center -mx-4 flex-wrap items-center mt-9">
          <a
            className="inline-flex p-4"
            href="https://twitter.com/asterisk_fi"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M21.479 6.964c.015.21.015.42.015.632 0 6.457-4.917 13.905-13.906 13.905v-.004a13.835 13.835 0 0 1-7.491-2.19 9.814 9.814 0 0 0 7.233-2.025 4.893 4.893 0 0 1-4.566-3.395 4.872 4.872 0 0 0 2.206-.084 4.888 4.888 0 0 1-3.92-4.79V8.95c.68.379 1.44.589 2.218.612a4.893 4.893 0 0 1-1.513-6.525 13.871 13.871 0 0 0 10.073 5.105 4.892 4.892 0 0 1 8.328-4.457 9.807 9.807 0 0 0 3.104-1.186A4.906 4.906 0 0 1 21.11 5.2a9.719 9.719 0 0 0 2.807-.769 9.927 9.927 0 0 1-2.44 2.532Z"
                fill="#fff"
              ></path>
            </svg>
          </a>
          <a
            className="inline-flex p-4"
            href="https://medium.com/@asterisk.finance"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M13.536 11.816c0 3.765-3.03 6.817-6.768 6.817C3.031 18.633 0 15.579 0 11.816 0 8.054 3.031 5 6.768 5c3.737 0 6.768 3.052 6.768 6.816ZM20.962 11.817c0 3.543-1.515 6.416-3.385 6.416-1.87 0-3.385-2.873-3.385-6.416 0-3.544 1.515-6.417 3.385-6.417 1.87 0 3.385 2.873 3.385 6.417ZM24 11.816c0 3.174-.534 5.747-1.191 5.747-.658 0-1.192-2.573-1.192-5.747 0-3.173.534-5.747 1.192-5.747.657 0 1.191 2.571 1.191 5.747Z"
                fill="#fff"
              ></path>
            </svg>
          </a>
          <a
            className="inline-flex p-4"
            href="https://discord.gg/asterisk"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="24" height="24" fill="none">
              <g clipPath="url(#a)">
                <path
                  d="M20.317 4.36a19.792 19.792 0 0 0-4.885-1.516.074.074 0 0 0-.079.038c-.21.375-.444.864-.608 1.25a18.271 18.271 0 0 0-5.487 0 12.644 12.644 0 0 0-.617-1.25.077.077 0 0 0-.079-.038A19.737 19.737 0 0 0 3.677 4.36a.07.07 0 0 0-.032.027C.533 9.036-.32 13.57.099 18.047a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.296 1.226-1.995.021-.04.001-.09-.041-.105a13.109 13.109 0 0 1-1.872-.893.077.077 0 0 1-.008-.127c.126-.095.252-.193.372-.292a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.098.245.198.372.292.044.032.04.1-.006.127-.598.35-1.22.645-1.873.892a.077.077 0 0 0-.041.106c.36.698.772 1.363 1.225 1.994a.076.076 0 0 0 .084.028 19.834 19.834 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03ZM8.02 15.32c-1.182 0-2.157-1.086-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.176 1.095 2.157 2.42 0 1.332-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.095 2.157 2.42 0 1.332-.946 2.418-2.157 2.418Z"
                  fill="#fff"
                ></path>
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h24v24H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </a>
          {/* <a className="inline-flex p-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <title>アセット 321</title>
              <rect width="48" height="48" fill="none" />
              <rect
                x="10"
                y="5"
                width="28"
                height="38"
                rx="3"
                fill="none"
                stroke="#000"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <line
                x1="18"
                y1="15"
                x2="30"
                y2="15"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <line
                x1="18"
                y1="23"
                x2="30"
                y2="23"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <line
                x1="18"
                y1="31"
                x2="24"
                y2="31"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <line
                x1="30"
                y1="31"
                x2="30"
                y2="31"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
            </svg>
          </a> */}
        </div>
        <div className="text-sm flex font-light mt-9 mb-12 justify-center items-center flex-col">
          Copyright © 2023 Asterisk All rights reserved.
          <div>
            <Link
              className="m-2"
              href="/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </Link>
            <Link
              className="m-2"
              href="https://asterisk-1.gitbook.io/asterisk/disclaimer"
              target="_blank"
              rel="noreferrer"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
