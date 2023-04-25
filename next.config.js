/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true,
	images: {
		domains: ['videos-imvoraus.s3.amazonaws.com', 'lh3.googleusercontent.com'],
		formats: ['image/avif', 'image/webp'],
	},
	poweredByHeader: false,
	env: {
		REACT_APP_URL: process.env.REACT_APP_URL,
		REACT_APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: '/apii/:path*',
				destination: 'https://nestjsapp-production.up.railway.app/api/:path*',
				//destination: 'http://localhost:3333/api/:path*',
			},
		]
	},
}

module.exports = nextConfig
