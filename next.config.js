/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
    reactStrictMode: false,
    distDir: 'dist',
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
    },
})
