import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import Countrypicker from '../../layouts/Countrypicker';
import Countrypicker from '../../../layouts/Countrypicker'
const variants = {
    open: {
        transition: {
            staggerChildren: 0.1,
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};
const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
    },
    closed: {
        y: 50,
        opacity: 0,
    },
};

const Links = () => {
    // const items = ["Homepage", "Services", "Portfolio", "Contact", "About"];

    return (
        <motion.div className="linksSide" variants={variants}>

            <Link
                to="/"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                Flight
            </Link>
            <Link
                to="/"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                Hotel
            </Link>
            <Link
                to="/"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                Packages
            </Link>
            <Link
                to="/"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                Bus
            </Link>
            <a
                href="https://visa.theskytrails.com/" target='_blank'
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                Visa
            </a>

            <Countrypicker />

        </motion.div>
    );
};

export default Links;