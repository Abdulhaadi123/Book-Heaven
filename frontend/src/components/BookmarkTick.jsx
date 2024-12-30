import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const BookmarkTick = ({ show }) => {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 1000); // Hide after 1 second
        }
    }, [show]);

    return (
        visible && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="animate-pulse bg-green-500 p-4 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        size="3x"
                        className="text-white"
                    />
                </div>
            </div>
        )
    );
};

export default BookmarkTick;
