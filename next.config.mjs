/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
        destination: '/', // Redirect to home until migrated
        permanent: true,
      },
      {
        source: '/self-assessment-service.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/self-employed-guides.html',
        destination: '/',
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

export default nextConfig;
