import {Suspense} from 'react'

interface SuspenseLoadingProps {
    children: React.ReactNode
    fallback?: React.ReactNode
    message?: string
}

export function SuspenseLoading({
                                    children,
                                    fallback,
                                    message = 'در حال بارگذاری...'
                                }: SuspenseLoadingProps) {
    const defaultFallback = (
        <div className="w-full h-screen flex items-center justify-center ">
            <div className="bg-white rounded-lg px-8 py-6 flex flex-col items-center relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 66.146 66.146">
                    <defs>
                        <filter id="A" x="212" y="-93" width="665" height="665" filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0"/>
                            <feBlend in="SourceGraphic"/>
                            <feGaussianBlur stdDeviation="70"/>
                        </filter>
                        <filter id="B" x="1229.3" y="236.3" width="545.4" height="545.4" filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0"/>
                            <feBlend in="SourceGraphic"/>
                            <feGaussianBlur stdDeviation="70"/>
                        </filter>
                        <path id="C"
                              d="M639 239.5c0 52.191-42.309 94.5-94.5 94.5S450 291.691 450 239.5s42.309-94.5 94.5-94.5 94.5 42.309 94.5 94.5z"/>
                    </defs>
                    <g className="all">
                        <g className="l1">
                            <use xlinkHref="#C" transform="matrix(-.06826 0 0 -.06826 75.3 55.1)" fill="#10d4ad"
                                 filter="url(#A)"/>
                        </g>
                        <g className="l2">
                            <use xlinkHref="#C" transform="matrix(-.072961 0 0 -.072961 76.784266 47.632874)"
                                 fill="#98c6ff" filter="url(#A)"/>
                        </g>
                        <g className="l3">
                            <use xlinkHref="#C" transform="matrix(-.061612 0 0 -.061612 59.42016 55.928294)"
                                 fill="#10d4ad" fillOpacity=".728" filter="url(#A)"/>
                        </g>
                        <path
                            d="M1610 509c0 59.647-48.353 108-108 108s-108-48.353-108-108 48.353-108 108-108 108 48.353 108 108z"
                            transform="matrix(-.075123 0 0 -.075123 138.14984 63.211103)" fill="#98c6ff"
                            filter="url(#B)"/>
                    </g>
                </svg>
                <div
                    dir="rtl"
                    className="absolute inset-0 flex items-center justify-center text-sm text-black font-bold text-center"
                    style={{fontFamily: 'Vazirmatn, sans-serif'}}
                ><span
                    className="bg-white/0 p-4 w-full backdrop-blur-[1rem] rounded-[1rem] shadow-[0_0_2rem_#ffffff]">{message}</span>
                </div>
            </div>
        </div>
    )

    return (
        <Suspense fallback={fallback || defaultFallback}>
            {children}
        </Suspense>
    )
}