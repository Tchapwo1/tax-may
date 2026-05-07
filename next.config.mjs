import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/paye-calculator.html',
        destination: '/calculators/paye',
        permanent: true,
      },
      {
        source: '/landlord-calculator.html',
        destination: '/calculators/landlord',
        permanent: true,
      },
      {
        source: '/self-assessment-service.html',
        destination: '/calculators/self-assessment',
        permanent: true,
      },
      {
        source: '/self-employed-guides.html',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/legal.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cookie-consent.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
