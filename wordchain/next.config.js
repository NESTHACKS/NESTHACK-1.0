/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: false,
	images: {
		domains: ['github.githubassets.com'],
	},
};

module.exports = nextConfig
