import { useState } from "react";
import { motion } from "framer-motion";
import LinksSidebar from "./links/LinksSidebar";
import "./sidebar.css";
import ToggleButton from "./toggleButtons/ToggleButton";

const variants = {
    open: {
        clipPath: "circle(1200px at 50px 50px)",
        transition: {
            type: "spring",
            stiffness: 20,
        },
    },
    closed: {
        clipPath: "circle(19px at 50px 22px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};
const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <motion.div className="sidebar" animate={open ? "open" : "closed"}>
            <motion.div className="bgSide" variants={variants}>
                <LinksSidebar />
            </motion.div>
            <ToggleButton setOpen={setOpen} />
        </motion.div>
    );
};

export default Sidebar;