import React, { useState, useEffect } from 'react';
// import { mainheaderlogos } from '../../data';
import './BigNavbar.css';
import { motion } from 'framer-motion';
import Links from './Links';
import LinksInner from './LinksInner';
import newlogo from '../../images/newlogo.png';
import whiteLogo from '../../images/whiteLogo.png';
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
    const [scrollY, setScrollY] = useState(0);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setOpen(scrollY >= 70);
    }, [scrollY]);

    return (
        <motion.div className={` ${open ? 'bignavbar' : 'whiteBG'}`} variants={variants} initial="animate" whileInView="initial">
            <motion.div className="container bg" style={{ display: 'flex' }} variants={variants} animate="initial">
                <Link to={"/"}>
                    {
                        open ? (
                            <img src={newlogo} width={190} alt="Logo" />
                        ) :
                            (

                                <img style={{ paddingLeft: "10px", width: "185px" }} src={whiteLogo} alt="Logo" />
                            )
                    }

                </Link>
                <div>
                    <Links open={open} />
                    {/* <Links /> */}
                </div>
                <div className="seconddiv">
                    <Countrypicker />
                </div>
            </motion.div>
        </motion.div>


        // <motion.div className="bignavbarInner" style={{ background: "#fff" }} variants={variants} initial="animate" whileInView="initial">
        //     <div className="container p-0">
        //         <motion.div className="bgInner" variants={variants} animate="initial">
        //             <Link to={"/"}>
        //                 <img src={newlogo} width={190} alt="Logo" />
        //             </Link>
        //             <div>
        //                 <LinksInner />
        //             </div>
        //             <div className="seconddiv">
        //                 <Countrypicker />
        //             </div>
        //         </motion.div>
        //     </div>
        // </motion.div>

    );
};

export default BigNavbar;
