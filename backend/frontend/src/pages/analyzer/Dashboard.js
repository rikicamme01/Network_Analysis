import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import NastedListMenu from "../../components/NestedListMenu";
import MainAnalisiQuestionari from "../../components/MainAnalisiQuestionari";
import DistribuzioneAdS from "../../components/mainGrafici/DistribuzioneAdS";
import DistribuzioneRD from "../../components/mainGrafici/DistribuzioneRD";
import IndiceCoesione from "../../components/mainGrafici/IndiceCoesione";
import LegamiRD from "../../components/mainGrafici/LegamiRD";
import PesoMomento from "../../components/mainGrafici/PesoMomento";
import MainReport from "../../components/MainReport";
import "../../../static/css/mainGraph.css"

export default function Dashboard() {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [content, setContent] = useState(<MainAnalisiQuestionari />);
    const contentRef = useRef(null);  // <=== Ref per la sotto-finestra

    const handleListItemClick = (index) => {
        setSelectedIndex(index);

        if (index === 1) setContent(<MainAnalisiQuestionari />);
        if (index === 21) setContent(<DistribuzioneRD />);
        if (index === 22) setContent(<DistribuzioneAdS />);
        if (index === 23) setContent(<LegamiRD />);
        if (index === 24) setContent(<PesoMomento />);
        if (index === 25) setContent(<IndiceCoesione />);
        if (index === 3) setContent(<MainReport />);
    };

    // Effetto per resettare lo scroll della sotto-finestra
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;  // Resetta lo scroll
        }
    }, [selectedIndex]);  // Triggerato ogni volta che cambia la selezione

    return (
        <Layout
            title="Assessment X"
            spallasx={
                <NastedListMenu selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />
            }
            main={
                <div ref={contentRef} style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}>
                    {content}
                </div>
            }
        />
    );
}
