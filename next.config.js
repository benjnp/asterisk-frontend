/** @type {import('next').NextConfig} */
const domains = process.env.NEXT_PUBLIC_DOMAIN_IMAGES.split(',').map((i) => i.trim());
const nextConfig = {
  reactStrictMode: true,
  images: { domains },
}

module.exports = nextConfig
