import React from "react";

const displayDate = () => {
    const today = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString(undefined, options);
    console.log(formattedDate);
    return <span>{formattedDate}</span>;
    
};

export default displayDate
