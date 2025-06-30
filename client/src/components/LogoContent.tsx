const LogoContent = () => {
    return(
        <g>
            {/* Camera body */}
            <rect x="20" y="30" width="80" height="50" rx="8" fill="currentColor" stroke="none"/>

            {/* Lens outer ring */}
            <circle cx="50" cy="55" r="18" fill="none" stroke="currentColor" strokeWidth="3"/>

            {/* Lens inner circle */}
            <circle cx="50" cy="55" r="12" fill="currentColor" opacity="0.3"/>

            {/* Lens center */}
            <circle cx="50" cy="55" r="6" fill="currentColor"/>

            {/* Flash */}
            <rect x="75" y="35" width="8" height="6" rx="2" fill="currentColor"/>

            {/* Viewfinder */}
            <rect x="35" y="25" width="12" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>

            {/* Connection lines representing video chat */}
            <path d="M100 40 Q120 40 120 60 Q120 80 100 80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
            <circle cx="125" cy="45" r="4" fill="currentColor" opacity="0.6"/>
            <circle cx="125" cy="60" r="4" fill="currentColor" opacity="0.6"/>
            <circle cx="125" cy="75" r="4" fill="currentColor" opacity="0.6"/>
        </g>
    );
}

export default LogoContent;