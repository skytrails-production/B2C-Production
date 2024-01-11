import React, { useState } from 'react';
import './BigNavbar.css';
import { motion } from 'framer-motion';
import LinksInner from './LinksInner';
import newlogo from '../../images/newlogo.png';
import Countrypicker from '../../layouts/Countrypicker';
import { Link } from 'react-router-dom';

const variants = {
    initial: {
        clipPath: 'circle(1524px at 50% 50px)',
        transition: {
            type: 'spring',
            stiffness: 20,
        },
    },
    animate: {
        clipPath: 'circle(0px at 50% 50px)',
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const BigNavbar = () => {

    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <motion.div className="bignavbarInner" style={{ background: "#fff" }} variants={variants} initial="animate" whileInView="initial">
            <div className="container p-0">
                <motion.div className="bgInner" style={{ display: 'flex' }} variants={variants} animate="initial">
                    <Link to={"/"}>
                        <img src={newlogo} width={190} alt="Logo" />
                    </Link>
                    <div>
                        <LinksInner />
                    </div>
                    <div className="seconddiv">
                        <Countrypicker />
                    </div>
                </motion.div>
            </div>
        </motion.div>

    );
};

export default BigNavbar;
