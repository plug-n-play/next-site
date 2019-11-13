import Link from 'next/link';
import HuluLogo from '../../icons/companies/hulu';
import ZeitLogo from '../../icons/zeit-logo-outline.js';

export default () => (
  <div>
    <Link href="https://zeit.co">
      <a className="home">
        <ZeitLogo />
      </a>
    </Link>
    <span>+</span>
    <a href="https://hulu.com" target="_blank" rel="noopener noreferrer" className="hulu">
      <HuluLogo color="#fff" />
    </a>
    <style jsx>
      {`
        a,
        a:active,
        a.visited {
          display: flex;
          outline: none;
        }

        div {
          display: flex;
          align-items: center;
          opacity: 0.5;
          margin-bottom: 1rem;
        }

        .home > :global(svg) {
          transform: scale(1.8);
        }

        .hulu > :global(svg) {
          height: 25px;
        }

        span {
          margin: 0 1rem 0.3rem;
          opacity: 0.5;
        }
      `}
    </style>
  </div>
);
