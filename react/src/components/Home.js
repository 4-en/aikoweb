import React from 'react';

import Runner from './runner';

import '../css/Home.css';

// default home component
const Home = () => {

    var [showGame, setShowGame] = React.useState(false);

    // show game when spacebar is pressed
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.keyCode === 32) {
                setShowGame(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // on mobile, show game when screen is tapped
        window.addEventListener('touchstart', () => {
            setShowGame(true);
        });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', () => {
                setShowGame(true);
            });
        };
    }, []);


    return (
        <div>
            <div className='home-background'>
            </div>
            <div className='home-content'>
                <div><h1>Aiko.lol</h1></div>
                <a href="https://discord.com/api/oauth2/authorize?client_id=1101108699658981427&permissions=8&scope=bot" title='Invite Aiko' target='_blank' rel='noopener noreferrer'>
                    <img className="discordImage" src="/static/images/discord-logo-white.svg" href="https://discord.gg/8QH2ZQJ"/>
                </a>
                <div>
                    <p>More content coming soon</p>
                </div>
            </div>
            {showGame && <Runner />}
        </div>
    );
};

export default Home;