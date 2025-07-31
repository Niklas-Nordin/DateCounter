"use client";

export default function DateCounter() {

    const date = new Date().toLocaleDateString("sv-SE", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});

    

    return (
        <>
            <h3>{date}</h3>
        </>
    )
}