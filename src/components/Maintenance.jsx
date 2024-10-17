// src/components/Maintenance.js
import React from 'react';

const Maintenance = () => {
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.heading}>We'll Be Back Soon!</h1>
                <p style={styles.paragraph}>
                    Our website is currently undergoing maintenance. Thank you for your patience.
                </p>
                <div style={styles.icon}>🔧</div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgb(252,252,252), rgb(140,140,140), rgb(100,100,100), rgb(231,60,52), rgb(248,248,248))',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    },
    content: {
        maxWidth: '600px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
    },
    heading: {
        fontSize: '2.5em',
        color: '#333',
        margin: '0',
    },
    paragraph: {
        fontSize: '1.2em',
        color: '#666',
    },
    icon: {
        fontSize: '50px',
        marginTop: '20px',
    },
};

export default Maintenance;
