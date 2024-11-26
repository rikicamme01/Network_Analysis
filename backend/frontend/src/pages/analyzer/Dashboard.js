import React, { useState } from "react";
import Layout from "../../components/Layout";
import NastedListMenu from "../../components/NestedListMenu";
import MainAnalisiQuestionari from "../../components/MainAnalisiQuestionari";
import MainGrafici from "../../components/MainGrafici";
import MainReport from "../../components/MainReport";


export default function Dashboard() {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [content, setContent] = useState(<MainAnalisiQuestionari />);


    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        if (index === 1) {
            setContent(<MainAnalisiQuestionari />)
        }
        if (index === 21) {
            setContent(<MainGrafici />)
        }
        if (index === 3) {
            setContent(<MainReport />)
        }
    }

    return (
        <Layout
            title="[Name_ass]"
            spallasx={<NastedListMenu selectedIndex={selectedIndex} handleListItemClick={handleListItemClick}></NastedListMenu>} //da aggiungere pulsante indietro
            main={content}

        />
    );
}