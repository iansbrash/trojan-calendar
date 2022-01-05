module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            height: {
                '6/6': '100%',
                '7/6': '116.666666%',
                '8/6': '133.333333%',
                '9/6': '150%',
                '10/6': '166.666666%',
                '11/6': '183.333333%',
                '12/6': '200%',
                '13/6': '216.666666%',
                '14/6': '233.333333%',
                '15/6': '250%',
                '16/6': '266.666666%',
                '17/6': '283.333333%',
                '18/6': '300%',
                '19/6': '316.666666%',
                '20/6': '333.333333%',
                '21/6': '350%',
                '22/6': '366.666666%',
                '23/6': '383.333333%',
                '24/6': '400%',
            },
            scale: {
                '200': '2',
                '250': '2.5',
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
}
