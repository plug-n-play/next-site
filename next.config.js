const path = require('path');
const webpack = require('webpack');
const rehypePrism = require('@mapbox/rehype-prism');
const nextMDX = require('@next/mdx');
const bundleAnalyzer = require('@next/bundle-analyzer');
const rehypeReadme = require('./lib/rehype-readme');

// only enable rehypeReadme for this file
// because the github relative path replacement
// might break things in other markdowns
const withGitHubMDX = nextMDX({
  extension: path.join(__dirname, 'components', 'docs', 'docs.mdx'),
  options: {
    hastPlugins: [
      rehypePrism,
      [
        rehypeReadme,
        {
          repo: 'zeit/next.js',
          branch: 'master',
          level: 4
        }
      ]
    ]
  }
});

const withMDX = nextMDX({
  extension: /[/\\](pages|blog|telemetry|components[/\\](home|server-side-rendering))[/\\](.+)\.mdx?$/,
  options: {
    hastPlugins: [rehypePrism]
  }
});

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const nextConfig = {
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx'],
  experimental: {
    babelMultiThread: true,
    granularChunks: true,
    deferScripts: true,
    prefetchPreload: true,
    rewrites() {
      return [
        {
          source: '/feed.xml',
          destination: '/_next/static/feed.xml'
        }
      ];
    },
    redirects() {
      return [
        {
          source: '/learn{/}?',
          statusCode: 301,
          destination: '/learn/basics/getting-started'
        },
        {
          source: '/learn/basics/server-side-support-for-clean-urls{/}?',
          statusCode: 301,
          destination: '/learn/basics/clean-urls-with-dynamic-routing'
        },
        {
          source: '/learn/excel/automatic-prerendering{/}?',
          statusCode: 301,
          destination: '/learn/excel/automatic-static-optimization'
        },
        {
          source: '/features{/}?',
          statusCode: 301,
          destination: '/features/static-exporting'
        },
        {
          source: '/features/ssr{/}?',
          statusCode: 301,
          destination: '/features/server-side-rendering'
        },
        {
          source: '/case-studies{/}?',
          statusCode: 301,
          destination: '/case-studies/hulu'
        }
      ];
    }
  },
  env: {
    FIRST_COURSE: 'basics',
    FIRST_LESSON: 'getting-started',
    SITE_NAME: 'Next.js'
  },
  webpack: (config, { dev, isServer }) => {
    if (isServer && !dev) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = { ...(await originalEntry()) };
        // This script imports components from the Next app, so it's transpiled to `.next/server/scripts/build-rss.js`
        entries['./scripts/build-rss.js'] = './scripts/build-rss.js';
        return entries;
      };
    }

    return config;
  }
};

module.exports = withGitHubMDX(withMDX(withBundleAnalyzer(nextConfig)));
