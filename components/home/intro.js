import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import Logo from '../logo';
import Container from '../container';
import Button from '../button';
import Popover from '../popover';
import Campaign from './campaign';

import { links } from '../../site-manifest';

function easing(t) {
  // eslint-disable-next-line
  return 1 + --t * t * t * t * t;
}

class LogoContainer extends React.PureComponent {
  state = {
    scroll: 0
  };

  componentDidMount() {
    this.setState({ mounted: true });
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const scroll = window.scrollY || window.document.body.scrollTop;
    this.setState({ scroll });
  };

  render() {
    const { scroll, mounted } = this.state;

    // const LOGO_TOP = isMobile ? 126 : 170;
    const LOGO_TOP = 170;
    return (
      <div
        className={classNames('logo-main f4 fw6', { unmounted: !mounted })}
        style={{
          top: Math.max(LOGO_TOP - scroll, 7),
          opacity: `${Math.max(easing(1 - scroll / LOGO_TOP), 0)}`,
          transform: `scale(${Math.max(easing(1 - scroll / LOGO_TOP), 0) * 0.325 +
            0.625}) translate3d(0, 0, 0)`,
          transformOrigin: 'top'
        }}
      >
        <Link href="/">
          <a className={scroll >= LOGO_TOP ? null : 'disable'} aria-label="Next.js">
            <Logo size={80} />
          </a>
        </Link>
        <a
          href="/blog/next-9"
          className="version no-tap-highlight no-drag"
          style={{
            opacity: Math.max(1 - (scroll * 3) / LOGO_TOP, 0),
            visibility: scroll * 3 > LOGO_TOP ? 'hidden' : 'visible'
          }}
        >
          <Popover
            content={
              <span className="f5 fw4 tip">
                What’s new in <strong className="fw7">9</strong>?
              </span>
            }
            top={65}
          >
            9
          </Popover>
        </a>
        <style jsx>{`
          .disable {
            pointer-events: none;
          }
          .logo-main {
            display: flex;
            position: fixed;
            justify-content: center;
            color: #0070f3;
            left: 0;
            right: 0;
            width: 200px;
            margin: auto;
          }
          .logo-main .version {
            width: 0;
            // margin-left: -0.2rem;
            margin-top: 0.4rem;
            cursor: pointer;
          }
          .version.hide {
            opacity: 0;
          }
          a.version {
            color: #0070f3;
          }
          .version .tip {
            color: #111;
            white-space: nowrap;
          }
          .unmounted {
            display: none;
          }
        `}</style>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export default class extends React.PureComponent {
  render() {
    const { isAmp } = this.props;
    return (
      <Container
        role="main"
        wide
        center
        overflow
        dotBackground
        minHeight={564}
        mobileStyle="min-height: 460px;"
        style={{
          display: 'flex',
          alignItems: 'flex-end'
        }}
      >
        <Container>
          <div className="intro-container">
            <style jsx>{`
              .intro-container {
                margin: 0 0 2rem 0;
                overflow: visible;
              }
              h2 {
                margin-top: 1rem;
                margin-bottom: 2rem;
              }
              .main-button {
                margin-bottom: 2rem;
              }
              .links {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .links > * {
                padding: 0 0.5rem;
              }
              .campaign {
                width: 100%;
                letter-spacing: -0.02rem;
                overflow: hidden;
                cursor: default;
                z-index: -1;
                margin: 1rem 0 5rem;
              }
              .f-xs-0 {
                font-size: 2.887rem; /* 2.566rem; /* 2.281rem; */
              }
              .f-xs-1 {
                font-size: 2.027rem; //.566rem;
              }
              .logo-main {
                position: fixed;
                display: flex;
                justify-content: center;
                color: #0070f3;
                left: 0;
                right: 0;
                width: 200px;
                margin: auto;
                z-index: 1000;
              }
              .title-1 {
                font-size: 1.5rem;
              }
              .title-2 {
                font-size: 4rem;
                margin-top: -5rem;
                margin-bottom: 0;
              }
              // CSS only media query for mobile
              @media screen and (max-width: 640px) {
                .title-1 {
                  font-size: 1.423828125em;
                }
                .title-2 {
                  font-size: 1.802032470703125em;
                  margin-top: -2.4rem;
                }
                .campaign {
                  margin: 0 0 2rem;
                }
                .main-button {
                  margin-top: 2rem;
                }
              }
            `}</style>
            {!isAmp && <LogoContainer />}
            <div className="campaign no-drag no-tap-highlight">
              <h1 className={classNames('title-1', 'fw6')}>The React Framework for</h1>
              <h2 className={classNames('title-2', 'fw7')}>
                <Campaign />
              </h2>
              <div className="main-button">
                <Button href="#showcases" invert>
                  See Showcase
                </Button>
              </div>
            </div>
            <div>
              <div className="links">
                <a href={links.license} rel="noopener noreferrer" target="_blank">
                  <span className="mute">License: MIT</span>
                </a>
                <div>
                  <Button href="/docs" amp>
                    View Docs
                  </Button>
                </div>
                <div>
                  <Button href="https://github.com/zeit/next.js">GitHub</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    );
  }
}
